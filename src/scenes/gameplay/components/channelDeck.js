import loadChannel from '../../../components/Channel.js'
import { CHANNEL } from '../../../utils/channel.js'
import { TEXT_STYLE } from '../../../utils/style.js'


export const loadChannelDeck = (resources, availableChannelList) => {
  const channelDeck = new PIXI.Container()
  channelDeck.position.set(97,532)

  const channelText = new PIXI.Text('ช่องทางสื่อ', TEXT_STYLE.SUBHEADER_THAI)
  channelDeck.addChild(channelText)

  const channelDeckBg = new PIXI.Sprite(resources.channelDeckBg.texture)
  channelDeckBg.position.set(0, channelText.y+channelText.height+10)
  channelDeck.addChild(channelDeckBg)

  const channelPadding = 19;
  const channelY = channelDeckBg.y+10
  const firstChannelX = 37
  
  // ------test channel------- //
  const channel = loadChannel(resources, CHANNEL[0], 1)
  channel.position.set(firstChannelX,channelY)
  channelDeck.addChild(channel)
  
  const channel2 = loadChannel(resources, CHANNEL[1], 1)
  channel2.position.set(channel.x+channel.width+channelPadding,channel.y)
  channelDeck.addChild(channel2)

  const channel3 = loadChannel(resources, CHANNEL[2], 1)
  channel3.position.set(channel2.x+channel.width+channelPadding, channel.y)
  channelDeck.addChild(channel3)
  
  const channel4 = loadChannel(resources, CHANNEL[3], 1)
  channel4.position.set(channel3.x+channel.width+channelPadding, channel.y)
  channelDeck.addChild(channel4)

  const channel5 = loadChannel(resources, CHANNEL[4], 1)
  channel5.position.set(channel4.x+channel.width+channelPadding,channel.y)
  channelDeck.addChild(channel5)

  const channel6 = loadChannel(resources, CHANNEL[5], 1)
  channel6.position.set(channel5.x+channel.width+channelPadding, channel.y)
  channelDeck.addChild(channel6)
  
  const channel7 = loadChannel(resources, CHANNEL[6], 0)
  channel7.position.set(channel6.x+channel.width+channelPadding, channel.y)
  channelDeck.addChild(channel7)
  // ------------------------- //

  // const polygonButtonLeft = new PIXI.Sprite(resources.polygonButtonLeft.texture)
  // polygonButtonLeft.position.set(53, 714)
  // channelDeck.addChild(polygonButtonLeft)

  // const polygonButtonRight = new PIXI.Sprite(resources.polygonButtonRight.texture)
  // polygonButtonRight.position.set(1486, 714)
  // channelDeck.addChild(polygonButtonRight)

  return channelDeck
}

export default loadChannelDeck
