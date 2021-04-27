import * as PIXI from 'pixi.js'
import card, { CardType } from '../../components/card'
import loadChannelDeck from './components/channelDeck'
import loadTimeBar from './components/timeBar'
import loadPeopleBar from '../../components/peopleBar'
import loadAvatar from './components/avatar'
import loadMoneyBar from '../../components/moneyBar'
import loadCardModal from './components/cardModal'
import loadCardContainer from './components/cardContainer'
import loadSpecialEventModal from './components/specialEventModal'
import loadShopModal from './components/shopModal'
import { TEXT_STYLE } from '../../constants/style'
import { PEOPLE_BAR_CONFIG, CARD_CONFIG } from '../../constants/gameConfig'
import { AVATAR } from '../../constants/avatar'
import loadCard from '../../components/card'
import { CARD } from '../../constants/card'
import loadCardExpanded from './components/cardExpanded'

interface GamePlaySceneType extends PIXI.Container {
  onCardSelect: (CardType) => void
}

const gamePlayScene = new PIXI.Container() as GamePlaySceneType
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
interface SpecialEventType extends PIXI.Container {
  setSpecialEvent: (title: string) => void
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
  finishButton.buttonMode = true
  gamePlayScene.addChild(finishButton)

  const buyChannelButton = new PIXI.Sprite(resources['art/buy-channel-button'].texture)
  buyChannelButton.position.set(1517, 628)
  buyChannelButton.interactive = true
  buyChannelButton.buttonMode = true
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
  // const cardModalWithOverlay = loadCardModal(resources, CARD[0])
  // gamePlayScene.addChild(cardModalWithOverlay)

  const cardContainer = loadCardContainer()
  cardContainer.setCards(randomCards(resources))

  const expandedContainer = loadCardExpanded(resources, () => {
    expandedContainer.scene.visible = false
  })
  expandedContainer.scene.setCards(randomCards(resources))
  expandedContainer.scene.visible = false

  cardContainer.hitArea = new PIXI.Rectangle(0, 0, cardContainer.width, cardContainer.height)
  cardContainer.interactive = true
  cardContainer.on('mousedown', () => {
    expandedContainer.scene.visible = true
  })
  gamePlayScene.addChild(cardContainer)

  const channelDeck = loadChannelDeck(resources)
  gamePlayScene.addChild(channelDeck.scene)

  gamePlayScene.addChild(expandedContainer.scene)

  const specialEvent = new PIXI.Container() as SpecialEventType
  gamePlayScene.addChild(specialEvent)

  const specialEventBg = new PIXI.Sprite(resources['art/special-event-bg'].texture)
  specialEventBg.anchor.set(0.5, 0)
  specialEventBg.position.set(bg.width / 2, 321)
  specialEvent.addChild(specialEventBg)

  const specialEventText = new PIXI.Text('พายุเข้า', TEXT_STYLE.HEADER_THAI)
  specialEventText.anchor.set(0.5)
  specialEventText.position.set(specialEventBg.x, specialEventBg.y + specialEventBg.height / 2)
  specialEvent.addChild(specialEventText)

  const specialEventModal = loadSpecialEventModal(resources)
  gamePlayScene.addChild(specialEventModal)

  specialEvent.interactive = true
  specialEvent.buttonMode = true
  specialEvent
    .on('mousedown', () => specialEventModal.toggle())
    .on('touchstart', () => specialEventModal.toggle())
  specialEvent.visible = false

  specialEvent.setSpecialEvent = (title: string) => {
    specialEventText.text = title
  }

  //buy channel
  const shopModal = loadShopModal(resources)
  gamePlayScene.addChild(shopModal)

  buyChannelButton
    .on('mousedown', () => shopModal.toggle())
    .on('touchstart', () => shopModal.toggle())

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
      cardContainer,
      expandedContainer,
      specialEventModal,
      specialEvent,
      shopModal,
    },
  }
}

export default loadGameplayScene
