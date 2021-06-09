import * as PIXI from 'pixi.js'
import loadCard from '../../../components/card'
import { CARD } from '../../../constants/card'
import { Card } from '../../../types'

interface CardContainerType extends PIXI.Container {
  setCards: (cards: Card[]) => void
}

export const loadCardContainer = (resources: PIXI.IResourceDictionary) =>
  // toggle: () => void,
  {
    const cardContainer = new PIXI.Container() as CardContainerType
    cardContainer.position.set(134, 960)
    cardContainer.buttonMode = true

    const displayCards = (cards: Card[]) => {
      cards.forEach((cardConfig, i) => {
        const card = loadCard(resources, cardConfig)
        card.position.set(i * 125, 0)
        card.width = 175
        card.height = 257
        cardContainer.addChild(card)
      })
    }

    cardContainer.setCards = (cards: Card[]) => {
      // clear old cards
      while (cardContainer.children[0]) {
        cardContainer.removeChild(cardContainer.children[0])
      }
      displayCards(cards)
    }

    return cardContainer
  }

export default loadCardContainer
