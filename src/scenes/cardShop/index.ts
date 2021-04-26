import * as PIXI from 'pixi.js'
import loadCardShopScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'

const mockCardShopList = [
  {card: 1},
  {card: 0},
]
const CardShopScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const cardShopScene = loadCardShopScene(resources)

  const {
    bg,
    confirmButton,
    cardShopDeck
  } = cardShopScene.children

  const scene = cardShopScene.scene as Scene
  
  cardShopDeck.setCard(mockCardShopList)
  
  return scene
}

export default CardShopScene