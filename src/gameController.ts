import * as PIXI from 'pixi.js'
import { scenes } from './constants/scenes'
import loadGameplayScene from './scenes/gameplay'
import loadDuelScene from './scenes/duel'

const gameController = (app: PIXI.Application) => {
  let currentScene = scenes.gameplay
  const setCurrentScene = (scene: number) => {
    currentScene = scene
  }

  const resources = app.loader.resources

  // const gameplayScene = loadGameplayScene(resources, setCurrentScene)
  const duelScene = loadDuelScene(resources, setCurrentScene)

  app.stage.addChild(duelScene)
}

export default gameController
