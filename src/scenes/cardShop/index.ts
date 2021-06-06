import * as PIXI from 'pixi.js'
import loadCardShopScene from './loadScene'
import { GameState, Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { CARD } from '../../constants/card'
import { gameState as initGameState } from '../../constants/initialState'
import axios from 'axios'
import socket from '../../socket'

const url = process.env.BACKEND_URL

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
  let gameState = null
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const { confirmButton, cardShopDeck, waitingModal } = cardShopScene.children

  socket.on('start-round', () => {
    if (scene.visible) {
      setCurrentScene(scenes.gameplay, null, nextPossibleScenes[scenes.gameplay])
    }
  })

  const selectCards = async () => {
    const selectedCards = cardShopDeck.getSelectedCards()

    const typeArray = []
    selectedCards.forEach((cardConfig) => {
      typeArray.push(cardConfig.type)
    })

    await axios.post(`${url}/select-cards`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
      cardTypes: typeArray,
    })

    waitingModal.setVisible(true)
  }

  confirmButton.on('mousedown', selectCards).on('touchstart', selectCards)

  scene.onAppear = async () => {
    waitingModal.setVisible(false)

    cardShopDeck.resetCount()

    const res = await axios.post(`${url}/deal-cards`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
    })
    if (res && res.data) {
      cardShopDeck.setCard(res.data)
    }
  }

  return scene
}

export default CardShopScene
