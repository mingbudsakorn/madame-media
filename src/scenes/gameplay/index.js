import loadChannelDeck from './components/channelDeck.js'
import loadTimeBar from './components/timeBar.js'
import loadPeopleBar from './components/peopleBar.js'
import loadMoneyBar from './components/moneyBar.js'

import {TEXT_STYLE, COLOR } from '../../utils/style.js'

const loadGameplayScene = (app, setCurrentScene) => {
  app.loader
    .add('bg', 'src/assets/background/gameplay-1.png')
    .add('smallBlueCircle', 'src/assets/art/small-blue-circle.png')
    .add('smallPinkCircle', 'src/assets/art/small-pink-circle.png')
    .add('sandClock', 'src/assets/art/sand-clock.png')
    .add('innerTimeBar', 'src/assets/art/inner-time-bar.png')
    .add('outerTimeBar', 'src/assets/art/outer-time-bar.png')
    .add('timeBarBoarder', 'src/assets/art/time-bar-boarder.png')
    .add('coin', 'src/assets/art/coin.png')
    .add('moneyBackground', 'src/assets/art/white-rectangle.png')
    .add('channelDeckBg', 'src/assets/art/channel-deck-bg.png')
    .add('polygonButtonLeft', 'src/assets/art/button-polygon-left.png')
    .add('polygonButtonRight', 'src/assets/art/button-polygon-right.png')
    .add('finishButton', 'src/assets/art/finish-button.png')
    .add('innerPeopleBar', 'src/assets/art/inner-people-bar.png')
    .add('player1PeopleBar', 'src/assets/art/player1-people-bar.png')
    .add('player2PeopleBar', 'src/assets/art/player2-people-bar.png')
    .add('peopleBarBoarder', 'src/assets/art/people-bar-boarder.png')
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

      const finishButton = new PIXI.Sprite(resources.finishButton.texture)
      finishButton.position.set(1632, 788)
      app.stage.addChild(finishButton)

      // ----------------------text---------------------- //
      const peopleText = new PIXI.Text('PEOPLE', TEXT_STYLE.SUBHEADER_BLACK)
      peopleText.position.set(900, 21)
      app.stage.addChild(peopleText)

      const turnText = new PIXI.Text('TURN : 1', TEXT_STYLE.BODY_BLACK)
      turnText.position.set(47, 412)
      turnText.setTurnText = (turn) => {
        turnText.text = 'TURN : ' + turn
      }
      // turnText.setTurnText(2)
      app.stage.addChild(turnText)
      // ------------------------------------------------ //

      const channelDeck = loadChannelDeck(app, resources)
      
      const timeBar = loadTimeBar(app, resources)
      
      //example to set timeLeft
      // timeBar.setTime(100)
      
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
    })
}

export default loadGameplayScene
