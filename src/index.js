import sceneController from './scenes/sceneController.js'
import { loadAsset } from './loader.js'

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
})

export const setup = (app) => {
  // Load Game
  sceneController(app)
}

loadAsset(app, setup)

// The application will create a canvas element for you that you
// can then insert into the DOM
document.getElementById('root').appendChild(app.view)
