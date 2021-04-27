import * as PIXI from 'pixi.js'
import loadCard from '../../../components/card'
import loadCardInShop from './cardInShop'
import { TEXT_STYLE } from '../../../constants/style'

interface CardShopDeckType extends PIXI.Container {
  setCard: (cardList) => void
}

export const loadCardShopDeck = (resources: PIXI.IResourceDictionary) => {
  const cardShopDeckContainer = new PIXI.Container as CardShopDeckType
  

  cardShopDeckContainer.setCard = (cardList) => {
    let prevX = 0
    const padding = 20
    for(let i in cardList){
      let cardData = cardList[i]
      const cardInShop = loadCardInShop(resources, cardData)
      cardInShop.x = i =='0'? prevX: prevX + cardInShop.width + padding
      prevX = cardInShop.x
      cardShopDeckContainer.addChild(cardInShop)

    }
  }

  // const cardShopDeck = new PIXI.Container()
  // cardShopDeck.addChild(cardDeck)

  // cardShopDeckContainer.setCard = (cardList) => {
  //   for (let i in cardList) {
  //     let cardConfig = channelCardList[i].cardConfig
  //     if (cardConfig != null) {
  //       let card = loadCard(resources, cardConfig)
  //       cardDeck.addChild(card)
  //     }
  //   }
  // }
  return cardShopDeckContainer
}

export default loadCardShopDeck