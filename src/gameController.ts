import * as PIXI from 'pixi.js'
import { scenes } from './constants/scenes'
import loadGameplayScene from './scenes/gameplay'

const gameController = (app: PIXI.Application) => {
  let currentScene = scenes.gameplay
  const setCurrentScene = (scene: number) => {
    currentScene = scene
  }

  const resources = app.loader.resources

  const gameplayScene = loadGameplayScene(resources, setCurrentScene)

  app.stage.addChild(gameplayScene)
}

export default gameController
