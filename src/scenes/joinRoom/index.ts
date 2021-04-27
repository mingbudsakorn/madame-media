import * as PIXI from 'pixi.js'
import loadJoinRoomScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { AVATAR } from '../../constants/avatar'

const avatarList = Object.values(AVATAR)

const JoinRoomScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const joinRoomScene = loadJoinRoomScene(resources)

  const {
    bg,
    avatarNameInput,
    roomIdInput,
    confirmbutton,
    leftButton,
    rightButton,
    avatar,
  } = joinRoomScene.children

  // get input
  // let name = avatarNameInput.text.trim()
  // let roomId = roomIdInput.text.trim()
  
  let avatarIndex = 0
  // Button
  leftButton
  .on('mousedown', () => onClickLeftButton())
  .on('touchstart', () => onClickLeftButton())
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

  const scene = joinRoomScene.scene as Scene

  return scene
}

export default JoinRoomScene
