import { TEXT_STYLE } from '../../../utils/style.js'

export const loadChannelDeck = (resources) => {
  const channelDeck = new PIXI.Container()

  const channelText = new PIXI.Text('ช่องทางสื่อ', TEXT_STYLE.SUBHEADER_THAI)
  channelText.position.set(97, 532)
  channelDeck.addChild(channelText)

  const channelDeckBg = new PIXI.Sprite(resources.channelDeckBg.texture)
  channelDeckBg.position.set(97, 587)
  channelDeck.addChild(channelDeckBg)

  // const polygonButtonLeft = new PIXI.Sprite(resources.polygonButtonLeft.texture)
  // polygonButtonLeft.position.set(53, 714)
  // channelDeck.addChild(polygonButtonLeft)

  // const polygonButtonRight = new PIXI.Sprite(resources.polygonButtonRight.texture)
  // polygonButtonRight.position.set(1486, 714)
  // channelDeck.addChild(polygonButtonRight)

  return channelDeck
}

export default loadChannelDeck
