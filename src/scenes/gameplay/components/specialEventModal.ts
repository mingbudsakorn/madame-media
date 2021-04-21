import * as PIXI from 'pixi.js'
import { TEXT_STYLE, COLOR } from '../../../constants/style'

interface SpecialEventModalType extends PIXI.Container {
  toggle: () => void
  setSpecialEvent: (description: string) => void
}

export const loadSpecialEventModal = (resources: PIXI.IResourceDictionary) => {
  let isShowing = false

  const specialEventModal = new PIXI.Container() as SpecialEventModalType
  specialEventModal.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  specialEventModal.addChild(overlay)

  const specialEventModalBg = new PIXI.Sprite(resources['art/special-event-modal-bg'].texture)
  specialEventModalBg.anchor.set(0.5, 0)
  specialEventModalBg.position.set(overlay.width/2, overlay.height/2 - specialEventModalBg.height/2)
  specialEventModal.addChild(specialEventModalBg)

  const textStyle =  new PIXI.TextStyle({
    fontFamily: 'Chonburi',
    fontSize: 36,
    fill: COLOR.CHARCOAL,
    align: 'center',
    leading: 10,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: specialEventModalBg.width - 120
  })

  const descriptionText = new PIXI.Text('สำหรับตานี้\nการ์ดปลอมทั้งหมดจะใช้การไม่ได้', textStyle)
  if (descriptionText.height > 200) {
    specialEventModalBg.height = specialEventModalBg.height + descriptionText.height - 200
    specialEventModalBg.position.set(overlay.width/2, overlay.height/2 - specialEventModalBg.height/2)
  }
  descriptionText.anchor.set(0.5)
  descriptionText.position.set(specialEventModalBg.x, specialEventModalBg.y + specialEventModalBg.height/2 - 5)
  specialEventModal.addChild(descriptionText)

  const specialEventText = new PIXI.Text('ข่าวด่วน!!', TEXT_STYLE.HEADER_THAI_RED_PURPLE)
  specialEventText.anchor.set(0.5,0)
  specialEventText.position.set(specialEventModalBg.x, specialEventModalBg.y + 25)
  specialEventModal.addChild(specialEventText)

  const line = new PIXI.Sprite(resources['art/special-event-modal-line'].texture)
  line.anchor.set(0.5, 0)
  line.position.set(specialEventModalBg.x, specialEventModalBg.y + 97)
  specialEventModal.addChild(line)

  const acceptButton = new PIXI.Sprite(resources['art/accept-btn'].texture)
  acceptButton.anchor.set(0.5, 0)
  acceptButton.position.set(specialEventModalBg.x , specialEventModalBg.y + specialEventModalBg.height - acceptButton.height - 30)
  acceptButton.interactive = true
  acceptButton.buttonMode = true
  acceptButton.on('mousedown', () => specialEventModal.toggle()).on('touchstart', () => specialEventModal.toggle())
  specialEventModal.addChild(acceptButton)

  specialEventModal.visible = isShowing

  // Methods
  specialEventModal.toggle = () => {
    isShowing = !isShowing
    if (isShowing) {
      specialEventModal.visible = true
    } else {
      specialEventModal.visible = false
    }
  }

  specialEventModal.setSpecialEvent = (description: string) => {
    descriptionText.text = description
    if (descriptionText.height > 200) {
      specialEventModalBg.height = specialEventModalBg.height + descriptionText.height - 200
      specialEventModalBg.position.set(overlay.width/2, overlay.height/2 - specialEventModalBg.height/2)
      specialEventText.position.set(specialEventModalBg.x, specialEventModalBg.y + 25)
      descriptionText.position.set(specialEventModalBg.x, specialEventModalBg.y + specialEventModalBg.height/2 - 5)
      line.position.set(specialEventModalBg.x, specialEventModalBg.y + 97)
      acceptButton.position.set(specialEventModalBg.x , specialEventModalBg.y + specialEventModalBg.height - acceptButton.height - 25)
    }
  }

  return specialEventModal
}

export default loadSpecialEventModal
