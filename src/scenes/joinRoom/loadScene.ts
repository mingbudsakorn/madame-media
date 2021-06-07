import * as PIXI from 'pixi.js'
import loadAvatar from '../../components/avatar'
import loadTextInput from '../../components/textInput'

import { TEXT_STYLE, COLOR } from '../../constants/style'
import { AVATAR, AVATAR_BG } from '../../constants/avatar'
import { Button } from '../../types/index'

const joinRoomScene = new PIXI.Container()
joinRoomScene.position.set(0, 0)

const loadJoinRoomScene = (resources: PIXI.IResourceDictionary) => {
  const bg = new PIXI.Sprite(resources['background/lobby-bg'].texture)
  bg.position.set(0, 0)
  joinRoomScene.addChild(bg)

  // // ----------------------text---------------------- //
  const joinGameText = new PIXI.Text('เข้าร่วมเกม', TEXT_STYLE.SUPER_HEADER_THAI)
  joinGameText.anchor.set(0.5, 0)
  joinGameText.position.set(bg.width / 2, 60)
  joinRoomScene.addChild(joinGameText)

  const settingAvatarText = new PIXI.Text('ตั้งค่าตัวละคร', TEXT_STYLE.HEADER_THAI)
  settingAvatarText.anchor.set(0.5, 0)
  settingAvatarText.position.set(bg.width / 4, 190)
  joinRoomScene.addChild(settingAvatarText)

  const roomIdText = new PIXI.Text('ใส่รหัสของเกม', TEXT_STYLE.HEADER_THAI)
  roomIdText.anchor.set(0.5, 0)
  roomIdText.position.set(bg.width * (3 / 4), 420)
  joinRoomScene.addChild(roomIdText)
  // // ------------------------------------------------ //

  const avatar = loadAvatar(resources, AVATAR_BG.myAvatarBg, AVATAR.avatar1, '', false)
  avatar.position.set(bg.width / 4 - avatar.width / 2, 275)
  joinRoomScene.addChild(avatar)

  // // ----------------------button---------------------- //
  const backButton = new PIXI.Sprite(resources['art/back-button'].texture)
  backButton.interactive = true
  backButton.position.set(58, 58)
  backButton.buttonMode = true
  joinRoomScene.addChild(backButton)

  const leftButton = new PIXI.Sprite(resources['art/button-polygon-left'].texture)
  leftButton.anchor.set(0.5)
  leftButton.position.set(avatar.x, avatar.y + avatar.height / 2)
  leftButton.interactive = true
  leftButton.buttonMode = true
  joinRoomScene.addChild(leftButton)

  const rightButton = new PIXI.Sprite(resources['art/button-polygon-right'].texture)
  rightButton.anchor.set(0.5)
  rightButton.position.set(avatar.x + avatar.width, leftButton.y)
  rightButton.interactive = true
  rightButton.buttonMode = true
  joinRoomScene.addChild(rightButton)

  const confirmbutton = new PIXI.Sprite(resources['art/disable-confirm-btn'].texture) as Button
  confirmbutton.anchor.set(0.5, 0)
  confirmbutton.position.set(bg.width / 2, 940)
  confirmbutton.interactive = true
  confirmbutton.buttonMode = false
  joinRoomScene.addChild(confirmbutton)

  confirmbutton.setActive = (isActive) => {
    if (isActive) {
      confirmbutton.texture = resources['art/confirm-btn'].texture
      confirmbutton.buttonMode = true
    } else {
      confirmbutton.texture = resources['art/disable-confirm-btn'].texture
      confirmbutton.buttonMode = false
    }
  }
  // // -------------------------------------------------- //

  const avatarNameInput = loadTextInput('ชื่อตัวละคร...')
  avatarNameInput.position.set(bg.width / 4 - avatarNameInput.width / 2, 813)
  joinRoomScene.addChild(avatarNameInput)

  const roomIdInput = loadTextInput('รหัสห้อง...')
  roomIdInput.position.set(bg.width * (3 / 4) - roomIdInput.width / 2, 498)
  joinRoomScene.addChild(roomIdInput)

  return {
    scene: joinRoomScene,
    children: {
      bg,
      avatarNameInput,
      roomIdInput,
      confirmbutton,
      leftButton,
      rightButton,
      avatar,
      backButton,
    },
  }
}

export default loadJoinRoomScene
