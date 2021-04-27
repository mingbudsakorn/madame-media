import * as PIXI from 'pixi.js'
import loadCardShopScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import {CARD} from '../../constants/card'
const mockCardShopList = [
  CARD[0].real,
  CARD[1].real,
  CARD[2].real,
  CARD[3].real,
  CARD[4].real
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