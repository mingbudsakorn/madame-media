import * as PIXI from 'pixi.js'
import loadGameplayScene from './loadScene'
import { scenes } from '../../constants/scenes'

import { gameState as initGameState } from '../../constants/initialState'
import { GameState, Scene, SceneWrapper } from '../../types'

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

  // example set special event modal
  // specialEventModal.setSpecialEvent('พายุเข้า!! -> สัญญาณหาย \nส่งผลให้ตานี้ประสิทธิภาพช่องทางสื่อ โซเชี่ยลมีเดีย และ เว็บเพจ ลดลง 50% ในขณะที่ โทรทัศน์ และ วิทยุ ใช้การไม่ได้')
  // specialEventModal.toggle()
  // specialEvent.setSpecialEvent('พายุเข้า!!')
  // specialEvent.visible = true

  // SELECT CARD FROM DECK
  const initExpandedContainer = () => {
    expandedContainer.cardArray.forEach((e) => {
      const selectCard = () => {
        const isReal = e.card.getIsReal()
        const cardConfig = e.card.getCardConfig()
        const price = isReal ? cardConfig.price : cardConfig.price / 2

        if (gameState.gold < price) {
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
                initExpandedContainer()

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

    // Get Game State
    const res = await axios.get(
      `${url}/state?gameId=${gameState.gameId}&playerId=${gameState.playerId}`,
    )
    if (res && res.data) {
      const { people, opponent, gold, round, availableChannels, cards } = res.data
      peopleBar.setPeople(people, opponent)
      turnText.setTurnText(round)

      shopModal.scene.updateChannels(availableChannels)
      channelDeck.scene.updateChannels(availableChannels)
      initChannelDeck()

      cardContainer.setCards(cards)
      expandedContainer.scene.setCards(cards)
      initExpandedContainer()

      // Store In Game State
      changeGold(gold)
      gameState.currentRound = round
    }

    initialized = true
  }

  return scene
}

export default GameplayScene
