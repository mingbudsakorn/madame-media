import loadChannelDeck from './components/channelDeck.js'
import loadTimeBar from './components/timeBar.js'
import loadPeopleBar from './components/peopleBar.js'
import loadMoneyBar from './components/moneyBar.js'
import loadAvatar from './components/avatar.js'

import { TEXT_STYLE, COLOR } from '../../utils/style.js'

const loadGameplayScene = (app, setCurrentScene, gameState) => {
  //gameState -> #turn, #people, money, availableChannels, ownCards, player1Name, player2Name, player1avatarImg, player2avatarImg
  const gamePlayScene = new PIXI.Container()
  gamePlayScene.position.set(0,0)

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
  gamePlayScene.addChild(finishButton)

  const buyChannelButton = new PIXI.Sprite(resources.buyChannelButton.texture)
  buyChannelButton.position.set(1517, 628)
  gamePlayScene.addChild(buyChannelButton)
  // -------------------------------------------------- //

  // ----------------------text---------------------- //
  const peopleText = new PIXI.Text('ประชาชน', TEXT_STYLE.SUBHEADER_THAI)
  peopleText.anchor.set(0.5, 0)
  peopleText.position.set(960, 30)
  gamePlayScene.addChild(peopleText)

  const turnText = new PIXI.Text('รอบที่ : 1', TEXT_STYLE.BODY_THAI)
  turnText.position.set(47, 362)
  turnText.setTurnText = (turn) => {
    turnText.text = 'รอบที่ : ' + turn
  }
  // turnText.setTurnText(2)
  gamePlayScene.addChild(turnText)
  // ------------------------------------------------ //

  const channelDeck = loadChannelDeck(app, resources)
  gamePlayScene.addChild(channelDeck)

  const timeBar = loadTimeBar(app, resources)
  gamePlayScene.addChild(timeBar)

  //example to set timeLeft
  // timeBar.setTime(90)

  const peopleBar = loadPeopleBar(app, resources)
  peopleBar.position.set(435, 74)
  gamePlayScene.addChild(peopleBar)
  // example to set people
  // peopleBar.setPeople(300,60)

  // example to get people
  // let people = peopleBar.getPeople()
  // console.log(people.myPeople)
  // console.log(people.neutralPeople)
  // console.log(people.opponentPeople)

  const moneyBar = loadMoneyBar(app, resources)
  moneyBar.setMoney(8888)
  gamePlayScene.addChild(moneyBar)

  const player1 = loadAvatar(app, resources.man1.texture, 'โจนาทาน')
  player1.position.set(224.5, 82)
  gamePlayScene.addChild(player1)

  const player2 = loadAvatar(app, resources.women4.texture, 'มิเชล')
  player2.position.set(1694.5, 82)
  gamePlayScene.addChild(player2)

  app.stage.addChild(gamePlayScene)

  return gamePlayScene
  }

export default loadGameplayScene
