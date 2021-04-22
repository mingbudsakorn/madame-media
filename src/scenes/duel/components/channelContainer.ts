import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { CHANNEL } from '../../../constants/channels'
import { CARD } from '../../../constants/card'
import { DuelChannel } from '../../../types'
import loadCard from '../../../components/card'

interface DuelChannelType extends PIXI.Container {
  bg: PIXI.Sprite
}

interface ChannelContainerType extends PIXI.Container {
  setChannels: (channels: DuelChannel[]) => void
}

const loadDuelChannel = (resources: PIXI.IResourceDictionary, channel, isBottom) => {
  const duelChannel = new PIXI.Container() as DuelChannelType

  const duelChannelBg = new PIXI.Sprite(resources['art/duel-channel-bg'].texture)
  const channelText = new PIXI.Text(channel.name, TEXT_STYLE.SUBHEADER_THAI)
  const padding = 20
  channelText.anchor.set(0.5, 0)
  channelText.x = duelChannelBg.width / 2
  if (isBottom) {
    channelText.y = duelChannelBg.y + duelChannelBg.height + padding
  } else {
    duelChannelBg.y = channelText.y + channelText.height + padding
  }
  duelChannel.addChild(duelChannelBg)
  duelChannel.addChild(channelText)

  duelChannel.bg = duelChannelBg

  return duelChannel
}

export const loadChannelContainer = (
  resources: PIXI.IResourceDictionary,
  cardList: DuelChannel[],
  isBottom: boolean,
) => {
  // have to set position outside
  const channelPadding = 25
  const channelContainer = new PIXI.Container() as ChannelContainerType

  const channelList = []

  const channel0 = loadDuelChannel(resources, CHANNEL.SOCIAL_MEDIA, isBottom)
  channel0.position.set(0, 0)
  channelList.push(channel0)
  channelContainer.addChild(channel0)

  const channel1 = loadDuelChannel(resources, CHANNEL.MOUTH, isBottom)
  channel1.position.set(channel0.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel1)
  channelContainer.addChild(channel1)

  const channel2 = loadDuelChannel(resources, CHANNEL.WEBPAGE, isBottom)
  channel2.position.set(channel1.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel2)
  channelContainer.addChild(channel2)

  const channel3 = loadDuelChannel(resources, CHANNEL.TV, isBottom)
  channel3.position.set(channel2.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel3)
  channelContainer.addChild(channel3)

  const channel4 = loadDuelChannel(resources, CHANNEL.RADIO, isBottom)
  channel4.position.set(channel3.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel4)
  channelContainer.addChild(channel4)

  const channel5 = loadDuelChannel(resources, CHANNEL.PUBLICATION, isBottom)
  channel5.position.set(channel4.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel5)
  channelContainer.addChild(channel5)

  const channel6 = loadDuelChannel(resources, CHANNEL.OUT_OF_HOME, isBottom)
  channel6.position.set(channel5.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel6)
  channelContainer.addChild(channel6)

  const loadCards = (cardList) => {
    for (let i in cardList) {
      let temp = cardList[i]
      let card = loadCard(resources, CARD[temp.card].real)
      card.position.set(channelList[temp.channel].x, channelList[temp.channel].bg.y)
      card.width = channel0.bg.width
      card.height = channel0.bg.height
      channelContainer.addChild(card)
    }
  }

  channelContainer.setChannels = (channels: DuelChannel[]) => {
    loadCards(channels)
  }

  loadCards(cardList)

  return channelContainer
}

export default loadChannelContainer
