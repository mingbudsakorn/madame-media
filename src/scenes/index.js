import loadGameplayScene from './gameplay/index.js'
import { scenes } from '../utils/scenes.js'

// Scene Controller
const sceneController = (app) => {
  let currentScene = scenes['gameplay']

  const setCurrentScene = (scene) => {
    currentScene = scene
  }

  if (currentScene === 0) {
    loadGameplayScene(app, setCurrentScene)
  }
}

export default sceneController
