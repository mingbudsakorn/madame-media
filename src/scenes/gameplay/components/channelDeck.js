import { textStyle } from '../../../utils/style.js'

const loadChannelDeck = (app, resources) => {
  const channelDeck = new PIXI.Container()

  const channelText = new PIXI.Text('CHANNEL', textStyle.subHeaderBlack)
  channelText.position.set(97, 582)
  channelDeck.addChild(channelText)

  const channelDeckBg = new PIXI.Sprite(resources.channelDeckBg.texture)
  channelDeckBg.position.set(97, 637)
  channelDeck.addChild(channelDeckBg)

  const polygonButtonLeft = new PIXI.Sprite(resources.polygonButtonLeft.texture)
  polygonButtonLeft.position.set(53, 744)
  channelDeck.addChild(polygonButtonLeft)

  const polygonButtonRight = new PIXI.Sprite(resources.polygonButtonRight.texture)
  polygonButtonRight.position.set(995, 744)
  channelDeck.addChild(polygonButtonRight)

  app.stage.addChild(channelDeck)

  return channelDeck
}

export default loadChannelDeck
