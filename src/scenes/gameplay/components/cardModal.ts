import * as PIXI from 'pixi.js'
// import { TEXT_STYLE } from '../../../constants/style'
import loadCard from '../../../components/card'
import { CardSet } from '../../../types'

interface LoadCardModalType extends PIXI.Container {
  toggle: () => void
}

export const loadCardModal = (resources: PIXI.IResourceDictionary, card: CardSet) => {
  // have to set position outside
  let isReal = true
  let isShowing = false
  // for use card
  // let cardConfig = card.real

  const cardModalWithOverlay = new PIXI.Container() as LoadCardModalType
  cardModalWithOverlay.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  cardModalWithOverlay.addChild(overlay)

  const cardModal = new PIXI.Container()
  cardModal.position.set(468, 121)
  cardModalWithOverlay.addChild(cardModal)

  const cardModalBg = new PIXI.Sprite(resources['art/card-modal-bg'].texture)
  cardModal.addChild(cardModalBg)

  const realCard = loadCard(resources, card.real)
  realCard.position.set(38, 47)
  cardModal.addChild(realCard)

  const fakeCard = loadCard(resources, card.fake)
  fakeCard.position.set(realCard.x, realCard.y)
  cardModal.addChild(fakeCard)

  const toggleButton = new PIXI.Sprite(resources['art/toggle-button'].texture)
  toggleButton.position.set(576, 583)
  toggleButton.interactive = true
  toggleButton.buttonMode = true
  toggleButton.on('mousedown', () => toggleCard()).on('touchstart', () => toggleCard())

  cardModal.addChild(toggleButton)

  const useCardButton = new PIXI.Sprite(resources['art/use-card-button'].texture)
  useCardButton.position.set(toggleButton.x, 697)
  useCardButton.interactive = true
  useCardButton.buttonMode = true
  cardModal.addChild(useCardButton)

  const closeButton = new PIXI.Sprite(resources['art/close-button'].texture)
  closeButton.position.set(882, 35)
  closeButton.interactive = true
  closeButton.buttonMode = true
  closeButton
    .on('mousedown', () => cardModalWithOverlay.toggle())
    .on('touchstart', () => cardModalWithOverlay.toggle())
  cardModal.addChild(closeButton)

  const cardDescriptionBg = new PIXI.Sprite(resources['art/card-modal-des-bg'].texture)
  cardDescriptionBg.position.set(579, 162)
  cardModal.addChild(cardDescriptionBg)

  // const avatarName = new PIXI.Text(name, TEXT_STYLE.SUBHEADER_THAI)
  // avatarName.anchor.set(0.5,0)
  // avatarName.position.set(0,187)
  // avatar.addChild(avatarName)

  cardModalWithOverlay.visible = isShowing
  fakeCard.visible = false

  const toggleCard = () => {
    isReal = !isReal
    if (isReal) {
      realCard.visible = true
      fakeCard.visible = false
      // cardConfig = card.real
    } else {
      realCard.visible = false
      fakeCard.visible = true
      // cardConfig = card.fake
    }
  }

  // Methods
  cardModalWithOverlay.toggle = () => {
    isShowing = !isShowing
    if (isShowing) {
      cardModalWithOverlay.visible = true
    } else {
      cardModalWithOverlay.visible = false
    }
  }

  return cardModalWithOverlay
}

export default loadCardModal
