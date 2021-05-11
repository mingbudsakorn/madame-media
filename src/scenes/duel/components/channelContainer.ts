import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { CHANNEL } from '../../../constants/channels'
import { Card, CardSlots, SummarySlots } from '../../../types'
import { OVERLAY } from '../../../constants/specialAction'
import { SpecialActionContainerType } from './specialActionContainer'
import {
  loadToSelectOverlayContainer,
  ToSelectOverlayContainerType,
} from './toSelectOverlayContainer'
import { CardType } from '../../../components/card'

interface DuelChannelType extends PIXI.Container {
  bg: PIXI.Sprite
}

interface ChannelContainerType extends PIXI.Container {
  setChannels: (cards: CardSlots) => void
  setSummary: (cardList: CardSlots, summaryList: SummarySlots) => void
  setToSelect: () => void
  select: (card: Card) => void
  getSelectedCard: () => CardType
  toSelectOverlayContainer: ToSelectOverlayContainerType
}

const loadDuelChannel = (resources: PIXI.IResourceDictionary, channel, isBottom: boolean) => {
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
  cardList: CardSlots,
  isBottom: boolean,
  specialActionContainer: SpecialActionContainerType,
) => {
  // have to set position outside
  let localCardList: CardType[] = []
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
    Object.keys(cardList).forEach((channel, i) => {
      let card = cardList[channel]
      if (card) {
        card.position.set(channelList[i].x, channelList[i].bg.y)
        card.width = channel0.bg.width
        card.height = channel0.bg.height
        localCardList[i] = card
        channelContainer.addChild(card)
      }
    })
  }

  channelContainer.setChannels = (channels: CardSlots) => {
    loadCards(channels)
  }

  const toSelectOverlayContainer = loadToSelectOverlayContainer(
    resources,
    specialActionContainer,
  )

  channelContainer.toSelectOverlayContainer = toSelectOverlayContainer

  channelContainer.setToSelect = () => {
    toSelectOverlayContainer.setCardList(localCardList)
    channelContainer.addChild(toSelectOverlayContainer)
  }

  channelContainer.getSelectedCard = () => {
    return toSelectOverlayContainer.getSelectedCard()
  }

  channelContainer.setSummary = (cardList: CardSlots, summaryList: SummarySlots) => {
    Object.keys(cardList).forEach((channel, i) => {
      let card = cardList[channel]
      if (card) {
        let overlayType = summaryList[channel]
        let cardOverlay = new PIXI.Sprite(resources[overlayType].texture)
        cardOverlay.position.set(channelList[i].x - 4, channelList[i].bg.y)
        channelContainer.addChild(cardOverlay)
      }
    })
  }

  loadCards(cardList)

  return channelContainer
}

export default loadChannelContainer
