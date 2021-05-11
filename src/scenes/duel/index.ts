import * as PIXI from 'pixi.js'
import loadDuelScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { SPECIAL_ACTION_TYPE } from '../../constants/specialAction'
import { gameState as initGameState } from '../../constants/initialState'

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

  socket.on('special-action-result', (res) => {
    waitingModal.setVisible(false)
    myChannelContainer.visible = true
    specialActionContainer.visible = false
    opponentChannelContainer.removeAllOverlay()
    // show summary

    summaryModal.visible = true
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

  const playAction = async (actionType: 'SPY' | 'EXPOSE' | 'FACT_CHECK') => {
    if (actionType === 'FACT_CHECK') {
      specialActionContainer.setToFactCheck()
      opponentChannelContainer.setToSelect()

      const startFactCheck = async () => {
        const cardObject = opponentChannelContainer.getSelectedCard()

        axios.post(`${url}/play-special-action`, {
          gameId: gameState.gameId,
          playerId: gameState.playerId,
          actionType: SPECIAL_ACTION_TYPE[actionType],
          cardId: cardObject.getCardConfig().id,
        })

        opponentChannelContainer.removeAllOverlay()
      }

      specialActionContainer.confirmButton
        .on('mousedown', startFactCheck)
        .on('touchstart', startFactCheck)
    } else if (actionType === 'EXPOSE') {
      specialActionContainer.setToExpose()
      opponentChannelContainer.setToSelect()

      const startExpose = async () => {
        const cardObject = opponentChannelContainer.getSelectedCard()

        axios.post(`${url}/play-special-action`, {
          gameId: gameState.gameId,
          playerId: gameState.playerId,
          actionType: SPECIAL_ACTION_TYPE[actionType],
          cardId: cardObject.getCardConfig().id,
        })
        opponentChannelContainer.removeAllOverlay()
      }

      specialActionContainer.confirmButton
        .on('mousedown', startExpose)
        .on('touchstart', startExpose)
    } else if (actionType === 'SPY') {
      specialActionContainer.setToSpy()

      axios.post(`${url}/play-special-action`, {
        gameId: gameState.gameId,
        playerId: gameState.playerId,
        actionType: SPECIAL_ACTION_TYPE[actionType],
      })

      skip()
    }
  }

  summaryModal.nextTurnButton.on('mousedown', nextTurn).on('touchstart', nextTurn)

  specialActionContainer.skipButton.on('mousedown', skip).on('touchstart', skip)
  specialActionContainer.spyButton
    .on('mousedown', () => playAction('SPY'))
    .on('touchstart', () => playAction('SPY'))
  specialActionContainer.exposeButton
    .on('mousedown', () => playAction('EXPOSE'))
    .on('touchstart', () => playAction('EXPOSE'))
  specialActionContainer.factCheckButton
    .on('mousedown', () => playAction('FACT_CHECK'))
    .on('touchstart', () => playAction('FACT_CHECK'))

  scene.onAppear = async () => {
    // RESET
    specialActionContainer.visible = false
    summaryModal.visible = false
    duelCompareBg.visible = true
    myChannelContainer.visible = true
    duelCompareBg.x = 66
    specialActionContainer.reset()

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
