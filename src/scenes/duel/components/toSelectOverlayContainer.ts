import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { CHANNEL } from '../../../constants/channels'
import { Card, CardSlots, SummarySlots } from '../../../types'
import { CardType } from '../../../components/card'
import { OVERLAY } from '../../../constants/specialAction'
import { SpecialActionContainerType } from './specialActionContainer'

interface ToSelectOverlayType extends PIXI.Container {
  getCard: () => CardType
  toggle: () => void
  select: (select: boolean) => void
  setOverlay: (texturePath: string) => void
}

export interface ToSelectOverlayContainerType extends PIXI.Container {
  getSelectedCard: () => CardType
  setCardList: (cardList: CardType[]) => void
  toggle: () => void
  select: (card: ToSelectOverlayType) => void
  setCardOverlay: (isReal: boolean, x: number, y: number) => void
}

const loadToSelectOverlay = (resources: PIXI.IResourceDictionary, card: CardType) => {
  let localCard: CardType = card
  let isSelected = false

  const toSelectOverlay = new PIXI.Container() as ToSelectOverlayType

  const selectedOverlay = new PIXI.Sprite(resources[OVERLAY.toSlect].texture)
  toSelectOverlay.addChild(selectedOverlay)

  toSelectOverlay.interactive = true
  toSelectOverlay.buttonMode = true

  const toggle = () => {
    isSelected = !isSelected
    updateTexture()
  }

  const updateTexture = () => {
    selectedOverlay.texture = isSelected
      ? resources[OVERLAY.select].texture
      : resources[OVERLAY.toSlect].texture
  }

  toSelectOverlay.getCard = () => {
    return localCard
  }

  toSelectOverlay.toggle = toggle

  toSelectOverlay.select = (select: boolean) => {
    selectedOverlay.texture = select
      ? resources[OVERLAY.select].texture
      : resources[OVERLAY.toSlect].texture
  }

  toSelectOverlay.setOverlay = (texturePath: string) => {
    selectedOverlay.texture = resources[texturePath].texture
  }

  return toSelectOverlay
}

export const loadToSelectOverlayContainer = (
  resources: PIXI.IResourceDictionary,
  specialActionContainer: SpecialActionContainerType,
) => {
  const toSelectOverlayContainer = new PIXI.Container() as ToSelectOverlayContainerType

  let toSelectOverlayList: ToSelectOverlayType[] = []
  let selectedCard: CardType

  const setCardList = (cardList: CardType[]) => {
    cardList.forEach((card, i) => {
      if (card) {
        let cardOverlay = loadToSelectOverlay(resources, card)
        cardOverlay
          .on('mousedown', () => {
            select(cardOverlay)
          })
          .on('touchstart', () => {
            select(cardOverlay)
          })
        cardOverlay.position.set(card.x - 4, card.y)
        toSelectOverlayContainer.addChild(cardOverlay)
        toSelectOverlayList.push(cardOverlay)
      }
    })
  }

  const select = (card: ToSelectOverlayType) => {
    specialActionContainer.setSelect(1)
    toSelectOverlayList.forEach((cardOverlay, i) => {
      cardOverlay.select(false)
    })
    card.select(true)
    selectedCard = card.getCard()
  }

  const cardOverlay = new PIXI.Sprite(resources['art/real-card-overlay'].texture)
  toSelectOverlayContainer.addChild(cardOverlay)
  cardOverlay.visible = false

  const setCardOverlay = (isReal: boolean, x: number, y: number) => {
    if (isReal) {
      cardOverlay.texture = resources['art/real-card-overlay'].texture
    } else {
      cardOverlay.texture = resources['art/fake-card-overlay'].texture
    }
    toSelectOverlayList.forEach((cardOverlay, i) => {
      cardOverlay.select(false)
    })
    cardOverlay.position.set(x - 4, y)
    cardOverlay.visible = true
  }

  toSelectOverlayContainer.setCardOverlay = setCardOverlay

  toSelectOverlayContainer.select = select
  toSelectOverlayContainer.setCardList = setCardList
  toSelectOverlayContainer.getSelectedCard = () => {
    return selectedCard
  }

  return toSelectOverlayContainer
}

export default loadToSelectOverlay
