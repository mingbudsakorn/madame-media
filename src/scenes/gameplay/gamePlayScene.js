import loadChannelDeck from './components/channelDeck.js'
import loadTimeBar from './components/timeBar.js'
import loadPeopleBar from '../../components/peopleBar.js'
import loadMoneyBar from '../../components/moneyBar.js'
import loadAvatar from './components/avatar.js'
import loadCardModal from './components/cardModal.js'
import loadCardContainer from './components/cardContainer.js'

import { MONEY_CONFIG, PEOPLE_BAR_CONFIG, TIME_BAR_CONFIG } from '../../utils/gameConfig.js'
import { scenes } from '../../utils/scenes.js' 
import { CHANNEL } from '../../utils/channel.js'
import { CARD } from '../../utils/card.js'
import { AVATER } from '../../utils/avatar.js'

import { TEXT_STYLE, COLOR } from '../../utils/style.js'
import { sleep } from '../../utils/function.js'

const gamePlayScene = new PIXI.Container()
gamePlayScene.position.set(0, 0)

let localGameState;

const loadGameplayScene = (app, setCurrentScene, 
  gameState = {
    turn: 1, 
    money: MONEY_CONFIG.INIT,
    myPeople: PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE,
    opponentPeople: PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE,
    ownCardList: [0,1],
    myName: 'โจนาทาน',
    opponentName: 'มิเชล',
    myAvatar: AVATER.man1,
    opponentAvatar: AVATER.women4,
    availableChannelList: [2,3,6],
  }
) => {
  localGameState = gameState

  const resources = app.loader.resources

  const bg = new PIXI.Sprite(resources.bg.texture)
  bg.position.set(0, 0, 0)
  gamePlayScene.addChild(bg)

  const smallBlueCircle = new PIXI.Sprite(resources.smallBlueCircle.texture)
  smallBlueCircle.position.set(112, 44)
  gamePlayScene.addChild(smallBlueCircle)

  const smallPinkCircle = new PIXI.Sprite(resources.smallPinkCircle.texture)
  smallPinkCircle.position.set(1582, 44)
  gamePlayScene.addChild(smallPinkCircle)

  // ----------------------button---------------------- //
  const finishButton = new PIXI.Sprite(resources.finishButton.texture)
  finishButton.position.set(1606, 738)
  finishButton.interactive = true;
  finishButton.on('mousedown', () => onClickFinishButton(setCurrentScene))
              .on('touchstart', () => onClickFinishButton(setCurrentScene))
  gamePlayScene.addChild(finishButton)


  const buyChannelButton = new PIXI.Sprite(resources.buyChannelButton.texture)
  buyChannelButton.position.set(1517, 628)
  buyChannelButton.interactive = true;
  buyChannelButton.on('mousedown', () => onClickBuyChannel(setCurrentScene))
                  .on('touchstart', () => onClickBuyChannel(setCurrentScene))
  gamePlayScene.addChild(buyChannelButton)
  // -------------------------------------------------- //

  // ----------------------text---------------------- //
  const peopleText = new PIXI.Text('ประชาชน', TEXT_STYLE.SUBHEADER_THAI)
  peopleText.anchor.set(0.5, 0)
  peopleText.position.set(960, 30)
  gamePlayScene.addChild(peopleText)

  const turnText = new PIXI.Text('รอบที่ : ' + gameState.turn, TEXT_STYLE.BODY_THAI)
  turnText.position.set(47, 362)
  gamePlayScene.addChild(turnText)
  // ------------------------------------------------ //

  const channelDeck = loadChannelDeck(resources)

  gamePlayScene.addChild(channelDeck)

  const timeBar = loadTimeBar(resources)
  gamePlayScene.addChild(timeBar)

  const timing = async () => {
    let timeLeft = TIME_BAR_CONFIG.TIME_PER_TURN
    for (let i=0; i<TIME_BAR_CONFIG.TIME_PER_TURN; i++) {
      timeLeft -= 1
      await sleep(1000)
      timeBar.setTime(timeLeft)
    }
  }

  const peopleBar = loadPeopleBar(resources, gameState.myPeople, gameState.opponentPeople)
  peopleBar.position.set(435, 74)
  gamePlayScene.addChild(peopleBar)

  // example to get people
  // let people = peopleBar.getPeople()
  // console.log(people.myPeople)
  // console.log(people.neutralPeople)
  // console.log(people.opponentPeople)

  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(1170,440)
  moneyBar.setMoney(gameState.money)
  gamePlayScene.addChild(moneyBar)

  const player1 = loadAvatar(resources[gameState.myAvatar].texture, gameState.myName)
  player1.position.set(224.5, 82)
  gamePlayScene.addChild(player1)

  const player2 = loadAvatar(resources[gameState.opponentAvatar].texture, gameState.opponentName)
  player2.position.set(1694.5, 82)
  gamePlayScene.addChild(player2)

  const cardModalWithOverlay = loadCardModal(resources, CARD[0])
  
  const cardContainer = loadCardContainer(resources, [CARD[0],CARD[1]], cardModalWithOverlay.toggle)
  
  gamePlayScene.addChild(cardContainer)
  gamePlayScene.addChild(cardModalWithOverlay)

  app.stage.addChild(gamePlayScene)

  timing()

  return gamePlayScene
}

const onClickBuyChannel = (setCurrentScene) => {
  console.log('click-buy-button')
  setCurrentScene(scenes.shop, gamePlayScene, localGameState)
}

const onClickFinishButton = (setCurrentScene) => {
  console.log('click-finish-button')
  setCurrentScene(scenes.duel, gamePlayScene, localGameState)
}

export default loadGameplayScene
