import * as PIXI from 'pixi.js'
import card from '../../components/card'
import loadChannelDeck from './components/channelDeck'
import loadTimeBar from './components/timeBar'
import loadPeopleBar from '../../components/peopleBar'
import loadAvatar from './components/avatar'
import loadMoneyBar from '../../components/moneyBar'
import loadCardModal from './components/cardModal'
import loadCardContainer from './components/cardContainer'

import { TEXT_STYLE } from '../../constants/style'
import { PEOPLE_BAR_CONFIG, CARD_CONFIG } from '../../constants/gameConfig'
import { AVATAR } from '../../constants/avatar'
import loadCard from '../../components/card'
import { CARD } from '../../constants/card'
import loadCardExpanded from './components/cardExpanded'

const gamePlayScene = new PIXI.Container()
gamePlayScene.position.set(0, 0)

interface TurnTextType extends PIXI.Text {
  setTurnText: (turn: number) => void
}

// SAMPLE RANDOM CARDS
const randomCards = (resources: PIXI.IResourceDictionary) => {
  const cards = []
  for (let i = 0; i < CARD_CONFIG.CARDS_PER_TURN; i++) {
    const cardNumber = Math.floor(Math.random() * 19) // 18 total types on cards
    const card = loadCard(resources, CARD[cardNumber].real)
    card.width = 170
    card.height = 250
    cards.push(card)
  }
  return cards
}

const loadGameplayScene = (resources: PIXI.IResourceDictionary) => {
  const bg = new PIXI.Sprite(resources['background/gameplay-bg'].texture)
  bg.position.set(0, 0)
  gamePlayScene.addChild(bg)

  const smallBlueCircle = new PIXI.Sprite(resources['art/small-blue-circle'].texture)
  smallBlueCircle.position.set(112, 44)
  gamePlayScene.addChild(smallBlueCircle)

  const smallPinkCircle = new PIXI.Sprite(resources['art/small-pink-circle'].texture)
  smallPinkCircle.position.set(1582, 44)
  gamePlayScene.addChild(smallPinkCircle)

  // ----------------------button---------------------- //
  const finishButton = new PIXI.Sprite(resources['art/finish-button'].texture)
  finishButton.position.set(1606, 738)
  finishButton.interactive = true
  gamePlayScene.addChild(finishButton)

  const buyChannelButton = new PIXI.Sprite(resources['art/buy-channel-button'].texture)
  buyChannelButton.position.set(1517, 628)
  buyChannelButton.interactive = true
  gamePlayScene.addChild(buyChannelButton)
  // -------------------------------------------------- //

  // ----------------------text---------------------- //
  const peopleText = new PIXI.Text('ประชาชน', TEXT_STYLE.SUBHEADER_THAI)
  peopleText.anchor.set(0.5, 0)
  peopleText.position.set(960, 30)
  gamePlayScene.addChild(peopleText)

  const turnText = new PIXI.Text('รอบที่ : 1', TEXT_STYLE.BODY_THAI) as TurnTextType
  turnText.position.set(47, 362)
  gamePlayScene.addChild(turnText)
  // ------------------------------------------------ //

  turnText.setTurnText = (turn: number) => {
    turnText.text = 'รอบที่ : ' + turn
  }

  const channelDeck = loadChannelDeck(resources, [])
  gamePlayScene.addChild(channelDeck)

  const timeBar = loadTimeBar(resources)
  gamePlayScene.addChild(timeBar)

  const peopleBar = loadPeopleBar(
    resources,
    PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE,
    PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE,
  )
  peopleBar.position.set(435, 74)
  gamePlayScene.addChild(peopleBar)

  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(1170, 440)
  gamePlayScene.addChild(moneyBar)

  const player1 = loadAvatar(resources, AVATAR.man1, 'โจนาทาน')
  player1.position.set(224.5, 82)
  gamePlayScene.addChild(player1)

  const player2 = loadAvatar(resources, AVATAR.woman4, 'มิเชล')
  player2.position.set(1694.5, 82)
  gamePlayScene.addChild(player2)

  // ----- Cards ----- //
  const cardModalWithOverlay = loadCardModal(resources, CARD[0])

  const cardContainer = loadCardContainer()
  cardContainer.setCards(randomCards(resources))

  const expandedContainer = loadCardExpanded(resources, () => {
    expandedContainer.visible = false
  })
  expandedContainer.setCards(randomCards(resources))
  expandedContainer.visible = false

  cardContainer.hitArea = new PIXI.Rectangle(0, 0, cardContainer.width, cardContainer.height)
  cardContainer.interactive = true
  cardContainer.on('mousedown', () => {
    expandedContainer.visible = true
  })

  gamePlayScene.addChild(cardContainer)
  gamePlayScene.addChild(expandedContainer)
  gamePlayScene.addChild(cardModalWithOverlay)

  return {
    scene: gamePlayScene,
    children: {
      bg,
      smallBlueCircle,
      smallPinkCircle,
      finishButton,
      buyChannelButton,
      peopleText,
      turnText,
      channelDeck,
      timeBar,
      peopleBar,
      moneyBar,
      player1,
      player2,
    },
  }
}

export default loadGameplayScene
