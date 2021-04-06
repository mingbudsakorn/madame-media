import * as PIXI from 'pixi.js'
import { assets } from './assets/loader'
import gameController from './gameController'

export const app = new PIXI.Application({ width: 1920, height: 1080 })
document.getElementById('root').appendChild(app.view)

Object.entries(assets).forEach(([name, path]: [string, string]) => {
  app.loader.add(name, path)
})

app.loader.load(() => {
  gameController(app)
})
