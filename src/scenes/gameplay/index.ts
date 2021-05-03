import * as PIXI from 'pixi.js'
import loadGameplayScene from './loadScene'
import { scenes } from '../../constants/scenes'

import { gameState as initGameState } from '../../constants/initialState'
import { MONEY_CONFIG, PEOPLE_BAR_CONFIG, TIME_BAR_CONFIG } from '../../constants/gameConfig'
import { Card, CardSet, GameState, Scene, SceneWrapper } from '../../types'
import { AVATAR } from '../../constants/avatar'
import { CardType } from '../../components/card'
import { ChannelType } from '../../components/channel'
import { CHANNEL, CHANNEL_THAI_NAME_MAP, INIT_CHANNEL_CARD_LIST } from '../../constants/channels'
import { CARD } from '../../constants/card'

import socket from '../../socket'
import axios from 'axios'

socket.emit('start-game')

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
    gameState = settingState
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

  const { cards } = gameState
  // Game States
  let currentlySelectingCards = false
  let currentCard = null
  let currentCardIndex = null
  let usedCards = []

  scene.onAppear = async () => {
    if (gameState.player1 && gameState.player2) {
      player1.setAvatarImg(gameState.player1.avatar)
      player1.setAvatarName(gameState.player1.name)
      player2.setAvatarImg(gameState.player2.avatar)
      player2.setAvatarName(gameState.player2.name)
    }

    const url = process.env.BACKEND_URL
    const res = await axios.get(
      `${url}/state?gameId=${gameState.gameId}&playerId=${gameState.playerId}`,
    )
    if (res && res.data) {
      const { people, neutral, opponent, gold, round, availableChannels } = res.data
      peopleBar.setPeople(people, opponent)
      moneyBar.setMoney(gold)
      turnText.setTurnText(round)

      // Set in Game State
      gameState.people.ours = people
      gameState.people.theirs = opponent
      gameState.people.neutral = neutral
      gameState.money = gold
      gameState.currentTurn = round
      availableChannels.map((channel) => {
        gameState.availableChannels[channel.name] = true
      })

      shopModal.setChannels(availableChannels)
      channelDeck.setAvailableChannels()
    }
  }

  // TIMER
  socket.on('countdown', (timeLeft) => {
    if (timeLeft <= 0) {
      ready()
    } else {
      timeBar.setTime(timeLeft)
    }
  })

  // READY/FINISH/TIMEOUT
  const ready = async () => {
    const url = process.env.BACKEND_URL
    await axios.post(`${url}/ready-battle`, {
      gameId: gameState.gameId,
      playerId: gameState.playerId,
    })
  }

  socket.on('battle-result', () => {
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

  // SELECT CARD
  const insertCard = (channel: ChannelType, card: CardSet, isReal: boolean) => {
    channel.setCard(card, isReal)
  }

  // PUT CARD INTO CHANNEL
  Object.keys(channelDeck.channels).forEach((channel) => {
    const channelObject = channelDeck.channels[channel]
    channelObject.on('mousedown', () => {
      if (currentlySelectingCards && channelObject.getIsAvailable()) {
        insertCard(channelObject, currentCard, currentCard.isReal)
        cards[channel] = currentCard.isReal ? currentCard.real : currentCard.fake
        currentlySelectingCards = false
        expandedContainer.scene.useCard(currentCardIndex)

        // DEDUCT MONEY
        const cardPrice = currentCard.isReal ? currentCard.real.price : currentCard.fake.price
        const deductedMoney = gameState.money - cardPrice
        gameState.money = deductedMoney
        moneyBar.setMoney(deductedMoney)

        // DEDUCT CARD
        usedCards.push(currentCard.index)

        channelDeck.scene.setOnSelect(false)
        currentCard = null
        refreshExpandedContainer()
      }
    })
  })

  // example set special event modal
  // specialEventModal.setSpecialEvent('พายุเข้า!! -> สัญญาณหาย \nส่งผลให้ตานี้ประสิทธิภาพช่องทางสื่อ โซเชี่ยลมีเดีย และ เว็บเพจ ลดลง 50% ในขณะที่ โทรทัศน์ และ วิทยุ ใช้การไม่ได้')
  // specialEventModal.toggle()
  // specialEvent.setSpecialEvent('พายุเข้า!!')
  // specialEvent.visible = true

  // SELECT CARD FROM DECK
  const refreshExpandedContainer = () => {
    expandedContainer.cardArray.forEach((e, i) => {
      expandedContainer.moneyBar.setMoney(gameState.money)
      e.useButton.removeAllListeners()
      e.card.removeAllListeners()
      const used = usedCards.includes(i)
      if (used) {
        e.card.visible = false
      } else {
        e.card.interactive = true
        const selectCard = () => {
          const isReal = e.card.getIsReal()
          const cardConfig = e.card.getCardConfig()
          const price = isReal ? cardConfig.real.price : cardConfig.fake.price
          if (gameState.money < price) {
            notEnoughMoneyModal.toggle()
          } else {
            channelDeck.scene.setOnSelect(true)
            currentlySelectingCards = true
            currentCard = {
              ...cardConfig,
              isReal,
              index: i,
            }
            currentCardIndex = i
            expandedContainer.scene.visible = false
          }
        }
        e.useButton.on('mousedown', () => {
          selectCard()
        })
        e.card.on('mousedown', () => {
          selectCard()
        })
      }
    })
  }
  refreshExpandedContainer()

  // BUY CHANNELS
  const buyChannels = () => {
    const selectedChannels = shopModal.scene.getSelectedChannels()
    selectedChannels.forEach((e) => {
      gameState.availableChannels[CHANNEL_THAI_NAME_MAP[e.channelConfig.name]] = true
    })
    gameState.money = gameState.money - shopModal.scene.getTotalCost()
    moneyBar.setMoney(gameState.money)
    shopModal.scene.setMoneyText(gameState.money)
    expandedContainer.moneyBar.setMoney(gameState.money)
    shopModal.scene.visible = false

    // SET OWNED CHANNELS
    const newChannels = shopModal.scene.getChannels()
    selectedChannels.forEach((e) => {
      newChannels[CHANNEL_THAI_NAME_MAP[e.channelConfig.name]].isOwned = true
    })
    shopModal.scene.setChannels(newChannels)
    channelDeck.scene.setAvailableChannels(newChannels)
  }
  shopModal.buyButton.on('mousedown', buyChannels).on('touchstart', buyChannels)

  return scene
}

export default GameplayScene
