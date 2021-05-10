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
  let gameState = initGameState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const { confirmButton, cardShopDeck } = cardShopScene.children

  socket.on('next-round', () => {
    setCurrentScene(scenes.gameplay, gameState, nextPossibleScenes[scenes.gameplay])
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

    await axios.post(`${url}/ready-end-round`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
    })
  }

  confirmButton.on('mousedown', selectCards).on('touchstart', selectCards)

  scene.onAppear = async () => {
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
