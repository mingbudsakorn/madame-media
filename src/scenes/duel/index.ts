import * as PIXI from 'pixi.js'
import loadDuelScene from './loadScene'
import { Card, GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { SPECIAL_ACTION_COST, SPECIAL_ACTION_TYPE } from '../../constants/specialAction'
import { gameState as initGameState } from '../../constants/initialState'

import socket from '../../socket'
import axios from 'axios'
import { shake, shakeHard } from '../../effects'

const url = process.env.BACKEND_URL
let opponentId = ''
let peopleBeforeSpecialAction = {
  mine: 0,
  opponent: 0,
}

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

  let prevResult = {}
  let currentGold = 0

  const {
    duelCompareBg,
    opponentChannelContainer,
    myChannelContainer,
    specialActionContainer,
    summaryModal,
    peopleBar,
    waitingModal,
    notEnoughMoneyModal,
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
    opponentChannelContainer.setSummary(res[opponentId], true)
    myChannelContainer.setSummary(res[gameState.playerId], true)

    peopleBar.setPeople(res[gameState.playerId].people, res[opponentId].people)

    summaryModal.visible = true
  })

  socket.on('end-round', () => {
    opponentChannelContainer.clearSummary()
    myChannelContainer.clearSummary()
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

  specialActionContainer.finishButton.on('mousedown', skip).on('touchstart', skip)

  const displaySpecialActionResult = (res, type) => {
    const result = res.data.result[opponentId].exposedCards
    let newCard = {} as any
    Object.keys(result).forEach((channel) => {
      if (!prevResult[channel]) {
        newCard = result[channel]
      }
    })
    if (newCard.isReal === false) {
      if (type === SPECIAL_ACTION_TYPE.FACT_CHECK) {
        specialActionContainer.displayFactCheckResult(
          true,
          res.data.result[opponentId].people,
          peopleBeforeSpecialAction.opponent,
        )
      } else {
        // EXPOSE
        specialActionContainer.displayExposeResult(
          true,
          res.data.result[opponentId].people,
          peopleBeforeSpecialAction.opponent,
        )
      }
    } else {
      if (type === SPECIAL_ACTION_TYPE.FACT_CHECK) {
        specialActionContainer.displayFactCheckResult(false, 0, 0)
      } else {
        specialActionContainer.displayExposeResult(false, 0, 0)
      }
    }
  }

  const playAction = async (actionType: 'SPY' | 'EXPOSE' | 'FACT_CHECK') => {
    if (SPECIAL_ACTION_COST[actionType] > currentGold) {
      notEnoughMoneyModal.visible = true
      return
    }

    if (actionType === 'FACT_CHECK') {
      specialActionContainer.setToFactCheck()
      opponentChannelContainer.setToSelect()

      const startFactCheck = async () => {
        if (SPECIAL_ACTION_COST.FACT_CHECK > currentGold) {
          notEnoughMoneyModal.visible = true
          return
        }

        const cardObject = opponentChannelContainer.getSelectedCard()
        if (cardObject) {
          axios
            .post(`${url}/play-special-action`, {
              gameId: gameState.gameId,
              playerId: gameState.playerId,
              actionType: SPECIAL_ACTION_TYPE[actionType],
              cardId: cardObject.getCardConfig().id,
            })
            .then((res) => {
              specialActionContainer.moneyBar.setMoney(res.data.state.gold)
              currentGold = res.data.state.gold

              const result = res.data.result[opponentId].exposedCards
              displaySpecialActionResult(res, SPECIAL_ACTION_TYPE.FACT_CHECK)

              opponentChannelContainer.setSummary(res.data.result[opponentId], false)
              peopleBar.setPeople(
                res.data.result[gameState.playerId].people,
                res.data.result[opponentId].people,
              )

              prevResult = result
              peopleBeforeSpecialAction = {
                mine: res.data.result[gameState.playerId].people,
                opponent: res.data.result[opponentId].people,
              }
            })

          opponentChannelContainer.removeAllOverlay()
        }
      }

      specialActionContainer.confirmButton.removeAllListeners()
      specialActionContainer.confirmButton
        .on('mousedown', startFactCheck)
        .on('touchstart', startFactCheck)
    } else if (actionType === 'EXPOSE') {
      specialActionContainer.setToExpose()
      opponentChannelContainer.setToSelect()

      const startExpose = async () => {
        if (SPECIAL_ACTION_COST.EXPOSE > currentGold) {
          notEnoughMoneyModal.visible = true
          return
        }

        const cardObject = opponentChannelContainer.getSelectedCard()
        if (cardObject) {
          axios
            .post(`${url}/play-special-action`, {
              gameId: gameState.gameId,
              playerId: gameState.playerId,
              actionType: SPECIAL_ACTION_TYPE[actionType],
              cardId: cardObject.getCardConfig().id,
            })
            .then((res) => {
              specialActionContainer.moneyBar.setMoney(res.data.state.gold)
              currentGold = res.data.state.gold

              const result = res.data.result[opponentId].exposedCards
              displaySpecialActionResult(res, SPECIAL_ACTION_TYPE.EXPOSE)

              opponentChannelContainer.setSummary(res.data.result[opponentId], false)
              peopleBar.setPeople(
                res.data.result[gameState.playerId].people,
                res.data.result[opponentId].people,
              )

              prevResult = result
              peopleBeforeSpecialAction = {
                mine: res.data.result[gameState.playerId].people,
                opponent: res.data.result[opponentId].people,
              }
            })
          opponentChannelContainer.removeAllOverlay()
        }
      }

      specialActionContainer.confirmButton.removeAllListeners()
      specialActionContainer.confirmButton
        .on('mousedown', startExpose)
        .on('touchstart', startExpose)
    } else if (actionType === 'SPY') {
      if (SPECIAL_ACTION_COST.SPY > currentGold) {
        notEnoughMoneyModal.visible = true
        return
      }

      specialActionContainer.setToSpy()
      axios
        .post(`${url}/play-special-action`, {
          gameId: gameState.gameId,
          playerId: gameState.playerId,
          actionType: SPECIAL_ACTION_TYPE[actionType],
        })
        .then((res) => {
          specialActionContainer.moneyBar.setMoney(res.data.state.gold)
          currentGold = res.data.state.gold

          const result = res.data.result[opponentId].exposedCards
          opponentChannelContainer.spyCards(result)
        })
      specialActionContainer.confirmButton.removeAllListeners()
      specialActionContainer.confirmButton.on('mousedown', skip).on('touchstart', skip)
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

  const shakeEffect = (people, prevPeople, opponent, prevOpponent) => {
    if (Math.abs(people - prevPeople) + Math.abs(opponent - prevOpponent) > 150) {
      shakeHard()
    } else if (Math.abs(people - prevPeople) + Math.abs(opponent - prevOpponent) > 100) {
      shake()
    }
  }

  scene.onAppear = async () => {
    // RESET
    summaryModal.visible = false
    specialActionContainer.visible = false
    summaryModal.visible = false
    duelCompareBg.visible = true
    myChannelContainer.visible = true
    duelCompareBg.x = 66
    specialActionContainer.reset()
    myChannelContainer.setCards({})
    opponentChannelContainer.setCards({})

    // INIT CHANNEL NAMES
    const { allChannels, battleResult, playerId, gold } = gameState

    currentGold = gold

    opponentChannelContainer.initChannels(allChannels)

    const channelPadding = 25
    const resultCount = battleResult.peopleStates.length
    let currentDuel = 0

    const sampleResult = battleResult.peopleStates[0]
    Object.keys(sampleResult).forEach((id) => {
      if (id !== playerId) opponentId = id
    })

    // For effects
    let prevMyPeople = 0
    let prevOpponentPeople = 0
    const res = await axios.get(
      `${url}/state?gameId=${gameState.gameId}&playerId=${gameState.playerId}`,
    )
    if (res && res.data) {
      prevMyPeople = res.data.people
      prevOpponentPeople = res.data.opponent
    }

    myChannelContainer.setCards(battleResult[playerId])
    opponentChannelContainer.setCards(battleResult[opponentId])

    peopleBar.setPeople(
      battleResult.peopleStates[currentDuel][playerId],
      battleResult.peopleStates[currentDuel][opponentId],
    )

    prevMyPeople = battleResult.peopleStates[currentDuel][playerId]
    prevOpponentPeople = battleResult.peopleStates[currentDuel][opponentId]

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

      const myPeople = battleResult.peopleStates[currentDuel][playerId]
      const opponentPeople = battleResult.peopleStates[currentDuel][opponentId]

      peopleBar.setPeople(myPeople, opponentPeople)
      duelCompareBg.x = duelCompareBg.x + duelCompareBg.width + channelPadding
      currentDuel += 1

      shakeEffect(myPeople, prevMyPeople, opponentPeople, prevOpponentPeople)

      prevMyPeople = myPeople
      prevOpponentPeople = opponentPeople

      peopleBeforeSpecialAction = {
        mine: myPeople,
        opponent: opponentPeople,
      }
    }, 2000)
  }

  return scene
}

export default DuelScene
