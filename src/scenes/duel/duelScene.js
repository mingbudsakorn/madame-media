import { scenes } from '../../utils/scenes.js' 

const duelScene = new PIXI.Container()
duelScene.position.set(0,0)
let localGameState

const loadDuelScene = (app, setCurrentScene, gameState) => {
  const resources = app.loader.resources
  localGameState = gameState

  const duelBg  = new PIXI.Sprite(resources.duelBg.texture)
  duelScene.addChild(duelBg)

  app.stage.addChild(duelScene)

  return duelScene
}

export default loadDuelScene

// test
// const onClickBackButton = (setCurrentScene) => {
//   setCurrentScene(scenes.gameplay, duelScene, localGameState)
// }
