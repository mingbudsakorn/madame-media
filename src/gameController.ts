import * as PIXI from 'pixi.js'
import { scenes } from './constants/scenes'
import loadGameplayScene from './scenes/gameplay'
import loadDuelScene from './scenes/duel'
import { GameState, Scene } from './types'
import loadStartGameScene from './scenes/startGame'
import loadGameLobbyScene from './scenes/gameLobby'
import loadJoinRoomScene from './scenes/joinRoom'
import loadCreateRoomScene from './scenes/createRoom'
import loadCardShopScene from './scenes/cardShop'
import loadEndGameScene from './scenes/endGame'

const gameController = (app: PIXI.Application) => {
  const resources = app.loader.resources

  let currentScene = scenes.gameplay
  const setCurrentScene = (scene: number, gameState: GameState, sceneObject: Scene) => {
    currentScene = scene
    sceneObject.setGameState(gameState)
    renderScene()
  }

  // LOAD SCENES
  const gameplayScene = loadGameplayScene(resources, setCurrentScene)
  gameplayScene.visible = false
  const duelScene = loadDuelScene(resources, setCurrentScene)
  duelScene.visible = false
  const startGameScene = loadStartGameScene(resources, setCurrentScene)
  startGameScene.visible = false
  const gameLobbyScene = loadGameLobbyScene(resources, setCurrentScene)
  gameLobbyScene.visible = false
  const joinRoomScene = loadJoinRoomScene(resources, setCurrentScene)
  joinRoomScene.visible = false
  const createRoomScene = loadCreateRoomScene(resources, setCurrentScene)
  createRoomScene.visible = false
  const cardShopScene = loadCardShopScene(resources, setCurrentScene)
  cardShopScene.visible = false
  const endGameScene = loadEndGameScene(resources, setCurrentScene)
  endGameScene.visible = false

  // STATE DIAGRAM
  gameplayScene.setNextPossibleScenes({
    [scenes.duel]: duelScene,
  })
  duelScene.setNextPossibleScenes({
    [scenes.gameplay]: gameplayScene,
  })

  // RENDER
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
      case scenes.joinRoom:
        joinRoomScene.visible = true
        break
      case scenes.createRoom:
        createRoomScene.visible = true
        break
      case scenes.cardShop:
        cardShopScene.visible = true
        break
      case scenes.endGame:
        endGameScene.visible = true
    }
  }

  app.stage.addChild(gameplayScene)
  app.stage.addChild(duelScene)
  app.stage.addChild(startGameScene)
  app.stage.addChild(gameLobbyScene)
  app.stage.addChild(joinRoomScene)
  app.stage.addChild(createRoomScene)
  app.stage.addChild(cardShopScene)
  app.stage.addChild(endGameScene)

  renderScene()
}

export default gameController
