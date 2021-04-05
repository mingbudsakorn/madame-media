import { TEXT_STYLE } from '../../../utils/style.js'

export const loadCardContainer = (resources, cardList, toggle) => {
  const cardContainer  = new PIXI.Container()
  cardContainer.position.set(134,960)

  const cardContainerBg = new PIXI.Sprite(resources.cardContainerBg.texture)
  // test
  cardContainerBg.interactive = true;
  cardContainerBg.on('mousedown', () => toggle())
              .on('touchstart', () => toggle())
        
  cardContainer.addChild(cardContainerBg)

  // TODO: Load cardList

  return cardContainer
}

export default loadCardContainer
