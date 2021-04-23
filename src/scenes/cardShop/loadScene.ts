import * as PIXI from 'pixi.js'
import { TEXT_STYLE, COLOR } from '../../constants/style'

const cardShopScene = new PIXI.Container()
cardShopScene.position.set(0, 0)

const loadCardShopScene = (resources: PIXI.IResourceDictionary) => {
  const bg = new PIXI.Sprite(resources['background/cardshop-bg'].texture)
  bg.position.set(0, 0)
  cardShopScene.addChild(bg)

  //text
  const buyChannelText = new PIXI.Text('เลือกการ์ด 3 จาก 5 ใบ', TEXT_STYLE.SUPER_HEADER_THAI)
  buyChannelText.anchor.set(0.5, 0)
  buyChannelText.position.set(bg.width / 2, 147)
  cardShopScene.addChild(buyChannelText)

  //button
  const confirmButton = new PIXI.Sprite(resources['art/confirm-btn'].texture)
  confirmButton.position.set(751,  897)
  confirmButton.interactive = true
  confirmButton.buttonMode = true
  cardShopScene.addChild(confirmButton)

  return{
    scene: cardShopScene,
    children: {
      bg,
      confirmButton,
    },
  }

}
export default loadCardShopScene