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

const GameplayScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const gameplayScene = loadGameplayScene(resources) as SceneWrapper
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
  const scene = gameplayScene.scene as Scene

  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }

  // Init
  let gameState = initGameState

  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  let { cards, money } = gameState

  let timer
  scene.onAppear = () => {
    // Timing
    // let timeLeft = TIME_BAR_CONFIG.TIME_PER_TURN
    // timer = setInterval(() => {
    //   if (timeLeft === 0) {
    //     clearInterval(timer)
    //     return
    //   }
    //   timeBar.setTime(timeLeft - 1)
    //   timeLeft -= 1
    // }, 1000)
  }

  // Game States
  let currentlySelectingCards = false
  let currentCard = null
  let currentCardIndex = null
  moneyBar.setMoney(money)
  peopleBar.setPeople(PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE, PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE)
  // example to set turnText
  // turnText.setTurnText(2)

  // Select Card
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
        money = money - currentCard.getCardConfig().price
        moneyBar.setMoney(money)

        channelDeck.scene.setOnSelect(false)
        currentCard = null
      }
    })
  })

  //example to set avatar
  // player1.setAvatarName('พอล')
  // player1.setAvatarImg(AVATAR.man2)

  //example to set channel and card
  // channelDeck.setChannel(INIT_CHANNEL_CARD_LIST)

  // example set special event modal
  // specialEventModal.setSpecialEvent('พายุเข้า!! -> สัญญาณหาย \nส่งผลให้ตานี้ประสิทธิภาพช่องทางสื่อ โซเชี่ยลมีเดีย และ เว็บเพจ ลดลง 50% ในขณะที่ โทรทัศน์ และ วิทยุ ใช้การไม่ได้')
  // specialEventModal.toggle()
  // specialEvent.setSpecialEvent('พายุเข้า!!')
  // specialEvent.visible = true

  shopModal.setTotalCost(1000)

  // SELECT CARD FROM DECK
  expandedContainer.cardArray.forEach((e, i) => {
    const price = e.card.getCardConfig().price
    if (money < price) {
      e.card.interactive = false
      e.card.opacity = 0.7
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

  // FINISH
  finishButton
    .on('mousedown', () => onClickFinishButton())
    .on('touchstart', () => onClickFinishButton())
  const onClickFinishButton = () => {
    clearInterval(timer)
    setCurrentScene(scenes.duel, gameState, nextPossibleScenes[scenes.duel])
  }

  return scene
}

export default GameplayScene
