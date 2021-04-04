import { TEXT_STYLE } from '../../../utils/style.js'
import { TIME_BAR_CONFIG } from '../../../utils/gameConfig.js'

export const loadTimeBar = (resources) => {
  const timeBar = new PIXI.Container()
  timeBar.position.set(27,441)

  const sandClock = new PIXI.Sprite(resources.sandClock.texture)
  timeBar.addChild(sandClock)

  const timeText = new PIXI.Text('เวลา', TEXT_STYLE.SUBHEADER_THAI)
  timeText.anchor.set(0,0.5)
  timeText.position.set(75,35)
  timeBar.addChild(timeText)

  const secText = new PIXI.Text('วินาที', TEXT_STYLE.SUBHEADER_THAI)
  secText.anchor.set(0,0.5)
  secText.position.set(967,35)
  timeBar.addChild(secText)

  const innerTimeBar = new PIXI.Sprite(resources.innerTimeBar.texture)
  innerTimeBar.anchor.set(0,0.5)
  innerTimeBar.position.set(183,35)
  timeBar.addChild(innerTimeBar)

  const outerTimeBar = new PIXI.Sprite(resources.outerTimeBar.texture)
  outerTimeBar.anchor.set(0,0.5)
  outerTimeBar.position.set(188,35)
  timeBar.addChild(outerTimeBar)

  const timeBarBoarder = new PIXI.Sprite(resources.timeBarBoarder.texture)
  timeBarBoarder.anchor.set(0,0.5)
  timeBarBoarder.position.set(183,35)
  timeBar.addChild(timeBarBoarder)

  const timeLeft = new PIXI.Text(120, TEXT_STYLE.SUBHEADER_THAI)
  timeLeft.anchor.set(0.5,0.5)
  timeLeft.position.set(920, 35)
  timeBar.addChild(timeLeft)

  // set instance
  timeBar.barWidth = outerTimeBar.width
  timeBar.outerTimeBar = outerTimeBar
  timeBar.timeLeft = timeLeft

  // set function
  timeBar.setTime = (timeLeft) => {
    setTime(timeBar, timeLeft)
  }

  // init value
  timeBar.outerTimeBar.width = TIME_BAR_CONFIG.TIMR_PER_TURN * (timeBar.barWidth / TIME_BAR_CONFIG.TIMR_PER_TURN)
  timeBar.timeLeft.text = TIME_BAR_CONFIG.TIMR_PER_TURN

  return timeBar
}

const setTime = (timeBar, timeLeft) => {
  timeBar.outerTimeBar.width = timeLeft * (timeBar.barWidth / TIME_BAR_CONFIG.TIMR_PER_TURN)
  timeBar.timeLeft.text = timeLeft
}

export default loadTimeBar
