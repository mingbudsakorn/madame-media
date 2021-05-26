import * as PIXI from 'pixi.js'
import { TEXT_STYLE, COLOR } from '../constants/style'

interface ModalType extends PIXI.Container {
  toggle: () => void
  setText: (title: string, description: string) => void
  setShowAcceptButton: (showButton: boolean) => void
  setClosable: (isClosable: boolean) => void
  setVisible: (isVisible: boolean) => void
}

export const loadModal = (resources: PIXI.IResourceDictionary) => {
  let isShowing = false

  const modal = new PIXI.Container() as ModalType
  modal.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  modal.addChild(overlay)

  const modalBg = new PIXI.Sprite(resources['art/special-event-modal-bg'].texture)
  modalBg.anchor.set(0.5, 0)
  modalBg.position.set(overlay.width / 2, overlay.height / 2 - modalBg.height / 2)
  modal.addChild(modalBg)

  const textStyle = new PIXI.TextStyle({
    fontFamily: 'Chonburi',
    fontSize: 36,
    fill: COLOR.CHARCOAL,
    align: 'center',
    leading: 10,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: modalBg.width - 120,
  })

  const descriptionText = new PIXI.Text('คำอธิบาย', textStyle)
  if (descriptionText.height > 200) {
    modalBg.height = modalBg.height + descriptionText.height - 200
    modalBg.position.set(overlay.width / 2, overlay.height / 2 - modalBg.height / 2)
  }
  descriptionText.anchor.set(0.5)
  descriptionText.position.set(modalBg.x, modalBg.y + modalBg.height / 2 - 5)
  modal.addChild(descriptionText)

  const titleText = new PIXI.Text('ข่าวด่วน!!', TEXT_STYLE.HEADER_THAI_RED_PURPLE)
  titleText.anchor.set(0.5, 0)
  titleText.position.set(modalBg.x, modalBg.y + 25)
  modal.addChild(titleText)

  const line = new PIXI.Sprite(resources['art/special-event-modal-line'].texture)
  line.anchor.set(0.5, 0)
  line.position.set(modalBg.x, modalBg.y + 97)
  modal.addChild(line)

  const acceptButton = new PIXI.Sprite(resources['art/accept-btn'].texture)
  acceptButton.anchor.set(0.5, 0)
  acceptButton.position.set(modalBg.x, modalBg.y + modalBg.height - acceptButton.height - 30)
  acceptButton.interactive = true
  acceptButton.buttonMode = true
  acceptButton.on('mousedown', () => modal.toggle()).on('touchstart', () => modal.toggle())
  modal.addChild(acceptButton)

  modal.visible = isShowing

  // Methods
  modal.toggle = () => {
    if (modal.visible) {
      modal.visible = false
    } else {
      modal.visible = true
    }
  }

  modal.setText = (title: string, description: string) => {
    titleText.text = title
    descriptionText.text = description
    if (descriptionText.height > 200) {
      modalBg.height = modalBg.height + descriptionText.height - 200
      modalBg.position.set(overlay.width / 2, overlay.height / 2 - modalBg.height / 2)
      titleText.position.set(modalBg.x, modalBg.y + 25)
      descriptionText.position.set(modalBg.x, modalBg.y + modalBg.height / 2 - 5)
      line.position.set(modalBg.x, modalBg.y + 97)
      acceptButton.position.set(modalBg.x, modalBg.y + modalBg.height - acceptButton.height - 25)
    }
  }

  acceptButton.visible = false

  modal.setShowAcceptButton = (showButton: boolean) => {
    acceptButton.visible = showButton
  }

  modal.setClosable = (isClosable: boolean) => {
    acceptButton.visible = isClosable
    overlay.interactive = isClosable
  }

  modal.setVisible = (isVisible: boolean) => {
    modal.visible = isVisible
  }

  overlay.interactive = true

  return modal
}

export default loadModal
