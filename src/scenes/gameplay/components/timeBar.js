import { textStyle } from '../../../utils/style.js'

const loadTimeBar = (app, resources) => {
  const timeBar = new PIXI.Container()
  timeBar.position.set(210, 506)

  const innerTimeBar = new PIXI.Sprite(resources.innerTimeBar.texture)
  timeBar.addChild(innerTimeBar)

  const outerTimeBar = new PIXI.Sprite(resources.outerTimeBar.texture)
  outerTimeBar.position.set(5, 5)
  timeBar.addChild(outerTimeBar)

  const timeBarBoarder = new PIXI.Sprite(resources.timeBarBoarder.texture)
  timeBar.addChild(timeBarBoarder)
  
  const timeText = new PIXI.Text('120', textStyle.subHeaderBlack)
  timeText.position.set(707, 2)
  timeBar.addChild(timeText)

  // set instance
  timeBar.outerTimeBar = outerTimeBar
  timeBar.timeText =  timeText

  // ajust value
  timeBar.outerTimeBar.width = 420
  timeBar.timeText.text = '45'

  app.stage.addChild(timeBar)

  return timeBar
}

export default loadTimeBar
