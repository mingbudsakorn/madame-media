import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../constants/style'
import { Card } from '../types'
import loadCard from './card'

export interface CardInShopType extends PIXI.Container {
  getCardConfig: () => Card
  getIsSelected: () => boolean
  setIsSelected: (boolean) => void
  // isSelected: boolean
  // toggle: () => void
}

const loadCardInShop = (resources: PIXI.IResourceDictionary, cardConfig: Card) => {
  const cardInShop = new PIXI.Container() as CardInShopType

  let isSelected = false ;

  const tickBox = new PIXI.Sprite(resources['art/card-not-selected'].texture)
  const card = loadCard(resources, cardConfig)
  card.height = card.height*235/card.width
  card.width = 235
  cardInShop.addChild(card)

  cardInShop.setIsSelected = (selectedValue: boolean) => {
    if(!selectedValue){
      isSelected = false
    } else{
      isSelected = true
    }
  }

  // tickBox.anchor.set(0.5,0)
  // tickBox.position.set(card.width/2,0)
  // tickBox.buttonMode = true 
  // tickBox.interactive = true 
  // tickBox
  // .on('mousedown', () => toggle())
  // .on('touchstart', () => toggle())

  // card.position.set(0,tickBox.y+tickBox.height+20)

  // cardInShop.addChild(tickBox)

  // const toggle = () => {
  //   isSelected = !isSelected
  //   if(isSelected){
  //     tickBox.texture = resources['art/card-selected'].texture
  //   }
  //   else{
  //     tickBox.texture = resources['art/card-not-selected'].texture
  //   }
  // }

  return cardInShop

}
export default loadCardInShop