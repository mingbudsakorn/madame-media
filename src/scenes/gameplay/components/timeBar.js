import { TEXT_STYLE } from '../../../utils/style.js'
import { TIME_BAR_CONFIG } from '../../../utils/gameConfig.js'

export const loadTimeBar = (app, resources) => {
  const timeBar = new PIXI.Container()
  timeBar.position.set(210, 506)

  const innerTimeBar = new PIXI.Sprite(resources.innerTimeBar.texture)
  timeBar.addChild(innerTimeBar)

  const outerTimeBar = new PIXI.Sprite(resources.outerTimeBar.texture)
  outerTimeBar.position.set(5, 5)
  timeBar.addChild(outerTimeBar)

  const timeBarBoarder = new PIXI.Sprite(resources.timeBarBoarder.texture)
  timeBar.addChild(timeBarBoarder)

  const timeText = new PIXI.Text(120, TEXT_STYLE.SUBHEADER_BLACK)
  timeText.position.set(707, 2)
  timeBar.addChild(timeText)

  // set instance
  timeBar.barWidth = outerTimeBar.width
  timeBar.outerTimeBar = outerTimeBar
  timeBar.leftTime = timeText

  // set function
  timeBar.setTime = (leftTime) => {
    setTime(timeBar, leftTime)
  }

  // init value
  timeBar.outerTimeBar.width = TIME_BAR_CONFIG.TIMR_PER_TURN * (timeBar.barWidth / TIME_BAR_CONFIG.TIMR_PER_TURN)
  timeBar.leftTime.text = TIME_BAR_CONFIG.TIMR_PER_TURN

  app.stage.addChild(timeBar)

  return timeBar
}

export const setTime = (timeBar, timeLeft) => {
  timeBar.outerTimeBar.width = timeLeft * (timeBar.barWidth / TIME_BAR_CONFIG.TIMR_PER_TURN)
  timeBar.leftTime.text = timeLeft
}

export default loadTimeBar
