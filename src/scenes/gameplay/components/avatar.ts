import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'

interface AvatarType extends PIXI.Container {
  avatarName: PIXI.Text
  setAvatarImg: (imgName: string) => void
  setAvatarName: (name: String) => void
}

export const loadAvatar = (resources: PIXI.IResourceDictionary, imgName: string, name: string) => {
  // have to set position outside
  const avatar = new PIXI.Container() as AvatarType
  avatar.position.set(0, 0)

  const avatarImg = new PIXI.Sprite(resources[imgName].texture)
  avatarImg.anchor.set(0.5, 0)
  avatarImg.height = avatarImg.height*130/avatarImg.width
  avatarImg.width = 130
  avatar.addChild(avatarImg)

  const avatarName = new PIXI.Text(name, TEXT_STYLE.SUBHEADER_THAI)
  avatarName.anchor.set(0.5, 0)
  avatarName.position.set(0, 187)
  avatar.addChild(avatarName)

  avatar.setAvatarName = (name: string) => {
    avatarName.text = name
  }

  avatar.setAvatarImg = (imgName: string) => {
    avatarImg.texture = resources[imgName].texture
  }

  return avatar
}

export default loadAvatar
