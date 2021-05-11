import * as PIXI from 'pixi.js'
import loadGameplayScene from './loadScene'
import { scenes } from '../../constants/scenes'

import { gameState as initGameState } from '../../constants/initialState'
import { Channel, GameState, Scene, SceneWrapper } from '../../types'

import socket from '../../socket'
import axios from 'axios'

// socket.emit('start-game')
const url = process.env.BACKEND_URL

const GameplayScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const gameplayScene = loadGameplayScene(resources) as SceneWrapper
  const scene = gameplayScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initGameState
  scene.setGameState = (settingState: GameState) => {
    if (settingState) {
      gameState = settingState
    }
  }

  const {
    finishButton,
    buyChannelButton,
    moneyBar,
    peopleBar,
    timeBar,
    player1,
    player2,
    turnText,
    cardContainer,
    expandedContainer,
    channelDeck,
    specialEventModal,
    specialEvent,
    shopModal,
    notEnoughMoneyModal,
    waitingModal,
  } = gameplayScene.children

  // Scene States
  let currentCard = null
  let initialized = false
  let localAvailableChannels = [] as Channel[]
  let allowFake = true

  // ON GOLD CHANGE
  const changeGold = (newGold: number) => {
    shopModal.scene.setMoneyText(newGold)
    moneyBar.setMoney(newGold)
    expandedContainer.moneyBar.setMoney(newGold)
    gameState.gold = newGold
  }

  // TIMER
  socket.on('countdown', (timeLeft) => {
    if (scene.visible) {
      if (timeLeft <= 0) {
        ready()
      } else {
        timeBar.setTime(timeLeft)
      }
    }
  })

  // READY/FINISH/TIMEOUT
  const ready = async () => {
    waitingModal.setVisible(true)
    const url = process.env.BACKEND_URL
    await axios.post(`${url}/ready-battle`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
    })
  }

  socket.on('battle-result', (res) => {
    gameState.battleResult = res.result
    setCurrentScene(scenes.duel, gameState, nextPossibleScenes[scenes.duel])
  })

  finishButton
    .on('mousedown', () => onClickFinishButton())
    .on('touchstart', () => onClickFinishButton())
  const onClickFinishButton = () => {
    ready()
  }

  buyChannelButton
    .on('mousedown', () => (shopModal.scene.visible = true))
    .on('touchstart', () => (shopModal.scene.visible = true))

  // SELECT CARD FROM DECK
  const initExpandedContainer = (allowFake: boolean) => {
    expandedContainer.cardArray.forEach((e) => {
      console.log(allowFake)
      if (!allowFake) {
        e.toggleButton.interactive = false
        e.toggleButton.visible = false
        e.useButton.y = 420
      } else {
        e.toggleButton.interactive = true
        e.toggleButton.visible = true
        e.useButton.y = 500
      }

      const selectCard = () => {
        const isReal = e.card.getIsReal()
        const cardConfig = e.card.getCardConfig()
        const cost = isReal ? cardConfig.cost : cardConfig.cost / 2

        if (gameState.gold < cost) {
          notEnoughMoneyModal.toggle()
        } else {
          channelDeck.scene.setOnSelect(true)
          currentCard = {
            ...cardConfig,
            isReal,
          }
          expandedContainer.scene.visible = false
        }
      }
      e.useButton.on('mousedown', selectCard).on('touchstart', selectCard)
    })
  }

  // PLACE CARD
  const initChannelDeck = () => {
    channelDeck.channelArray.forEach((channelObject) => {
      const insertCard = () => {
        if (currentCard) {
          // check if the channel is owned
          const avail = localAvailableChannels.filter(
            (e) => e.type === channelObject.getChannelConfig().type,
          )
          if (avail.length === 0) return

          if (gameState.gold < currentCard.cost) {
            notEnoughMoneyModal.toggle()
            return
          }

          axios
            .post(`${url}/place-card`, {
              channelType: channelObject.getChannelConfig().type,
              cardId: currentCard.id,
              isReal: currentCard.isReal,
              gameId: gameState.gameId,
              playerId: gameState.playerId,
            })
            .then((res) => {
              if (res && res.data) {
                const newGameState = res.data
                const { gold, cards } = newGameState
                channelObject.setCard(currentCard, currentCard.isReal)
                channelDeck.scene.setOnSelect(false)
                currentCard = null

                // change cards in deck
                cardContainer.setCards(cards)
                expandedContainer.scene.setCards(cards)
                initExpandedContainer(allowFake)

                changeGold(gold)
              }
            })
        }
      }
      channelObject.on('mousedown', insertCard).on('touchstart', insertCard)
    })
  }

  // BUY CHANNELS
  const buyChannels = () => {
    if (shopModal.scene.getTotalCost() > gameState.gold) {
      notEnoughMoneyModal.toggle()
      return
    }

    const selectedChannels = shopModal.scene.getSelectedChannels()
    const channelTypeNumbers = []
    selectedChannels.forEach((channel) => {
      channelTypeNumbers.push(channel.getChannelConfig().type)
    })

    axios
      .post(`${url}/buy-channels`, {
        gameId: gameState.gameId,
        playerId: gameState.playerId,
        channelTypes: channelTypeNumbers,
      })
      .then((res) => {
        if (res && res.data) {
          const newGameState = res.data
          // Update state
          shopModal.scene.updateChannels(newGameState.availableChannels)
          channelDeck.scene.updateChannels(newGameState.availableChannels)
          changeGold(newGameState.gold)

          localAvailableChannels = newGameState.availableChannels

          shopModal.scene.visible = false
        }
      })
  }
  shopModal.buyButton.on('mousedown', buyChannels).on('touchstart', buyChannels)

  // ON APPEAR
  scene.onAppear = async () => {
    if (!initialized) {
      if (gameState.player1 && gameState.player2) {
        player1.setAvatarImg(gameState.player1.avatar)
        player1.setAvatarName(gameState.player1.name)
        player2.setAvatarImg(gameState.player2.avatar)
        player2.setAvatarName(gameState.player2.name)
      }

      // Get all channels
      const channelsRes = await axios.get(`${url}/channels`)
      if (channelsRes && channelsRes.data) {
        gameState.allChannels = channelsRes.data.channelData
        channelDeck.scene.initChannels(channelsRes.data.channelData)
        shopModal.scene.initChannels(channelsRes.data.channelData)
      }
    }

    waitingModal.setVisible(false)
    channelDeck.scene.clearCards()
    allowFake = true
    specialEvent.visible = false

    // Get Game State
    const res = await axios.get(
      `${url}/state?gameId=${gameState.gameId}&playerId=${gameState.playerId}`,
    )
    if (res && res.data) {
      const {
        people,
        opponent,
        gold,
        round,
        availableChannels,
        cards,
        specialEvent: specialEventInfo,
      } = res.data
      peopleBar.setPeople(people, opponent)
      turnText.setTurnText(round)

      // SPECIAL EVENT
      if (specialEventInfo) {
        specialEventModal.setSpecialEvent(specialEventInfo.name, specialEventInfo.description)
        specialEventModal.toggle()
        specialEvent.visible = true

        console.log(specialEventInfo.cardEffect.allowFake)

        if (specialEventInfo.cardEffect && specialEventInfo.cardEffect.allowFake === false) {
          allowFake = false
        }
        console.log(allowFake)
      }

      shopModal.scene.updateChannels(availableChannels)
      channelDeck.scene.updateChannels(availableChannels)
      initChannelDeck()

      cardContainer.setCards(cards)
      expandedContainer.scene.setCards(cards)
      initExpandedContainer(allowFake)

      localAvailableChannels = availableChannels

      // Store In Game State
      changeGold(gold)
      gameState.currentRound = round
    }

    initialized = true
  }

  return scene
}

export default GameplayScene
