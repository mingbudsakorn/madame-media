import { TEXT_STYLE } from '../../../utils/style.js'
import { CARD } from '../../../utils/card.js'

import loadCard from './../../../components/Card.js'

// cardList = [0,1]
export const loadCardContainer = (resources, cardList, toggle) => {
  const cardScale = {
    width: 170,
    heigth: 250
  }
  const cardContainer  = new PIXI.Container()
  cardContainer.position.set(134,960)

  const cardContainerBg = new PIXI.Sprite(resources.cardContainerBg.texture)

  // TODO: Load cardList
  let prevX = 0
  for (let i in cardList) {
    let cardConfig = CARD[cardList[i]].real
    let card = loadCard(resources,cardConfig,true)
    card.width = cardScale.width
    card.height = cardScale.heigth
    card.x = i==0? prevX : prevX + card.width/2
    card.interactive = true;
    // todo parse cardConfig to moodal
    card.on('mousedown', () => toggle())
        .on('touchstart', () => toggle())
    cardContainer.addChild(card)
    prevX = card.x
  }

  return cardContainer
}

export default loadCardContainer
