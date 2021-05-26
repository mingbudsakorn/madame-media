import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { Channel, Card, CardSlots, SingleSummary } from '../../../types'
import { SpecialActionContainerType } from './specialActionContainer'
import {
  loadToSelectOverlayContainer,
  ToSelectOverlayContainerType,
} from './toSelectOverlayContainer'
import loadCard, { CardType } from '../../../components/card'
import loadDuelChannel from './duelChannel'
import { OVERLAY, SPECIAL_ACTION_TYPE } from '../../../constants/specialAction'
import { shake } from '../../../effects'

interface ChannelContainerType extends PIXI.Container {
  // setChannels: (cards: CardSlots) => void
  setSummary: (summaryList: SingleSummary, atEnd: boolean) => void
  initChannels: (channels: Channel[]) => void
  setCards: (cardList: CardSlots) => void
  select: (card: Card) => void
  setToSelect: () => void
  getSelectedCard: () => CardType
  toSelectOverlayContainer: ToSelectOverlayContainerType
  spyCards: (cardList: CardSlots) => void
  removeAllOverlay: () => void
  clearSummary: () => void
}

export const loadChannelContainer = (
  resources: PIXI.IResourceDictionary,
  isBottom: boolean,
  specialActionContainer: SpecialActionContainerType,
) => {
  // have to set position outside
  let localCardList = [] as CardType[]

  const channelPadding = 25
  const channelContainer = new PIXI.Container() as ChannelContainerType

  const channelList = []
  const channelOverlayList = []

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

  const cardContainer = new PIXI.Container()

  channelContainer.setCards = (cardSlots: CardSlots) => {
    // clear old cards
    while (cardContainer.children[0]) {
      cardContainer.removeChildAt(0)
    }

    Object.keys(cardSlots).forEach((channelType) => {
      const card = loadCard(resources, cardSlots[channelType])
      const channelObject = channelList[channelType]
      card.x = channelObject.x
      card.y = channelObject.bg.y
      card.width = channelObject.bg.width
      card.height = channelObject.bg.height
      localCardList.push(card)
      cardContainer.addChild(card)
    })
  }

  channelContainer.spyCards = (cardSlots: CardSlots) => {
    // clear old cards
    while (cardContainer.children[0]) {
      cardContainer.removeChildAt(0)
    }

    Object.keys(cardSlots).forEach((channelType) => {
      const card = loadCard(resources, cardSlots[channelType])
      // set is real
      card.setIsReal(cardSlots[channelType].isReal)
      const channelObject = channelList[channelType]
      card.x = channelObject.x
      card.y = channelObject.bg.y
      card.width = channelObject.bg.width
      card.height = channelObject.bg.height
      localCardList.push(card)
      cardContainer.addChild(card)
    })
  }

  channelContainer.addChild(cardContainer)

  let toSelectOverlayContainer = null as any
  if (!isBottom) {
    // OPPONENT
    toSelectOverlayContainer = loadToSelectOverlayContainer(resources, specialActionContainer)
    toSelectOverlayContainer.setInteractable(false)
    channelContainer.addChild(toSelectOverlayContainer)

    const onRevert = () => {
      toSelectOverlayContainer.setInteractable(true)
    }
    specialActionContainer.setOnRevert(onRevert)

    channelContainer.setToSelect = () => {
      toSelectOverlayContainer.setCardList(localCardList)
      toSelectOverlayContainer.visible = true
    }

    channelContainer.removeAllOverlay = () => {
      toSelectOverlayContainer.removeOverlay()
    }

    channelContainer.getSelectedCard = () => {
      return toSelectOverlayContainer.getSelectedCard()
    }
  }

  const prepareSummary = () => {
    channelList.forEach((channelObject) => {
      let cardOverlay = new PIXI.Sprite(resources[OVERLAY.real].texture)
      cardOverlay.position.set(channelObject.x - 4, channelObject.bg.y)
      cardOverlay.visible = false

      channelContainer.addChild(cardOverlay)
      channelOverlayList.push(cardOverlay)
    })
  }
  prepareSummary()

  channelContainer.setSummary = (summary: SingleSummary, atEnd: boolean) => {
    if (toSelectOverlayContainer) {
      toSelectOverlayContainer.setInteractable(false)
    }
    const { exposedCards } = summary

    Object.keys(exposedCards).forEach((channel) => {
      let card = exposedCards[channel]
      if (atEnd) {
        // REAL SUMMARY
        if (card.actionType !== SPECIAL_ACTION_TYPE.SPY) {
          if (!card.isReal) {
            channelOverlayList[channel].texture =
              card.actionType === SPECIAL_ACTION_TYPE.FACT_CHECK
                ? resources[OVERLAY.factCheck].texture
                : resources[OVERLAY.expose].texture
            channelOverlayList[channel].visible = true
          } else {
            channelOverlayList[channel].visible = false
          }
        }
      } else {
        // SINGLE SPECIAL ACTION RESULTS
        if (card.isReal) {
          channelOverlayList[channel].texture = resources[OVERLAY.real].texture
          channelOverlayList[channel].visible = true
        } else {
          channelOverlayList[channel].texture = resources[OVERLAY.fake].texture
          channelOverlayList[channel].visible = true
          shake()
        }
      }
    })
  }

  channelContainer.clearSummary = () => {
    channelOverlayList.forEach((cardOverlay) => {
      cardOverlay.visible = false
    })
  }

  return channelContainer
}

export default loadChannelContainer
