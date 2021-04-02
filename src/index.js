import sceneController from './scenes/index.js'

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
})

// Load Game
sceneController(app)

// The application will create a canvas element for you that you
// can then insert into the DOM
document.getElementById('root').appendChild(app.view)
