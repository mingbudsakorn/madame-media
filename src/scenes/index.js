import loadGameplayScene from './gameplay/index.js'
import { scenes } from '../utils/scenes.js'

// Scene Controller
const sceneController = (app) => {
  let currentScene = scenes['gameplay']

  const setCurrentScene = (scene) => {
    currentScene = scene
  }

  if (currentScene === 0) {
    const gameplayScene = loadGameplayScene(app, setCurrentScene)
    // test to set visible
    // gameplayScene.visible = false;
  }

}

export default sceneController
