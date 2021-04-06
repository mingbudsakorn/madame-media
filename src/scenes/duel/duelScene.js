import { scenes } from '../../utils/scenes.js' 
import { PEOPLE_BAR_CONFIG } from '../../utils/gameConfig.js'

import loadChannelContainer from './components/channelContainer.js'
import loadPeopleBar from '../../components/peopleBar.js'
// // test
// import loadChannel from '../../components/Channel.js'
// import { CHANNEL } from '../../utils/channel.js'
import { CARD } from '../../utils/card.js'

const duelScene = new PIXI.Container()
duelScene.position.set(0,0)
let localGameState

let mockCardList = [
  {
    channel: 0,
    card: 1,
  },
  {
    channel: 1,
    card: 0,
  }
]
let mockCardList2 = [
  {
    channel: 1,
    card: 0,
  },
  {
    channel: 4,
    card: 1,
  }
]

const loadDuelScene = (app, setCurrentScene, 
  gameState = {
    turn: 1, 
    money: MONEY_CONFIG.INIT,
    myPeople: PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE,
    opponentPeople: PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE
  }) => {

  const resources = app.loader.resources
  localGameState = gameState

  const channelPadding = 25

  const duelBg  = new PIXI.Sprite(resources.duelBg.texture)
  duelScene.addChild(duelBg)

  const duelCompareBg = new PIXI.Sprite(resources.duelCompareBg.texture)
  duelCompareBg.position.set(66,296)
  duelScene.addChild(duelCompareBg)

  duelCompareBg.slide = () => {
    duelCompareBg.x = duelCompareBg.x + duelCompareBg.width + channelPadding
  }

  const opponentChannelContainer = loadChannelContainer({resources:resources, cardList:mockCardList, isButtom:0})
  opponentChannelContainer.position.set(66,50)
  duelScene.addChild(opponentChannelContainer)

  const myChannelContainer = loadChannelContainer({resources:resources, cardList:mockCardList2, isButtom:1})
  myChannelContainer.position.set(opponentChannelContainer.x,645)
  duelScene.addChild(myChannelContainer)

  const peopleBar = loadPeopleBar(resources, gameState.myPeople, gameState.opponentPeople)
  peopleBar.position.set(435,509)
  duelScene.addChild(peopleBar)

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const slide = async () => {
    for (var i = 0; i < 6; i++){
      await sleep(1000)
      duelCompareBg.slide();
    }
  }

  slide()
  
  app.stage.addChild(duelScene)
  return duelScene
}

export default loadDuelScene

// test
// const onClickBackButton = (setCurrentScene) => {
//   setCurrentScene(scenes.gameplay, duelScene, localGameState)
// }
