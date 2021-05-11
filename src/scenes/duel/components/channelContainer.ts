import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { Card, CardSlots, Channel, SummarySlots } from '../../../types'
import { OVERLAY } from '../../../constants/specialAction'
import loadCard from '../../../components/card'

interface DuelChannelType extends PIXI.Container {
  bg: PIXI.Sprite
  setText: (newText: string) => void
  setCard: (cardConfig: Card) => void
}

const loadDuelChannel = (resources: PIXI.IResourceDictionary, isBottom) => {
  const duelChannel = new PIXI.Container() as DuelChannelType

  const duelChannelBg = new PIXI.Sprite(resources['art/duel-channel-bg'].texture)
  const channelText = new PIXI.Text('', TEXT_STYLE.SUBHEADER_THAI)
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

  duelChannel.setText = (newText: string) => {
    channelText.text = newText
  }

  const cardContainer = new PIXI.Container()
  cardContainer.y = duelChannelBg.y
  duelChannel.setCard = (cardConfig: Card) => {
    while (cardContainer.children[0]) {
      cardContainer.removeChildAt(0)
    }

    const card = loadCard(resources, cardConfig)
    card.width = duelChannelBg.width
    card.height = duelChannelBg.height
    cardContainer.addChild(card)
  }
  duelChannel.addChild(cardContainer)

  return duelChannel
}

interface ChannelContainerType extends PIXI.Container {
  // setChannels: (cards: CardSlots) => void
  setSummary: (cardList: CardSlots, summaryList: SummarySlots) => void
  initChannels: (channels: Channel[]) => void
  setCards: (cardList: CardSlots) => void
  select: (card: Card) => void
}

export const loadChannelContainer = (resources: PIXI.IResourceDictionary, isBottom: boolean) => {
  // have to set position outside
  const channelPadding = 25
  const channelContainer = new PIXI.Container() as ChannelContainerType

  const channelList = []

  const channel0 = loadDuelChannel(resources, isBottom)
  channel0.position.set(0, 0)
  channelList.push(channel0)
  channelContainer.addChild(channel0)

  const channel1 = loadDuelChannel(resources, isBottom)
  channel1.position.set(channel0.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel1)
  channelContainer.addChild(channel1)

  const channel2 = loadDuelChannel(resources, isBottom)
  channel2.position.set(channel1.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel2)
  channelContainer.addChild(channel2)

  const channel3 = loadDuelChannel(resources, isBottom)
  channel3.position.set(channel2.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel3)
  channelContainer.addChild(channel3)

  const channel4 = loadDuelChannel(resources, isBottom)
  channel4.position.set(channel3.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel4)
  channelContainer.addChild(channel4)

  const channel5 = loadDuelChannel(resources, isBottom)
  channel5.position.set(channel4.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel5)
  channelContainer.addChild(channel5)

  const channel6 = loadDuelChannel(resources, isBottom)
  channel6.position.set(channel5.x + channel0.width + channelPadding, channel0.y)
  channelList.push(channel6)
  channelContainer.addChild(channel6)

  channelContainer.initChannels = (channels: Channel[]) => {
    channels.forEach((channelConfig, i) => {
      channelList[i].setText(channelConfig.name)
    })
  }

  channelContainer.setCards = (cardSlots: CardSlots) => {
    Object.keys(cardSlots).forEach((channelType) => {
      channelList[channelType].setCard(cardSlots[channelType])
    })
  }

  channelContainer.setSummary = (cardList: CardSlots, summaryList: SummarySlots) => {
    Object.keys(cardList).forEach((channelType, i) => {
      let card = cardList[channelType]
      if (card) {
        let overlayType = summaryList[channelType]
        let cardOverlay = new PIXI.Sprite(resources[overlayType].texture)
        cardOverlay.position.set(channelList[i].x - 4, channelList[i].bg.y)
        channelContainer.addChild(cardOverlay)
      }
    })
  }

  return channelContainer
}

export default loadChannelContainer
