import * as PIXI from 'pixi.js'
import loadFactCheck from './factCheckModal'
// import loadSpy from './spyModal'
// import loadExpose from './exposeModal'
import { OVERLAY } from '../../../constants/specialAction'

interface SummaryModalType extends PIXI.Container{
  nextTurnButton: PIXI.Sprite
}

export const loadSummaryModal = (resources: PIXI.IResourceDictionary) => {
  const summaryContainer = new PIXI.Container as SummaryModalType

  // const summaryTextBg = new PIXI.Sprite(resources['art/sub-special-action-bg'].texture)
  const nextTurnButton = new PIXI.Sprite(resources['art/next-turn-btn'].texture)
  nextTurnButton.position.set(1499, 946)
  nextTurnButton.interactive = true
  nextTurnButton.buttonMode = true

  // summaryContainer.addChild(summaryTextBg)
  summaryContainer.addChild(nextTurnButton)

  summaryContainer.nextTurnButton = nextTurnButton
  return summaryContainer
}

export default loadSummaryModal