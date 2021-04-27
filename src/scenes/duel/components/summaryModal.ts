import * as PIXI from 'pixi.js'
import loadFactCheck from './factCheckModal'
import loadSpy from './spyModal'
import loadExpose from './exposeModal'

interface summaryType extends PIXI.Container{
  nextTurnButton: PIXI.Sprite
}

export const loadSummary = (resources: PIXI.IResourceDictionary) => {
  const summaryContainer = new PIXI.Container as summaryType

  const summaryTextBg = new PIXI.Sprite(resources['art/sub-special-action-bg'].texture)
  const nextTurnButton = new PIXI.Sprite(resources['art/next-turn-btn'].texture)

  summaryContainer.addChild(summaryTextBg)
  summaryContainer.addChild(nextTurnButton)

  summaryContainer.nextTurnButton = nextTurnButton
  return summaryContainer
}

export default loadSummary