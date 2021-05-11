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

  let currentScene = scenes.startGame
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
  startGameScene.setNextPossibleScenes({
    [scenes.createRoom]: createRoomScene,
    [scenes.joinRoom]: joinRoomScene,
  })
  createRoomScene.setNextPossibleScenes({
    [scenes.gameLobby]: gameLobbyScene,
    [scenes.startGame]: startGameScene,
  })
  joinRoomScene.setNextPossibleScenes({
    [scenes.gameLobby]: gameLobbyScene,
    [scenes.startGame]: startGameScene,
  })
  gameLobbyScene.setNextPossibleScenes({
    [scenes.gameplay]: gameplayScene,
    [scenes.startGame]: startGameScene,
  })
  gameplayScene.setNextPossibleScenes({
    [scenes.duel]: duelScene,
  })
  cardShopScene.setNextPossibleScenes({
    [scenes.gameplay]: gameplayScene,
  })
  duelScene.setNextPossibleScenes({
    [scenes.cardShop]: cardShopScene,
    [scenes.endGame]: endGameScene,
  })
  endGameScene.setNextPossibleScenes({
    [scenes.startGame]: startGameScene,
  })

  // RENDER
  const renderScene = () => {
    startGameScene.visible = false
    createRoomScene.visible = false
    joinRoomScene.visible = false
    gameLobbyScene.visible = false
    gameplayScene.visible = false
    duelScene.visible = false
    cardShopScene.visible = false
    endGameScene.visible = false

    switch (currentScene) {
      case scenes.gameplay:
        gameplayScene.visible = true
        gameplayScene.onAppear()
        break
      case scenes.duel:
        duelScene.visible = true
        duelScene.onAppear()
        break
      case scenes.startGame:
        startGameScene.visible = true
        break
      case scenes.gameLobby:
        gameLobbyScene.visible = true
        gameLobbyScene.onAppear()
        break
      case scenes.joinRoom:
        joinRoomScene.visible = true
        break
      case scenes.createRoom:
        createRoomScene.visible = true
        break
      case scenes.cardShop:
        cardShopScene.visible = true
        cardShopScene.onAppear()
        break
      case scenes.endGame:
        endGameScene.visible = true
        endGameScene.onAppear()
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
