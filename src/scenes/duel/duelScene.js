import { scenes } from '../../utils/scenes.js' 

// // test
// import loadChannel from '../../components/Channel.js'
// import { CHANNEL } from '../../utils/channel.js'

const duelScene = new PIXI.Container()
duelScene.position.set(0,0)
let localGameState

const loadDuelScene = (app, setCurrentScene, gameState) => {
  const resources = app.loader.resources
  localGameState = gameState

  const duelBg  = new PIXI.Sprite(resources.duelBg.texture)
  duelScene.addChild(duelBg)

  app.stage.addChild(duelScene)

  // // test channel
  // const channel = loadChannel(resources, CHANNEL[4], 1)
  // channel.position.set(25,200)
  // duelScene.addChild(channel)
  
  // const channel2 = loadChannel(resources, CHANNEL[5], 1)
  // channel2.position.set(channel.width + 50,channel.y)
  // duelScene.addChild(channel2)


  return duelScene
}

export default loadDuelScene

// test
// const onClickBackButton = (setCurrentScene) => {
//   setCurrentScene(scenes.gameplay, duelScene, localGameState)
// }
