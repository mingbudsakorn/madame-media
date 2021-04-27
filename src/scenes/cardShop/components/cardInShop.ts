import * as PIXI from 'pixi.js'
import loadCard from '../../../components/card'

interface CardInShopType extends PIXI.Container {
  isSelected: boolean
  toggle: () => void
}

export const loadCardInShop = (resources: PIXI.IResourceDictionary, cardConfig) => {
  let isSelected = false ;
  const cardInShopContainer = new PIXI.Container  as CardInShopType
  const tickBox = new PIXI.Sprite(resources['art/card-not-selected'].texture)
  const card = loadCard(resources, cardConfig)
  card.height = card.height*235/card.width
  card.width = 235

  tickBox.anchor.set(0.5,0)
  tickBox.position.set(card.width/2,0)
  tickBox.buttonMode = true 
  tickBox.interactive = true 
  tickBox
  .on('mousedown', () => toggle())
  .on('touchstart', () => toggle())

  card.position.set(0,tickBox.y+tickBox.height+20)

  cardInShopContainer.addChild(tickBox)
  cardInShopContainer.addChild(card)

  const toggle = () => {
    isSelected = !isSelected
    if(isSelected){
      tickBox.texture = resources['art/card-selected'].texture
    }
    else{
      tickBox.texture = resources['art/card-not-selected'].texture
    }
  }

  return cardInShopContainer

}
export default loadCardInShop