import loadGameplayScene from './gameplay/gamePlayScene.js'
import loadShopScene from './shop/shopScene.js'
import loadDuelScene from './duel/duelScene.js'
import { scenes } from '../utils/scenes.js'

// Scene Controller
const sceneController = (app) => {
  let currentScene = scenes.gameplay

  const setCurrentScene = (scene, pScene, gameState) => {
    currentScene = scene
    pScene.visible = false

    switch(currentScene) {
      case scenes.gameplay:
        const gameplayScene = loadGameplayScene(app, setCurrentScene, gameState)
        gameplayScene.visible = true
        break
      case scenes.shop:
        const shopScene = loadShopScene(app, setCurrentScene, gameState)
        shopScene.visible = true
        break
      case scenes.duel:
        const duelScene = loadDuelScene(app, setCurrentScene, gameState)
        duelScene.visible = true
        break
    }
  }

  if (currentScene === 0) {
    const gameplayScene = loadGameplayScene(app, setCurrentScene)
  }

}

export default sceneController
