import { TEXT_STYLE } from '../../../utils/style.js'
import loadCard from '../../../components/Card.js'

export const loadCardModal = (resources, card) => {
  // have to set position outside
  let isReal = true
  let isShowing = false
  // for use card
  let cardConfig = card.real

  const cardModalWithOverlay = new PIXI.Container()
  cardModalWithOverlay.position.set(0,0)

  const overlay = new PIXI.Sprite(resources.overlay.texture)
  cardModalWithOverlay.addChild(overlay)
  
  const cardModal = new PIXI.Container()
  cardModal.position.set(468,121)
  cardModalWithOverlay.addChild(cardModal)

  const cardModalBg = new PIXI.Sprite(resources.cardModalBg.texture)
  cardModal.addChild(cardModalBg)

  const realCard = loadCard(resources, card.real, true)
  realCard.position.set(38,47)
  cardModal.addChild(realCard)

  const fakeCard = loadCard(resources, card.fake, false)
  fakeCard.position.set(realCard.x, realCard.y)
  cardModal.addChild(fakeCard)

  const toggleButton = new PIXI.Sprite(resources.toggleButton.texture)
  toggleButton.position.set(576,583)
  toggleButton.interactive = true;
  toggleButton.on('mousedown', () => toggleCard())
              .on('touchstart', () => toggleCard())

  cardModal.addChild(toggleButton)

  const useCardButton = new PIXI.Sprite(resources.useCardButton.texture)
  useCardButton.position.set(toggleButton.x, 697)
  cardModal.addChild(useCardButton)

  const closeButton = new PIXI.Sprite(resources.closeButton.texture)
  closeButton.position.set(882,35)
  closeButton.interactive = true;
  closeButton.on('mousedown', () => cardModalWithOverlay.toggle())
              .on('touchstart', () => cardModalWithOverlay.toggle())
  cardModal.addChild(closeButton)

  const cardDescriptionBg = new PIXI.Sprite(resources.cardDescriptionBg.texture)
  cardDescriptionBg.position.set(579,162)
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
      cardConfig = card.real
    } else {
      realCard.visible = false
      fakeCard.visible = true
      cardConfig = card.fake
    }
  }

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
