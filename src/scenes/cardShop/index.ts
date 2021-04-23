import * as PIXI from 'pixi.js'
import loadCardShopScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'

const CardShopScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const cardShopScene = loadCardShopScene(resources)

  const {
    bg,
    confirmButton,
  } = cardShopScene.children

  const scene = cardShopScene.scene as Scene

  return scene
}

export default CardShopScene