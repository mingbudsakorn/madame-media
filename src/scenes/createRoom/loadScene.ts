import * as PIXI from 'pixi.js'
import loadAvatar from '../../components/avatar'
import loadTextInput from '../../components/textInput'

import { TEXT_STYLE, COLOR } from '../../constants/style'
import { AVATAR, AVATAR_BG } from '../../constants/avatar'
import { Button } from '../../types/index'

const createRoomScene = new PIXI.Container()
createRoomScene.position.set(0, 0)

const loadCreateRoomScene = (resources: PIXI.IResourceDictionary) => {
  const bg = new PIXI.Sprite(resources['background/lobby-bg'].texture)
  bg.position.set(0, 0)
  createRoomScene.addChild(bg)

  // ----------------------text---------------------- //
  const joinGameText = new PIXI.Text('สร้างเกม', TEXT_STYLE.SUPER_HEADER_THAI)
  joinGameText.anchor.set(0.5, 0)
  joinGameText.position.set(bg.width / 2, 60)
  createRoomScene.addChild(joinGameText)

  const settingAvatarText = new PIXI.Text('ตั้งค่าตัวละคร', TEXT_STYLE.HEADER_THAI)
  settingAvatarText.anchor.set(0.5, 0)
  settingAvatarText.position.set(bg.width / 4, 190)
  createRoomScene.addChild(settingAvatarText)

  const settingTurnText = new PIXI.Text('ตั้งค่าจำนวนรอบ', TEXT_STYLE.HEADER_THAI)
  settingTurnText.anchor.set(0.5, 0)
  settingTurnText.position.set(bg.width * (3 / 4), settingAvatarText.y)
  createRoomScene.addChild(settingTurnText)
  // ------------------------------------------------ //

  const avatar = loadAvatar(resources, AVATAR_BG.myAvatarBg, AVATAR.man1, '', false)
  avatar.position.set(bg.width / 4 - avatar.width / 2, 275)
  createRoomScene.addChild(avatar)

  // ----------------------button---------------------- //
  const backButton = new PIXI.Sprite(resources['art/back-button'].texture)
  backButton.interactive = true
  backButton.position.set(58, 58)
  backButton.buttonMode = true
  createRoomScene.addChild(backButton)

  const leftButton = new PIXI.Sprite(resources['art/button-polygon-left'].texture)
  leftButton.anchor.set(0.5)
  leftButton.position.set(avatar.x, avatar.y + avatar.height / 2)
  leftButton.interactive = true
  leftButton.buttonMode = true
  createRoomScene.addChild(leftButton)

  const rightButton = new PIXI.Sprite(resources['art/button-polygon-right'].texture)
  rightButton.anchor.set(0.5)
  rightButton.position.set(avatar.x + avatar.width, leftButton.y)
  rightButton.interactive = true
  rightButton.buttonMode = true
  createRoomScene.addChild(rightButton)

  const confirmbutton = new PIXI.Sprite(resources['art/disable-confirm-btn'].texture) as Button
  confirmbutton.anchor.set(0.5, 0)
  confirmbutton.position.set(bg.width / 2, 940)
  confirmbutton.interactive = true
  confirmbutton.buttonMode = false
  createRoomScene.addChild(confirmbutton)

  confirmbutton.setActive = (isActive) => {
    if (isActive) {
      confirmbutton.texture = resources['art/confirm-btn'].texture
      confirmbutton.buttonMode = true
    } else {
      confirmbutton.texture = resources['art/disable-confirm-btn'].texture
      confirmbutton.buttonMode = false
    }
  }
  // -------------------------------------------------- //

  // -----------------=-----turn----------------------- //
  let btnPadding = 20
  const fiveButton = new PIXI.Sprite(resources['art/active-5-btn'].texture) as Button
  fiveButton.anchor.set(0.5, 0)
  fiveButton.position.set(bg.width * (3 / 4), 376)
  fiveButton.interactive = true
  fiveButton.buttonMode = true
  createRoomScene.addChild(fiveButton)
  fiveButton.setSelected = (isSelected: boolean) => {
    if (isSelected) {
      fiveButton.texture = resources['art/selected-5-btn'].texture
    } else {
      fiveButton.texture = resources['art/active-5-btn'].texture
    }
  }

  const tenButton = new PIXI.Sprite(resources['art/active-10-btn'].texture) as Button
  tenButton.anchor.set(0.5, 0)
  tenButton.position.set(fiveButton.x, fiveButton.y + fiveButton.height + btnPadding)
  tenButton.interactive = true
  tenButton.buttonMode = true
  createRoomScene.addChild(tenButton)
  tenButton.setSelected = (isSelected: boolean) => {
    if (isSelected) {
      tenButton.texture = resources['art/selected-10-btn'].texture
    } else {
      tenButton.texture = resources['art/active-10-btn'].texture
    }
  }

  const twentyButton = new PIXI.Sprite(resources['art/active-20-btn'].texture) as Button
  twentyButton.anchor.set(0.5, 0)
  twentyButton.position.set(fiveButton.x, tenButton.y + tenButton.height + btnPadding)
  twentyButton.interactive = true
  twentyButton.buttonMode = true
  createRoomScene.addChild(twentyButton)
  twentyButton.setSelected = (isSelected: boolean) => {
    if (isSelected) {
      twentyButton.texture = resources['art/selected-20-btn'].texture
    } else {
      twentyButton.texture = resources['art/active-20-btn'].texture
    }
  }

  // -------------------------------------------------- //

  const avatarNameInput = loadTextInput('ชื่อตัวละคร...')
  avatarNameInput.position.set(bg.width / 4 - avatarNameInput.width / 2, 813)
  createRoomScene.addChild(avatarNameInput)

  return {
    scene: createRoomScene,
    children: {
      bg,
      avatarNameInput,
      confirmbutton,
      leftButton,
      rightButton,
      avatar,
      fiveButton,
      tenButton,
      twentyButton,
    },
  }
}

export default loadCreateRoomScene
