import { scenes } from '../../utils/scenes.js' 

const shopScene = new PIXI.Container()
shopScene.position.set(0,0)

let localGameState

const loadShopScene = (app, setCurrentScene, gameState) => {
  localGameState = gameState

  const resources = app.loader.resources

  const shopBg  = new PIXI.Sprite(resources.shopBg.texture)
  shopScene.addChild(shopBg)

  const backButton = new PIXI.Sprite(resources.backButton.texture)
  backButton.interactive = true
  backButton.on('mousedown', () => onClickBackButton(setCurrentScene))
            .on('touchstart', () => onClickBackButton(setCurrentScene))
  
  backButton.position.set(58,58)
  shopScene.addChild(backButton)

  app.stage.addChild(shopScene)

  return shopScene
}

const onClickBackButton = (setCurrentScene) => {
  setCurrentScene(scenes.gameplay, shopScene, localGameState)
}

export default loadShopScene