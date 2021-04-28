import * as PIXI from 'pixi.js'
import loadGameplayScene from './loadScene'
import { scenes } from '../../constants/scenes'

import { gameState as initGameState } from '../../constants/initialState'
import { MONEY_CONFIG, PEOPLE_BAR_CONFIG, TIME_BAR_CONFIG } from '../../constants/gameConfig'
import { GameState, Scene, SceneWrapper } from '../../types'
import { AVATAR } from '../../constants/avatar'
import { CardType } from '../../components/card'
import { ChannelType } from '../../components/channel'
import { CHANNEL, INIT_CHANNEL_CARD_LIST } from '../../constants/channels'
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
  } = gameplayScene.children

  const { cards } = gameState
  // Game States
  let currentlySelectingCards = false
  let currentCard = null
  let currentCardIndex = null

  scene.onAppear = async () => {
    player1.setAvatarImg(gameState.player1.avatar)
    player1.setAvatarName(gameState.player1.name)
    player2.setAvatarImg(gameState.player2.avatar)
    player2.setAvatarName(gameState.player2.name)

    const url = process.env.BACKEND_URL
    const res = await axios.get(
      `${url}/state?gameId=${gameState.gameId}&playerId=${gameState.playerId}`,
    )
    if (res && res.data) {
      const { people, neutral, opponent, gold, round } = res.data
      peopleBar.setPeople(people, opponent)
      moneyBar.setMoney(gold)
      turnText.setTurnText(round)

      // Set in Game State
      gameState.people.ours = people
      gameState.people.theirs = opponent
      gameState.people.neutral = neutral
      gameState.money = gold
      gameState.currentTurn = round
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

  // SELECT CARD
  const insertCard = (channel: ChannelType, card: CardType) => {
    channel.setCard(card)
  }

  // PUT CARD INTO CHANNEL
  Object.keys(channelDeck.channels).forEach((channel) => {
    const channelObject = channelDeck.channels[channel]
    channelObject.on('mousedown', () => {
      if (currentlySelectingCards && channelObject.isAvailable()) {
        insertCard(channelObject, currentCard)
        cards[channel] = currentCard
        currentlySelectingCards = false
        expandedContainer.scene.useCard(currentCardIndex)

        // DEDUCT MONEY
        const deductedMoney = gameState.money - currentCard.getCardConfig().price
        console.log(currentCard)
        gameState.money = deductedMoney
        moneyBar.setMoney(deductedMoney)

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
      const price = e.card.getCardConfig().price
      e.useButton.removeAllListeners()
      e.card.removeAllListeners()
      if (gameState.money < price) {
        e.card.interactive = false
      } else {
        e.card.interactive = true
        e.useButton.on('mousedown', () => {
          channelDeck.scene.setOnSelect(true)
          currentlySelectingCards = true
          currentCard = e.card
          currentCardIndex = i
          expandedContainer.scene.visible = false
        })
        e.card.on('mousedown', () => {
          channelDeck.scene.setOnSelect(true)
          currentCard = e.card
          currentCardIndex = i
          currentlySelectingCards = true
          expandedContainer.scene.visible = false
        })
      }
    })
  }
  refreshExpandedContainer()

  return scene
}

export default GameplayScene
