import * as PIXI from 'pixi.js'
import loadCreateRoomScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { AVATAR } from '../../constants/avatar'

const avatarList = Object.values(AVATAR)

const CreateRoomScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const createRoomScene = loadCreateRoomScene(resources)

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

  const scene = createRoomScene.scene as Scene

  return scene
}

export default CreateRoomScene
