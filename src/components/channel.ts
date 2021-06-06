import * as PIXI from 'pixi.js'
import { CARD } from '../constants/card'
import { TEXT_STYLE } from '../constants/style'
import { Card, CardSet, Channel } from '../types'
import loadCard, { CardType } from './card'

export interface ChannelType extends PIXI.Container {
  setCard: (card: Card, isReal: boolean) => void
  getCard: () => CardType
  removeCard: () => void
  setIsAvailable: (boolean) => void
  getIsAvailable: () => boolean
  getChannelConfig: () => Channel
  getHeight: () => number
  getWidth: () => number
  getBg: () => PIXI.Sprite
  removeButton: PIXI.Sprite
}

const channelBgName = {
  โซเชียลมีเดีย: 'channels/avail-channel-social-media',
  ปากต่อปาก: 'channels/avail-channel-mouth',
  เว็บเพจ: 'channels/avail-channel-web',
  โทรทัศน์: 'channels/avail-channel-tv',
  วิทยุ: 'channels/avail-channel-radio',
  สิ่งพิมพ์: 'channels/avail-channel-print',
  สื่อนอกบ้าน: 'channels/avail-channel-out-of-home',
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
  let channelBg = new PIXI.Sprite(
    resources[channelBgName[channelConfig.name] || 'channels/avail-channel-empty'].texture,
  )
  channelBg.interactive = true

  let channelUnavailCover = new PIXI.Sprite(resources['channels/unavail-channel-bg'].texture)
  channelUnavailCover.position.set(0, channelName.height + 8)

  channelName.anchor.set(0.5, 0)
  channelName.position.set(channelBg.width / 2, 5)
  channel.addChild(channelName)

  channelBg.position.set(0, channelName.height + 8)
  channel.addChild(channelBg)

  let audioIcon = channelConfig.audio
    ? new PIXI.Sprite(resources['cards/avail-volume-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  audioIcon.width = 32
  audioIcon.height = 32
  audioIcon.position.set(17, channelBg.y + channelBg.height + 10)
  channel.addChild(audioIcon)

  let visualIcon = channelConfig.visual
    ? new PIXI.Sprite(resources['cards/avail-img-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-img-big'].texture)
  visualIcon.width = 32
  visualIcon.height = 32
  visualIcon.position.set(audioIcon.x + audioIcon.width + 26, audioIcon.y)
  channel.addChild(visualIcon)

  let textIcon = channelConfig.text
    ? new PIXI.Sprite(resources['cards/avail-text-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  textIcon.width = 32
  textIcon.height = 32
  textIcon.position.set(visualIcon.x + visualIcon.width + 26, audioIcon.y)
  channel.addChild(textIcon)

  let percentageText = new PIXI.Text(
    channelConfig.baseFactor * 100 + '%',
    isAvailable ? TEXT_STYLE.BODY_THAI : TEXT_STYLE.BODY_THAI_CHARCOAL,
  )
  percentageText.anchor.set(0.5, 0)
  percentageText.position.set(channelBg.width / 2, channelBg.y + 20)
  channel.addChild(percentageText)

  const removeButton = new PIXI.Sprite(resources['art/remove-card'].texture)
  removeButton.anchor.set(0.5, 0.5)
  removeButton.position.set(channelBg.x + channelBg.width - 5, channelBg.y + 5)
  removeButton.visible = false
  removeButton.interactive = true

  // Card in the channel
  const cardContainer = new PIXI.Container()
  channel.setCard = (cardConfig: Card, isReal: boolean) => {
    // clear former card
    if (cardContainer.children[0]) cardContainer.removeChild(cardContainer.children[0])
    if (cardConfig) {
      const card = loadCard(resources, cardConfig)
      card.setIsReal(isReal)
      card.width = 179
      card.height = 264
      card.x = 0
      card.y = channel.height - 300
      cardContainer.addChild(card)
      removeButton.visible = true
    }
  }
  cardContainer.x = 0
  cardContainer.y = 0

  channel.addChild(cardContainer)
  channel.addChild(removeButton)

  channel.removeCard = () => {
    while (cardContainer.children[0]) {
      cardContainer.removeChildAt(0)
    }
    removeButton.visible = false
  }

  channel.getCard = () => {
    return cardContainer.children.length > 0 ? (cardContainer.children[0] as CardType) : undefined
  }

  channel.setIsAvailable = (isAvailableSet: boolean) => {
    channelUnavailCover.visible = !isAvailableSet
    isAvailable = isAvailableSet
  }

  channel.getIsAvailable = () => {
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

  channel.removeButton = removeButton

  channel.addChild(channelUnavailCover)

  return channel
}

export default loadChannel
