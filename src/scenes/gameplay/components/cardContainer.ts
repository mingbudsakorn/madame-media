import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'

export const loadCardContainer = (
  resources: PIXI.IResourceDictionary,
  cardList,
  toggle: () => void,
) => {
  const cardContainer = new PIXI.Container()
  cardContainer.position.set(134, 960)

  const cardContainerBg = new PIXI.Sprite(resources['art/card-container-bg'].texture)
  // test
  cardContainerBg.interactive = true
  cardContainerBg.on('mousedown', () => toggle()).on('touchstart', () => toggle())

  cardContainer.addChild(cardContainerBg)

  // TODO: Load cardList

  return cardContainer
}

export default loadCardContainer
