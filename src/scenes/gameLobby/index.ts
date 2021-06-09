import * as PIXI from 'pixi.js'
import axios from 'axios'
import loadGameLobbyScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { gameState as initialState } from '../../constants/initialState'
import socket from '../../socket'

const url = process.env.BACKEND_URL

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

  const { roomId, turn, myAvatar, opponentAvatar, backButton, startGameButton } =
    gameLobbyScene.children
  // Buttons

  scene.onAppear = () => {
    turn.setTurn(gameState.rounds)
    roomId.setRoomId(gameState.gameId)

    opponentAvatar.setAvatarImg('art/question-icon')
    opponentAvatar.setAvatarName('???')

    // SOCKETS
    socket.emit('join-game', gameState.gameId)
  }

  // LISTEN FOR NEW PLAYERS
  socket.on('new-player', (res) => {
    const player1 = res[0]
    const player2 = res[1]

    if (gameState.isSecond) {
      gameState = {
        ...gameState,
        player2: {
          name: player1 ? player1.name : null,
          avatar: player1 ? player1.avatar : null,
        },
      }
    } else {
      gameState = {
        ...gameState,
        player2: {
          name: player2 ? player2.name : null,
          avatar: player2 ? player2.avatar : null,
        },
      }
    }

    if (player1.avatar) {
      myAvatar.setAvatarImg(gameState.player1.avatar)
    }
    myAvatar.setAvatarName(gameState.player1.name)
    if (player2) {
      if (player2.avatar) {
        opponentAvatar.setAvatarImg(gameState.player2.avatar)
      }
      opponentAvatar.setAvatarName(gameState.player2.name)
    }
  })

  const onStartGame = async () => {
    if (gameState.player2) {
      axios.post(`${url}/start-game`, {
        gameId: gameState.gameId,
      })
    }
  }
  startGameButton.on('mousedown', onStartGame).on('touchstart', onStartGame)

  socket.on('start-round', () => {
    if (scene.visible) {
      setCurrentScene(scenes.gameplay, gameState, nextPossibleScenes[scenes.gameplay])
    }
  })

  const onBack = () => {
    axios
      .post(`${url}/leave-room`, {
        gameId: gameState.gameId,
        playerId: gameState.playerId,
      })
      .then(() => {
        opponentAvatar.setAvatarImg('art/question-icon')
        opponentAvatar.setAvatarName('???')
      })
    setCurrentScene(scenes.startGame, gameState, nextPossibleScenes[scenes.startGame])
  }
  backButton.on('mousedown', onBack).on('touchstart', onBack)

  socket.on('leave-room', () => {
    opponentAvatar.setAvatarImg('art/question-icon')
    opponentAvatar.setAvatarName('???')
  })

  return scene
}

export default GameLobbyScene
