import loadChannelDeck from './components/channelDeck.js'
import loadTimeBar from './components/timeBar.js'

import { textStyle, COLOR } from '../../utils/style.js'

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
    .add('whiteRectangle', 'src/assets/art/white-rectangle.png')
    .add('channelDeckBg', 'src/assets/art/channel-deck.png')
    .add('polygonButtonLeft', 'src/assets/art/button-polygon-left.png')
    .add('polygonButtonRight', 'src/assets/art/button-polygon-right.png')
    .add('finishButton', 'src/assets/art/finish-button.png')
    .load((loader, resources) => {
      const bg = new PIXI.Sprite(resources.bg.texture)
      bg.position.set(0, 0, 0)
      app.stage.addChild(bg)

      const peopleText = new PIXI.Text('PEOPLE', textStyle.subHeaderBlack)
      peopleText.position.set(900, 21)
      app.stage.addChild(peopleText)

      const smallBlueCircle = new PIXI.Sprite(resources.smallBlueCircle.texture)
      smallBlueCircle.position.set(112, 44)
      app.stage.addChild(smallBlueCircle)

      const smallPinkCircle = new PIXI.Sprite(resources.smallPinkCircle.texture)
      smallPinkCircle.position.set(1582, 44)
      app.stage.addChild(smallPinkCircle)

      const sandClock = new PIXI.Sprite(resources.sandClock.texture)
      sandClock.position.set(27, 491)
      app.stage.addChild(sandClock)

      const coin = new PIXI.Sprite(resources.coin.texture)
      coin.position.set(1130, 490)
      app.stage.addChild(coin)

      const whiteRectangle = new PIXI.Sprite(resources.whiteRectangle.texture)
      whiteRectangle.position.set(1388, 492)
      app.stage.addChild(whiteRectangle)

      const finishButton = new PIXI.Sprite(resources.finishButton.texture)
      finishButton.position.set(1653, 827)
      app.stage.addChild(finishButton)

      const timeText = new PIXI.Text('TIME', textStyle.subHeaderBlack)
      timeText.position.set(97, 508)
      app.stage.addChild(timeText)

      const moneyText = new PIXI.Text('MONEY :', textStyle.subHeaderBlack)
      moneyText.position.set(1217, 508)
      app.stage.addChild(moneyText)

      const marbleText = new PIXI.Text('MARBLE', textStyle.subHeaderBlack)
      marbleText.position.set(1691, 508)
      app.stage.addChild(marbleText)

      const channelDeck = loadChannelDeck(app, resources)

      const timeBar = loadTimeBar(app, resources)
    })
}

export default loadGameplayScene
