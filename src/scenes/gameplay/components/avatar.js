import { TEXT_STYLE } from '../../../utils/style.js'

export const loadAvatar = (app, img, name) => {
  // have to set position outside
  const avatar = new PIXI.Container()
  avatar.position.set(0,0)

  const avatarImg = new PIXI.Sprite(img)
  avatarImg.anchor.set(0.5,0)
  avatar.addChild(avatarImg)

  const avatarName = new PIXI.Text(name, TEXT_STYLE.SUBHEADER_THAI)
  avatarName.anchor.set(0.5,0)
  avatarName.position.set(0,187)
  avatar.addChild(avatarName)

  return avatar
}

export default loadAvatar
