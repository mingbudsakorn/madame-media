import * as PIXI from 'pixi.js'
import loadJoinRoomScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { AVATAR } from '../../constants/avatar'
import { gameState as initGameState } from '../../constants/initialState'
import axios from 'axios'

const avatarList = Object.values(AVATAR)

const JoinRoomScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const joinRoomScene = loadJoinRoomScene(resources)
  const scene = joinRoomScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initGameState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const {
    bg,
    avatarNameInput,
    roomIdInput,
    confirmbutton,
    leftButton,
    rightButton,
    avatar,
    backButton,
  } = joinRoomScene.children

  // get input
  // let name = avatarNameInput.text.trim()
  // let roomId = roomIdInput.text.trim()

  let avatarIndex = 0
  // Button
  leftButton.on('mousedown', () => onClickLeftButton()).on('touchstart', () => onClickLeftButton())
  const onClickLeftButton = () => {
    if (avatarIndex == 0) {
      avatarIndex = avatarList.length - 1
    } else {
      avatarIndex -= 1
    }
    avatar.setAvatarImg(avatarList[avatarIndex])
  }

  rightButton
    .on('mousedown', () => onClickRightButton())
    .on('touchstart', () => onClickRightButton())
  const onClickRightButton = () => {
    avatarIndex = (avatarIndex + 1) % avatarList.length
    avatar.setAvatarImg(avatarList[avatarIndex])
  }

  avatarNameInput.on('input', () => onInput())
  roomIdInput.on('input', () => onInput())
  const onInput = () => {
    if (avatarNameInput.text.trim() != '' && roomIdInput.text.trim() != '') {
      confirmbutton.setActive(true)
    } else {
      confirmbutton.setActive(false)
    }
  }

  const onConfirm = async () => {
    const url = process.env.BACKEND_URL
    const res = await axios.post(`${url}/join-room`, {
      name: avatarNameInput.text.trim(),
      avatar: avatarList[avatarIndex],
      gameId: roomIdInput.text.trim(),
    })
    if (res && res.data) {
      gameState = {
        ...gameState,
        gameId: roomIdInput.text.trim(),
        playerId: res.data.playerId,
      }
      setCurrentScene(scenes.gameLobby, gameState, nextPossibleScenes[scenes.gameLobby])
    }
  }
  confirmbutton.on('mousedown', onConfirm).on('touchstart', onConfirm)

  const onBack = () => {
    setCurrentScene(scenes.startGame, gameState, nextPossibleScenes[scenes.startGame])
  }
  backButton.on('mousedown', onBack).on('touchstart', onBack)

  return scene
}

export default JoinRoomScene
