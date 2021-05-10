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
  } = duelScene.children

  // TIMER
  socket.on('countdown', (timeLeft) => {
    if (timeLeft <= 0) {
      showSummary()
    } else {
      specialActionContainer.setTime(timeLeft)
    }
  })

  const showSummary = () => {
    // myChannelContainer.setSummary(channelSlots, mockSummary())
    summaryModal.visible = true
  }

  const nextTurn = () => {
    if (gameState.currentRound === gameState.rounds) {
      setCurrentScene(scenes.endGame, gameState, nextPossibleScenes[scenes.endGame])
    } else {
      setCurrentScene(scenes.cardShop, gameState, nextPossibleScenes[scenes.cardShop])
    }
  }

  summaryModal.nextTurnButton.on('mousedown', nextTurn).on('touchstart', nextTurn)

  specialActionContainer.skipButton.on('mousedown', showSummary).on('touchstart', showSummary)

  scene.onAppear = async () => {
    // INIT CHANNEL NAMES
    const { allChannels, battleResult, playerId, gold } = gameState

    opponentChannelContainer.initChannels(allChannels)

    const res = await axios.get(
      `${url}/state?gameId=${gameState.gameId}&playerId=${gameState.playerId}`,
    )
    if (res && res.data) {
      const { channelSlots, people, opponent } = res.data
      myChannelContainer.setCards(channelSlots)
      // INIT PEOPLE
      peopleBar.setPeople(people, opponent)
    }

    const channelPadding = 25
    const resultCount = battleResult.length
    let currentDuel = 0
    const timer = setInterval(() => {
      if (currentDuel >= resultCount - 1) {
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

      let opponentId = ''
      const sampleResult = battleResult[0]
      Object.keys(sampleResult).forEach((id) => {
        if (id !== playerId) opponentId = id
      })

      peopleBar.setPeople(
        battleResult[currentDuel][playerId],
        battleResult[currentDuel][opponentId],
      )
      duelCompareBg.x = duelCompareBg.x + duelCompareBg.width + channelPadding
      currentDuel += 1
    }, 2000)
  }

  return scene
}

export default DuelScene
