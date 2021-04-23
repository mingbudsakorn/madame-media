import * as PIXI from 'pixi.js'
import { CardType } from '../../../components/card'
// import { TEXT_STYLE } from '../../../constants/style'

interface CardContainerType extends PIXI.Container {
  setCards: (cards: CardType[]) => void
}

export const loadCardContainer = () =>
  // toggle: () => void,
  {
    const cardContainer = new PIXI.Container() as CardContainerType
    cardContainer.position.set(134, 960)

    const displayCards = (cards: CardType[]) => {
      cards.forEach((card, i) => {
        card.position.set(i * 125, 0)
        cardContainer.addChild(card)
      })
    }

    cardContainer.setCards = (cards: CardType[]) => {
      // clear old cards
      while (cardContainer.children[0]) {
        cardContainer.removeChild(cardContainer.children[0])
      }

      displayCards(cards)
    }

    return cardContainer
  }

export default loadCardContainer
