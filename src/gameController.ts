import * as PIXI from 'pixi.js'
import { scenes } from './constants/scenes'
import loadGameplayScene from './scenes/gameplay'
import loadDuelScene from './scenes/duel'
import { GameState, Scene } from './types'

const gameController = (app: PIXI.Application) => {
  const resources = app.loader.resources

  let currentScene = scenes.gameplay
  const setCurrentScene = (scene: number, gameState: GameState, sceneObject: Scene) => {
    currentScene = scene
    sceneObject.setGameState(gameState)
    renderScene()
  }

  const gameplayScene = loadGameplayScene(resources, setCurrentScene)
  gameplayScene.visible = false
  const duelScene = loadDuelScene(resources, setCurrentScene)
  duelScene.visible = false

  gameplayScene.setNextPossibleScenes({
    [scenes.duel]: duelScene,
  })
  duelScene.setNextPossibleScenes({
    [scenes.gameplay]: gameplayScene,
  })

  const renderScene = () => {
    switch (currentScene) {
      case scenes.gameplay:
        gameplayScene.visible = true
        gameplayScene.onAppear()
        duelScene.visible = false
        break
      case scenes.duel:
        duelScene.visible = true
        duelScene.onAppear()
        gameplayScene.visible = false
        break
    }
  }

  renderScene()

  app.stage.addChild(gameplayScene)
  app.stage.addChild(duelScene)
}

export default gameController
