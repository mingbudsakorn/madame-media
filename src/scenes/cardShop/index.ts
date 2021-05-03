import * as PIXI from 'pixi.js'
import loadCardShopScene from './loadScene'
import { GameState, Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { CARD } from '../../constants/card'
import { gameState as initGameState } from '../../constants/initialState'

const mockCardShopList = [CARD[0].real, CARD[1].real, CARD[2].real, CARD[3].real, CARD[4].real]
const CardShopScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const cardShopScene = loadCardShopScene(resources)
  const scene = cardShopScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initGameState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const { bg, confirmButton, cardShopDeck } = cardShopScene.children

  cardShopDeck.setCard(mockCardShopList)

  return scene
}

export default CardShopScene
