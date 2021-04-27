import * as PIXI from 'pixi.js'
import loadGameLobbyScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { gameState as initialState } from '../../constants/initialState'
import socket from '../../socket'

const GameLobbyScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const gameLobbyScene = loadGameLobbyScene(resources)
  const scene = gameLobbyScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initialState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const {
    roomId,
    turn,
    leftButton,
    rightButton,
    myAvatar,
    opponentAvatar,
    backButton,
  } = gameLobbyScene.children
  // Buttons

  scene.onAppear = () => {
    turn.setTurn(gameState.turns)
    roomId.setRoomId(gameState.gameId)

    // if (gameState.player1.avatar) {
    //   myAvatar.setAvatarImg(gameState.player1.avatar)
    // }
    // myAvatar.setAvatarName(gameState.player1.name)

    // SOCKETS
    socket.emit('join-game', gameState.gameId)
  }

  // LISTEN FOR NEW PLAYERS
  socket.on('new-player', (res) => {
    const player1 = res[0]
    const player2 = res[1]
    gameState = {
      ...gameState,
      player1: {
        name: player1.name,
        avatar: player1.avatar,
      },
      player2: {
        name: player2.name,
        avatar: player2.avatar,
      },
    }
  })

  const onBack = () => {
    setCurrentScene(scenes.startGame, gameState, nextPossibleScenes[scenes.startGame])
  }
  backButton.on('mousedown', onBack).on('touchstart', onBack)

  return scene
}

export default GameLobbyScene
