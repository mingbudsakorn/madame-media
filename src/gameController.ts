import * as PIXI from 'pixi.js'
import { scenes } from './constants/scenes'
import loadGameplayScene from './scenes/gameplay'
import loadDuelScene from './scenes/duel'
import loadStartGameScene from './scenes/startGame'
import loadGameLobbyScene from './scenes/gameLobby'

const gameController = (app: PIXI.Application) => {
  const resources = app.loader.resources

  let currentScene = scenes.gameLobby
  const setCurrentScene = (scene: number) => {
    currentScene = scene
    renderScene()
  }

  const gameplayScene = loadGameplayScene(resources, setCurrentScene)
  gameplayScene.visible = false
  const duelScene = loadDuelScene(resources, setCurrentScene)
  duelScene.visible = false
  const startGameScene = loadStartGameScene(resources, setCurrentScene)
  startGameScene.visible = false
  const gameLobbyScene = loadGameLobbyScene(resources, setCurrentScene)
  gameLobbyScene.visible = false

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
      case scenes.startGame:
        startGameScene.visible = true
        break
      case scenes.gameLobby:
        gameLobbyScene.visible = true
        break
    }
  }

  renderScene()

  app.stage.addChild(gameplayScene)
  app.stage.addChild(duelScene)
  app.stage.addChild(startGameScene)
  app.stage.addChild(gameLobbyScene)
}

export default gameController
