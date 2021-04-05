import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { TIME_BAR_CONFIG } from '../../../constants/gameConfig'

interface TimeBarType extends PIXI.Container {
  barWidth: number
  outerTimeBar: PIXI.Sprite
  timeLeft: PIXI.Text
  setTime: (timeLeft: number) => void
}

export const loadTimeBar = (resources: PIXI.IResourceDictionary) => {
  const timeBar = new PIXI.Container() as TimeBarType
  timeBar.position.set(27, 441)

  const sandClock = new PIXI.Sprite(resources['art/sand-clock'].texture)
  timeBar.addChild(sandClock)

  const timeText = new PIXI.Text('เวลา', TEXT_STYLE.SUBHEADER_THAI)
  timeText.anchor.set(0, 0.5)
  timeText.position.set(75, 35)
  timeBar.addChild(timeText)

  const secText = new PIXI.Text('วินาที', TEXT_STYLE.SUBHEADER_THAI)
  secText.anchor.set(0, 0.5)
  secText.position.set(967, 35)
  timeBar.addChild(secText)

  const innerTimeBar = new PIXI.Sprite(resources['art/inner-time-bar'].texture)
  innerTimeBar.anchor.set(0, 0.5)
  innerTimeBar.position.set(183, 35)
  timeBar.addChild(innerTimeBar)

  const outerTimeBar = new PIXI.Sprite(resources['art/outer-time-bar'].texture)
  outerTimeBar.anchor.set(0, 0.5)
  outerTimeBar.position.set(188, 35)
  timeBar.addChild(outerTimeBar)

  const timeBarBoarder = new PIXI.Sprite(resources['art/time-bar-boarder'].texture)
  timeBarBoarder.anchor.set(0, 0.5)
  timeBarBoarder.position.set(183, 35)
  timeBar.addChild(timeBarBoarder)

  const timeLeft = new PIXI.Text('120', TEXT_STYLE.SUBHEADER_THAI)
  timeLeft.anchor.set(0.5, 0.5)
  timeLeft.position.set(920, 35)
  timeBar.addChild(timeLeft)

  // set instance
  timeBar.barWidth = outerTimeBar.width
  timeBar.outerTimeBar = outerTimeBar
  timeBar.timeLeft = timeLeft

  // set function
  timeBar.setTime = (timeLeft: number) => {
    setTime(timeBar, timeLeft)
  }

  // init value
  timeBar.outerTimeBar.width =
    TIME_BAR_CONFIG.TIMR_PER_TURN * (timeBar.barWidth / TIME_BAR_CONFIG.TIMR_PER_TURN)
  timeBar.timeLeft.text = TIME_BAR_CONFIG.TIMR_PER_TURN.toString()

  return timeBar
}

const setTime = (timeBar: TimeBarType, timeLeft: number) => {
  timeBar.outerTimeBar.width = timeLeft * (timeBar.barWidth / TIME_BAR_CONFIG.TIMR_PER_TURN)
  timeBar.timeLeft.text = timeLeft.toString()
}

export default loadTimeBar
