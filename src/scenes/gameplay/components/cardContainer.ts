import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import loadCard from './../../../components/Card'
import { CARD } from '../../../constants/card'

export const loadCardContainer = (
  resources: PIXI.IResourceDictionary,
  cardList: number[],
  toggle: () => void,
) => {
  const cardScale = {
    width: 170,
    heigth: 250
  }
  const cardContainer = new PIXI.Container()
  cardContainer.position.set(134, 960)

  const cardContainerBg = new PIXI.Sprite(resources['art/card-container-bg'].texture)

  // TODO: Load cardList
  let prevX = 0
  for (let i in cardList) {
    let cardConfig = CARD[cardList[i]].real
    let card = loadCard(resources,cardConfig)
    card.width = cardScale.width
    card.height = cardScale.heigth
    card.x = i=='0'? prevX : prevX + card.width/2
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
