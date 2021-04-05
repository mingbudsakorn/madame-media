import * as PIXI from 'pixi.js'

export class App {
  private app: PIXI.Application

  constructor(parent: HTMLElement, width: number, height: number) {
    this.app = new PIXI.Application({ width, height })
    parent.replaceChild(this.app.view, parent.lastElementChild)
  }
}
