import * as PIXI from 'pixi.js'
import loadCard, { CardType } from '../../../components/card'
import { Card, CardSet } from '../../../types/index'

export interface CardInShopType extends PIXI.Container {
  getIsSelected: () => boolean
  toggle: () => void
  tickBox: PIXI.Sprite
  card: CardType
  getCardConfig: () => Card
}

export const loadCardInShop = (resources: PIXI.IResourceDictionary, cardConfig: Card) => {
  let isSelected = false
  const cardInShopContainer = new PIXI.Container() as CardInShopType
  const tickBox = new PIXI.Sprite(resources['art/card-not-selected'].texture)
  const card = loadCard(resources, cardConfig)
  card.height = (card.height * 235) / card.width
  card.width = 235

  tickBox.anchor.set(0.5, 0)
  tickBox.position.set(card.width / 2, 0)
  tickBox.buttonMode = true
  tickBox.interactive = true

  cardInShopContainer.tickBox = tickBox

  card.position.set(0, tickBox.y + tickBox.height + 20)
  card.interactive = true
  card.buttonMode = true

  cardInShopContainer.card = card

  cardInShopContainer.addChild(tickBox)
  cardInShopContainer.addChild(card)

  cardInShopContainer.toggle = () => {
    isSelected = !isSelected
    if (isSelected) {
      tickBox.texture = resources['art/card-selected'].texture
    } else {
      tickBox.texture = resources['art/card-not-selected'].texture
    }
  }

  cardInShopContainer.getIsSelected = () => {
    return isSelected
  }

  cardInShopContainer.getCardConfig = () => {
    return cardConfig
  }

  return cardInShopContainer
}
export default loadCardInShop
