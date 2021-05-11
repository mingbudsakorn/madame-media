import * as PIXI from 'pixi.js'
import loadDuelScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { OVERLAY } from '../../constants/specialAction'
import { gameState as initGameState } from '../../constants/initialState'
import loadCard from '../../components/card'
import { CARD } from '../../constants/card'
import { SPECIAL_ACTION } from '../../constants/gameConfig'

import socket from '../../socket'
import axios from 'axios'

const url = process.env.BACKEND_URL

const DuelScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const duelScene = loadDuelScene(resources)
  const scene = duelScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initGameState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const {
    duelCompareBg,
    opponentChannelContainer,
    myChannelContainer,
    specialActionContainer,
    summaryModal,
    peopleBar,
    waitingModal,
  } = duelScene.children

  // TIMER
  socket.on('countdown', (timeLeft) => {
    if (scene.visible) {
      if (timeLeft === 0) {
        specialActionContainer.setTime(timeLeft)
        axios.post(`${url}/ready-end-round`, {
          gameId: gameState.gameId,
          playerId: gameState.playerId,
        })
      } else {
        specialActionContainer.setTime(timeLeft)
      }
    }
  })

  socket.on('special-action-result', () => {
    waitingModal.setVisible(false)
    // TODO: show summary
    // myChannelContainer.setSummary(channelSlots, mockSummary())
    summaryModal.visible = true
    specialActionContainer.visible = false
  })

  socket.on('end-round', () => {
    setCurrentScene(scenes.cardShop, gameState, nextPossibleScenes[scenes.cardShop])
    waitingModal.setVisible(false)
  })

  socket.on('end-game', (res) => {
    const { winner, ...people } = res
    gameState.winner = winner
    gameState.people = people
    setCurrentScene(scenes.endGame, gameState, nextPossibleScenes[scenes.endGame])
    waitingModal.setVisible(false)
  })

  const skip = () => {
    axios.post(`${url}/ready-end-round`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
    })
    waitingModal.setVisible(true)
  }

  const nextTurn = () => {
    axios.post(`${url}/ready-next-round`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
    })
    waitingModal.setVisible(true)
  }

  const playAction = (actionType: 'spy' | 'expose' | 'factCheck') => {
    // TODO: PLAY AN ACTION
    axios.post(`${url}/ready-end-round`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
    })
  }

  summaryModal.nextTurnButton.on('mousedown', nextTurn).on('touchstart', nextTurn)

  specialActionContainer.skipButton.on('mousedown', skip).on('touchstart', skip)
  specialActionContainer.spyButton
    .on('mousedown', () => playAction('spy'))
    .on('touchstart', () => playAction('spy'))
  specialActionContainer.exposeButton
    .on('mousedown', () => playAction('expose'))
    .on('touchstart', () => playAction('expose'))
  specialActionContainer.factCheckButton
    .on('mousedown', () => playAction('factCheck'))
    .on('touchstart', () => playAction('factCheck'))

  scene.onAppear = async () => {
    // RESET
    specialActionContainer.visible = false
    summaryModal.visible = false
    duelCompareBg.visible = true
    myChannelContainer.visible = true
    duelCompareBg.x = 66

    // INIT CHANNEL NAMES
    const { allChannels, battleResult, playerId, gold } = gameState
    console.log(gameState)

    opponentChannelContainer.initChannels(allChannels)

    const channelPadding = 25
    const resultCount = battleResult.peopleStates.length
    let currentDuel = 0

    let opponentId = ''
    const sampleResult = battleResult.peopleStates[0]
    Object.keys(sampleResult).forEach((id) => {
      if (id !== playerId) opponentId = id
    })

    myChannelContainer.setCards(battleResult[playerId])
    opponentChannelContainer.setCards(battleResult[opponentId])

    peopleBar.setPeople(
      battleResult.peopleStates[currentDuel][playerId],
      battleResult.peopleStates[currentDuel][opponentId],
    )
    currentDuel += 1

    const timer = setInterval(() => {
      if (currentDuel >= resultCount) {
        clearInterval(timer)
        duelCompareBg.visible = false
        myChannelContainer.visible = false

        specialActionContainer.moneyBar.setMoney(gold)
        specialActionContainer.visible = true

        axios.post(`${url}/ready-special-action`, {
          gameId: gameState.gameId,
          playerId: gameState.playerId,
        })

        return
      }

      peopleBar.setPeople(
        battleResult.peopleStates[currentDuel][playerId],
        battleResult.peopleStates[currentDuel][opponentId],
      )
      duelCompareBg.x = duelCompareBg.x + duelCompareBg.width + channelPadding
      currentDuel += 1
    }, 2000)
  }

  return scene
}

export default DuelScene
