import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { Card } from '../../../types'
import loadCard, { CardType } from '../../../components/card'

interface DuelChannelType extends PIXI.Container {
  bg: PIXI.Sprite
  setText: (newText: string) => void
  // setCard: (cardConfig: Card) => void
  // removeCard: () => void
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
  // duelChannel.setCard = (cardConfig: Card) => {
  //   while (cardContainer.children[0]) {
  //     cardContainer.removeChildAt(0)
  //   }

  //   const card = loadCard(resources, cardConfig)
  //   card.width = duelChannelBg.width
  //   card.height = duelChannelBg.height
  //   cardContainer.addChild(card)
  // }

  // duelChannel.removeCard = () => {
  //   while (cardContainer.children[0]) {
  //     cardContainer.removeChildAt(0)
  //   }
  // }

  duelChannel.addChild(cardContainer)

  return duelChannel
}

export default loadDuelChannel
