import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { TIME_BAR_CONFIG } from '../../../constants/gameConfig'

interface TimeBarType extends PIXI.Container {
  setTime: (timeLeft: number) => void
}

export const loadTimeBar = (resources: PIXI.IResourceDictionary) => {
  const timeBar = new PIXI.Container() as TimeBarType
  timeBar.position.set(27, 441)

  const hourglass = new PIXI.Sprite(resources['art/hourglass'].texture)
  timeBar.addChild(hourglass)

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

  const timeLeftText = new PIXI.Text('120', TEXT_STYLE.SUBHEADER_THAI)
  timeLeftText.anchor.set(0.5, 0.5)
  timeLeftText.position.set(920, 35)
  timeBar.addChild(timeLeftText)

  const initialBarWidth = outerTimeBar.width

  // set function
  timeBar.setTime = (timeLeft: number) => {
    outerTimeBar.width = timeLeft * (initialBarWidth / TIME_BAR_CONFIG.TIME_PER_TURN)
    timeLeftText.text = timeLeft.toString()
  }

  // init value
  outerTimeBar.width =
    TIME_BAR_CONFIG.TIME_PER_TURN * (outerTimeBar.width / TIME_BAR_CONFIG.TIME_PER_TURN)
  timeLeftText.text = TIME_BAR_CONFIG.TIME_PER_TURN.toString()

  return timeBar
}

export default loadTimeBar
