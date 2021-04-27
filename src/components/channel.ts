import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../constants/style'
import { Channel } from '../types'
import { CardType } from './card'

export interface ChannelType extends PIXI.Container {
  setCard: (card: CardType) => void
  getCard: () => CardType
  isAvailable: () => boolean
  getChannelConfig: () => Channel
  getHeight: () => number
  getWidth: () => number
  getBg: () => PIXI.Sprite
}

const loadChannel = (
  resources: PIXI.IResourceDictionary,
  channelConfig: Channel,
  isAvailable: boolean,
) => {
  let channel = new PIXI.Container() as ChannelType

  let channelName = new PIXI.Text(
    channelConfig.name,
    isAvailable ? TEXT_STYLE.BODY_THAI : TEXT_STYLE.BODY_THAI_CHARCOAL,
  )
  let channelBg = isAvailable
    ? new PIXI.Sprite(resources['channels/avail-channel-bg'].texture)
    : new PIXI.Sprite(resources['channels/unavail-channel-bg'].texture)

  channelName.anchor.set(0.5, 0)
  channelName.position.set(channelBg.width / 2, 5)
  channel.addChild(channelName)

  channelBg.position.set(0, channelName.height + 8)
  channel.addChild(channelBg)

  let audioIcon = channelConfig.audio
    ? new PIXI.Sprite(resources['cards/avail-volume-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  audioIcon.width = 30
  audioIcon.height = 30
  audioIcon.position.set(17, channelBg.y + channelBg.height + 10)
  channel.addChild(audioIcon)

  let visualIcon = channelConfig.visual
    ? new PIXI.Sprite(resources['cards/avail-img-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-img-big'].texture)
  visualIcon.width = 30
  visualIcon.height = 30
  visualIcon.position.set(audioIcon.x + audioIcon.width + 23, audioIcon.y)
  channel.addChild(visualIcon)

  let textIcon = channelConfig.text
    ? new PIXI.Sprite(resources['cards/avail-text-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  textIcon.width = 30
  textIcon.height = 30
  textIcon.position.set(visualIcon.x + visualIcon.width + 23, audioIcon.y)
  channel.addChild(textIcon)

  let percentageText = new PIXI.Text(
    channelConfig.percentage + '%',
    isAvailable ? TEXT_STYLE.BODY_THAI : TEXT_STYLE.BODY_THAI_CHARCOAL,
  )
  percentageText.anchor.set(0.5, 0)
  percentageText.position.set(channelBg.width / 2, channelBg.y + 20)
  channel.addChild(percentageText)

  // Card in the channel
  const cardContainer = new PIXI.Container()
  channel.setCard = (card) => {
    // clear former card
    if (cardContainer.children[0]) cardContainer.removeChild(cardContainer.children[0])
    if (card) {
      card.width = 170
      card.height = 250
      card.x = 0
      card.y = channel.height - 285
      cardContainer.addChild(card)
    }
  }
  cardContainer.x = 0
  cardContainer.y = 0

  channel.addChild(cardContainer)

  channel.getCard = () => {
    return cardContainer.children.length > 0 ? (cardContainer.children[0] as CardType) : undefined
  }

  channel.isAvailable = () => {
    return isAvailable
  }

  channel.getChannelConfig = () => {
    return channelConfig
  }

  channel.getHeight = () => {
    return channelBg.height
  }

  channel.getWidth = () => {
    return channelBg.width
  }

  channel.getBg = () => {
    return channelBg
  }

  return channel
}

export default loadChannel