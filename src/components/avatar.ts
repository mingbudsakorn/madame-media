import * as PIXI from 'pixi.js'
import { COLOR, TEXT_STYLE } from '../constants/style'

interface AvatarType extends PIXI.Container {
  setAvatarImg: (imgName: string) => void
  setAvatarName: (name: String) => void
}

export const loadAvatar = (resources: PIXI.IResourceDictionary, avatarBgName: string, imgName: string, name: string='', showName: boolean=true) => {
  // have to set position outside
  const avatar = new PIXI.Container() as AvatarType
  avatar.position.set(0, 0)

  const avatarBg = new PIXI.Sprite(resources[avatarBgName].texture)
  avatar.addChild(avatarBg)

  const avatarImg = new PIXI.Sprite(resources[imgName].texture)
  avatarImg.anchor.set(0.5, 0.5)
  avatarImg.position.set(avatarBg.width/2,avatarBg.height/2)
  avatarImg.height = avatarImg.height*250/avatarImg.width
  avatarImg.width = 250
  avatar.addChild(avatarImg)

  const avatarName = new PIXI.Text(name, TEXT_STYLE.HEADER_THAI)
  avatarName.anchor.set(0.5, 0)
  avatarName.position.set(avatarBg.width/2, avatarBg.height + 20)
  avatar.addChild(avatarName)

  if (!showName) {
    avatarName.visible = false
  }

  avatar.setAvatarName = (name: string) => {
    avatarName.visible = true
    avatarName.text = name
  }

  avatar.setAvatarImg = (imgName: string) => {
    avatarImg.texture = resources[imgName].texture
  }

  return avatar
}

export default loadAvatar
