import * as PIXI from 'pixi.js'
import axios from 'axios'
import loadCreateRoomScene from './loadScene'
import { GameState, Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { AVATAR } from '../../constants/avatar'
import { gameState as initGameState } from '../../constants/initialState'

const avatarList = Object.values(AVATAR)

const CreateRoomScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const createRoomScene = loadCreateRoomScene(resources)
  const scene = createRoomScene.scene as Scene
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
    confirmbutton,
    leftButton,
    rightButton,
    avatar,
    fiveButton,
    tenButton,
    twentyButton,
    backButton,
  } = createRoomScene.children

  // get input
  // let name = avatarNameInput.text.trim()

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

  fiveButton
    .on('mousedown', () => {
      onSelect(5), onInput()
    })
    .on('touchstart', () => {
      onSelect(5), onInput()
    })

  tenButton
    .on('mousedown', () => {
      onSelect(10), onInput()
    })
    .on('touchstart', () => {
      onSelect(10), onInput()
    })

  twentyButton
    .on('mousedown', () => {
      onSelect(20), onInput()
    })
    .on('touchstart', () => {
      onSelect(20), onInput()
    })

  let turn = 0
  const onSelect = (turnNumber: number) => {
    switch (turnNumber) {
      case 5:
        fiveButton.setSelected(true)
        tenButton.setSelected(false)
        twentyButton.setSelected(false)
        break
      case 10:
        fiveButton.setSelected(false)
        tenButton.setSelected(true)
        twentyButton.setSelected(false)
        break
      case 20:
        fiveButton.setSelected(false)
        tenButton.setSelected(false)
        twentyButton.setSelected(true)
        break
    }
    turn = turnNumber
  }

  avatarNameInput.on('input', () => onInput())
  const onInput = () => {
    if (avatarNameInput.text.trim() != '' && turn != 0) {
      confirmbutton.setActive(true)
    } else {
      confirmbutton.setActive(false)
    }
  }

  const onConfirm = async () => {
    const url = process.env.BACKEND_URL
    const res = await axios.post(`${url}/create-room`, {
      name: avatarNameInput.text.trim(),
      avatar: avatarList[avatarIndex],
      setting: {
        numberOfRound: turn,
      },
    })
    if (res && res.data) {
      gameState = {
        ...gameState,
        gameId: res.data.gameId,
        turns: res.data.setting.numberOfRound,
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

export default CreateRoomScene
