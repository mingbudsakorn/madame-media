import loadChannelDeck from './components/channelDeck.js'
import loadTimeBar from './components/timeBar.js'
import loadPeopleBar from './components/peopleBar.js'
import loadMoneyBar from './components/moneyBar.js'
import loadAvatar from './components/avatar.js'

import {TEXT_STYLE, COLOR } from '../../utils/style.js'

const loadGameplayScene = (app, setCurrentScene, gameState) => {
  //gameState -> #turn, #people, money, availableChannels, ownCards, player1Name, player2Name, player1avatarImg, player2avatarImg
  app.loader
    .add('bg', 'src/assets/background/gameplay-bg.png')
    .add('smallBlueCircle', 'src/assets/art/small-blue-circle.png')
    .add('smallPinkCircle', 'src/assets/art/small-pink-circle.png')
    .add('sandClock', 'src/assets/art/sand-clock.png')
    .add('innerTimeBar', 'src/assets/art/inner-time-bar.png')
    .add('outerTimeBar', 'src/assets/art/outer-time-bar.png')
    .add('timeBarBoarder', 'src/assets/art/time-bar-boarder.png')
    .add('coin', 'src/assets/art/coin.png')
    .add('moneyBackground', 'src/assets/art/money-bg.png')
    .add('channelDeckBg', 'src/assets/art/channel-deck-bg.png')
    .add('polygonButtonLeft', 'src/assets/art/button-polygon-left.png')
    .add('polygonButtonRight', 'src/assets/art/button-polygon-right.png')
    .add('finishButton', 'src/assets/art/finish-button.png')
    .add('innerPeopleBar', 'src/assets/art/inner-people-bar.png')
    .add('player1PeopleBar', 'src/assets/art/player1-people-bar.png')
    .add('player2PeopleBar', 'src/assets/art/player2-people-bar.png')
    .add('peopleBarBoarder', 'src/assets/art/people-bar-boarder.png')
    .add('buyChannelButton', 'src/assets/art/buy-channel-button.png')
    .add('man1', 'src/assets/art/man1.png')
    .add('women4', 'src/assets/art/women4.png')
    .load((loader, resources) => {
      const bg = new PIXI.Sprite(resources.bg.texture)
      bg.position.set(0, 0, 0)
      app.stage.addChild(bg)

      const smallBlueCircle = new PIXI.Sprite(resources.smallBlueCircle.texture)
      smallBlueCircle.position.set(112, 44)
      app.stage.addChild(smallBlueCircle)

      const smallPinkCircle = new PIXI.Sprite(resources.smallPinkCircle.texture)
      smallPinkCircle.position.set(1582, 44)
      app.stage.addChild(smallPinkCircle)

      // ----------------------button---------------------- //
      const finishButton = new PIXI.Sprite(resources.finishButton.texture)
      finishButton.position.set(1606, 738)
      app.stage.addChild(finishButton)

      const buyChannelButton = new PIXI.Sprite(resources.buyChannelButton.texture)
      buyChannelButton.position.set(1517, 628)
      app.stage.addChild(buyChannelButton)
      // -------------------------------------------------- //


      // ----------------------text---------------------- //
      const peopleText = new PIXI.Text('ประชาชน', TEXT_STYLE.SUBHEADER_THAI)
      peopleText.anchor.set(0.5,0)
      peopleText.position.set(960, 30)
      app.stage.addChild(peopleText)

      const turnText = new PIXI.Text('รอบที่ : 1', TEXT_STYLE.BODY_THAI)
      turnText.position.set(47, 362)
      turnText.setTurnText = (turn) => {
        turnText.text = 'รอบที่ : ' + turn
      }
      // turnText.setTurnText(2)
      app.stage.addChild(turnText)
      // ------------------------------------------------ //

      const channelDeck = loadChannelDeck(app, resources)
      
      const timeBar = loadTimeBar(app, resources)
      
      //example to set timeLeft
      // timeBar.setTime(90)
      
      const peopleBar = loadPeopleBar(app, resources)
      peopleBar.position.set(435, 74)
      // example to set people
      // peopleBar.setPeople(300,60)

      // example to get people
      // let people = peopleBar.getPeople()
      // console.log(people.myPeople)
      // console.log(people.neutralPeople)
      // console.log(people.opponentPeople)

      const moneyBar = loadMoneyBar(app, resources)
      moneyBar.setMoney(8888)

      const player1 = loadAvatar(app, resources.man1.texture, 'โจนาทาน')
      player1.position.set(224.5,82)

      const player2 = loadAvatar(app, resources.women4.texture, 'มิเชล')
      player2.position.set(1694.5,82)
    })
}

export default loadGameplayScene
