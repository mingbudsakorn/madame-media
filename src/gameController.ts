import * as PIXI from 'pixi.js'
import { scenes } from './constants/scenes'
import loadGameplayScene from './scenes/gameplay'
import loadDuelScene from './scenes/duel'

const gameController = (app: PIXI.Application) => {
  const resources = app.loader.resources

  let currentScene = scenes.gameplay
  const setCurrentScene = (scene: number) => {
    currentScene = scene
    renderScene()
  }

  const gameplayScene = loadGameplayScene(resources, setCurrentScene)
  gameplayScene.visible = false
  const duelScene = loadDuelScene(resources, setCurrentScene)
  duelScene.visible = false

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
