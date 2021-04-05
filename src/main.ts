import * as PIXI from 'pixi.js'
import { assets } from './assets/loader'

export const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight })
document.getElementById('root').appendChild(app.view)

Object.entries(assets).forEach(([name, path]: [string, string]) => {
  app.loader.add(name, path)
})
