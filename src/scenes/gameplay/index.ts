import * as PIXI from 'pixi.js'
import loadGameplayScene from './loadScene'
import { scenes } from '../../constants/scenes'

import { MONEY_CONFIG, PEOPLE_BAR_CONFIG, TIME_BAR_CONFIG } from '../../constants/gameConfig'
import { Scene } from '../../types'
import { AVATAR } from '../../constants/avatar'
import { CardType } from '../../components/card'
import { ChannelType } from '../../components/channel'

const GameplayScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const gameplayScene = loadGameplayScene(resources)
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
  } = gameplayScene.children
  const scene = gameplayScene.scene

  let timer

  // Game States
  let currentlySelectingCards = false
  let currentCard = null
  let currentCardIndex = null
  let currentChannels = {
    SOCIAL_MEDIA: null,
    MOUTH: null,
    WEBPAGE: null,
    TV: null,
    RADIO: null,
    PUBLICATION: null,
    OUT_OF_HOME: null,
  }
  let money = MONEY_CONFIG.INIT

  // Init
  moneyBar.setMoney(money)
  peopleBar.setPeople(PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE, PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE)
  // example to set turnText
  // turnText.setTurnText(2)

  // Buttons
  finishButton
    .on('mousedown', () => onClickFinishButton(setCurrentScene))
    .on('touchstart', () => onClickFinishButton(setCurrentScene))
  const onClickFinishButton = (setCurrentScene: (scene: number) => void) => {
    clearInterval(timer)
    setCurrentScene(scenes.duel)
  }

  // buyChannelButton
  //   .on('mousedown', () => onClickBuyChannel(setCurrentScene))
  //   .on('touchstart', () => onClickBuyChannel(setCurrentScene))

  // const onClickBuyChannel = (setCurrentScene: (scene: number) => void) => {
  //   setCurrentScene(scenes.shop)
  // }

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
        currentChannels[channel] = currentCard
        console.log(currentChannels)
        currentlySelectingCards = false
        channelDeck.scene.setOnSelect(false)
        expandedContainer.scene.useCard(currentCardIndex)
        currentCard = null

        // DEDUCT MONEY
        money = money - channelObject.getChannelConfig().price
        moneyBar.setMoney(money)
      }
    })
  })

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

  //example to set avatar
  // player1.setAvatarName('พอล')
  // player1.setAvatarImg(AVATAR.man2)

  // Set Cards

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

  return scene
}

export default GameplayScene
