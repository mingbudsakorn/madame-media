import * as PIXI from 'pixi.js'
import loadCard from '../../../components/card'
import { TEXT_STYLE } from '../../../constants/style'

interface CardShopDeckType extends PIXI.Container {
  setCard: (cardList) => void
}

export const loadCardShopDeck = (resources: PIXI.IResourceDictionary) => {
  const cardShopDeckContainer = new PIXI.Container as CardShopDeckType
  cardShopDeckContainer.position.set(0,0)

  const cardDeck = new PIXI.Container()
  cardShopDeck.addChild(cardDeck)

  cardShopDeck.setCard = (cardList) => {
    for (let i in cardList) {
      let cardConfig = channelCardList[i].cardConfig
      if (cardConfig != null) {
        let card = loadCard(resources, cardConfig)
        cardDeck.addChild(card)
      }
    }
  }
  return cardShopDeck
}

export default loadCardShopDeck