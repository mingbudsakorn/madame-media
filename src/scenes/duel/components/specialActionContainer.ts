import * as PIXI from 'pixi.js'
import { COLOR, TEXT_STYLE } from '../../../constants/style'
import { loadMoneyBar, MoneyBarType } from '../../../components/moneyBar'
import { SPECIAL_ACTION } from '../../../constants/gameConfig'

export interface SpecialActionContainerType extends PIXI.Container {
  skipButton: PIXI.Sprite
  factCheckButton: PIXI.Sprite
  exposeButton: PIXI.Sprite
  spyButton: PIXI.Sprite
  confirmButton: PIXI.Sprite
  question: PIXI.Sprite
  moneyBar: MoneyBarType
  timeLeft: PIXI.Text
  finishButton: PIXI.Sprite
  setTime: (time: number) => void
  setToFactCheck: () => void
  setToExpose: () => void
  setToSpy: () => void
  setSelect: (n: number) => void
  displayFactCheckResult: (isSuccessful: boolean, newPeople: number, prevPeople: number) => void
  displayExposeResult: (isSuccessful: boolean, newPeople: number, prevPeople: number) => void
  reset: () => void
  setOnRevert: (onRevert: () => void) => void
}

const loadSpecialActionContainer = (resources: PIXI.IResourceDictionary) => {
  const specialActionContainer = new PIXI.Container() as SpecialActionContainerType

  const timeLeftText = new PIXI.Text('เหลือเวลา', TEXT_STYLE.SUBHEADER_THAI)
  timeLeftText.position.set(0, -42)
  specialActionContainer.addChild(timeLeftText)

  let onRevert = () => {
    return
  }

  specialActionContainer.setOnRevert = (newOnRevert) => {
    onRevert = newOnRevert
  }

  const timeLeft = new PIXI.Text(
    SPECIAL_ACTION.INIT_TIME.toString(),
    TEXT_STYLE.SUBHEADER_THAI_RED_PURPLE,
  )
  timeLeft.anchor.set(0.5, 0)
  timeLeft.position.set(timeLeftText.x + timeLeftText.width + 40, timeLeftText.y)
  specialActionContainer.addChild(timeLeft)

  const secondText = new PIXI.Text('วินาที', TEXT_STYLE.SUBHEADER_THAI)
  secondText.position.set(timeLeft.x + timeLeft.width - 10, timeLeftText.y)
  specialActionContainer.addChild(secondText)

  const specialActionButtonContainer = new PIXI.Container()
  specialActionContainer.addChild(specialActionButtonContainer)
  specialActionButtonContainer.interactive = true

  const specialActionBg = new PIXI.Sprite(resources['art/special-action-bg'].texture)
  specialActionBg.position.set(0, 0)
  specialActionButtonContainer.addChild(specialActionBg)

  const specialActionText = new PIXI.Text('การกระทำพิเศษ', TEXT_STYLE.HEADER_THAI)
  specialActionText.anchor.set(0.5, 0)
  specialActionText.position.set(specialActionBg.width / 2, 32)
  specialActionButtonContainer.addChild(specialActionText)

  // const question = new PIXI.Sprite(resources['art/special-action-question'].texture)
  // question.anchor.set(0, 0.5)
  // question.interactive = true
  // question.buttonMode = true
  // question.on('mouseover', () => onHoverSpecialActionButton(0)).on('mouseout', () => onMouseOut(0))
  // question.position.set(
  //   specialActionText.x + specialActionText.width / 2 + 20,
  //   specialActionText.y + specialActionText.height / 2,
  // )
  // specialActionButtonContainer.addChild(question)

  let padding = 100

  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(specialActionBg.width + padding, specialActionBg.y)
  specialActionContainer.addChild(moneyBar)

  let btnPadding = 72

  const spyButton = new PIXI.Sprite(resources['art/spy-btn'].texture)
  spyButton.position.set(98, 121)
  spyButton.interactive = true
  spyButton.buttonMode = true
  spyButton.on('mouseover', () => onHoverSpecialActionButton(3)).on('mouseout', () => onMouseOut(3))
  specialActionButtonContainer.addChild(spyButton)

  const factCheckButton = new PIXI.Sprite(resources['art/fack-check-btn'].texture)
  factCheckButton.position.set(spyButton.x + spyButton.width + btnPadding, spyButton.y)
  factCheckButton.interactive = true
  factCheckButton.buttonMode = true
  factCheckButton
    .on('mouseover', () => onHoverSpecialActionButton(1))
    .on('mouseout', () => onMouseOut(1))
  specialActionButtonContainer.addChild(factCheckButton)

  const exposeButton = new PIXI.Sprite(resources['art/expose-btn'].texture)
  exposeButton.position.set(
    factCheckButton.x + factCheckButton.width + btnPadding,
    factCheckButton.y,
  )
  exposeButton.interactive = true
  exposeButton.buttonMode = true
  exposeButton
    .on('mouseover', () => onHoverSpecialActionButton(2))
    .on('mouseout', () => onMouseOut(2))
  specialActionButtonContainer.addChild(exposeButton)

  const descriptionBg = new PIXI.Sprite(resources['art/special-action-description-bg'].texture)
  descriptionBg.position.set(moneyBar.x, moneyBar.y + moneyBar.height + 20)
  specialActionContainer.addChild(descriptionBg)

  const skipButton = new PIXI.Sprite(resources['art/skip-btn'].texture)
  skipButton.interactive = true
  skipButton.buttonMode = true
  skipButton.position.set(descriptionBg.x, descriptionBg.y + descriptionBg.height + 20)
  specialActionButtonContainer.addChild(skipButton)

  const textStyle = new PIXI.TextStyle({
    fontFamily: 'Chonburi',
    fontSize: 36,
    align: 'center',
    leading: 10,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: descriptionBg.width - 20,
  })

  const descriptionText = new PIXI.Text(SPECIAL_ACTION.DEFAULT_DES, textStyle)
  descriptionText.anchor.set(0.5)
  descriptionText.position.set(
    descriptionBg.x + descriptionBg.width / 2,
    descriptionBg.y + descriptionBg.height / 2,
  )
  specialActionContainer.addChild(descriptionText)

  const textStyle2 = new PIXI.TextStyle({
    fontFamily: 'Chonburi',
    fontSize: 36,
    align: 'center',
    fill: COLOR.CHARCOAL,
    leading: 10,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: specialActionBg.width - 50,
  })

  const generalDescription = new PIXI.Text(SPECIAL_ACTION.GENERAL_DES, textStyle2)
  generalDescription.anchor.set(0.5)
  generalDescription.position.set(
    specialActionBg.x + specialActionBg.width / 2,
    specialActionBg.y + specialActionBg.height / 2,
  )
  specialActionContainer.addChild(generalDescription)
  generalDescription.visible = false

  //sub special action
  const subSpecialActionContainer = new PIXI.Container()
  specialActionContainer.addChild(subSpecialActionContainer)
  subSpecialActionContainer.visible = false
  subSpecialActionContainer.interactive = true

  const subSpecialActionBg = new PIXI.Sprite(resources['art/sub-special-action-bg'].texture)
  subSpecialActionBg.position.set(specialActionBg.x, specialActionBg.y)
  subSpecialActionBg.interactive = true
  subSpecialActionContainer.addChild(subSpecialActionBg)

  const subSpecialActionTextContainer = new PIXI.Container()
  subSpecialActionContainer.addChild(subSpecialActionTextContainer)

  const subSpecialActionText = new PIXI.Text('การกระทำพิเศษ:', TEXT_STYLE.SUBHEADER_THAI)
  subSpecialActionTextContainer.addChild(subSpecialActionText)

  const actionText = new PIXI.Text('ตรวจสอบ', TEXT_STYLE.SUBHEADER_THAI_RED_PURPLE)
  actionText.position.set(
    subSpecialActionText.x + subSpecialActionText.width + 20,
    subSpecialActionText.y,
  )
  subSpecialActionTextContainer.addChild(actionText)

  subSpecialActionTextContainer.position.set(
    subSpecialActionBg.width / 2 - subSpecialActionTextContainer.width / 2,
    70,
  )

  const selectCardTextContainer = new PIXI.Container()
  subSpecialActionContainer.addChild(selectCardTextContainer)

  const pleaseSelectCardText = new PIXI.Text('เลือกการ์ดที่จะตรวจสอบ', TEXT_STYLE.HEADER_THAI)
  selectCardTextContainer.addChild(pleaseSelectCardText)

  const countSelectText = new PIXI.Text('(0/1)', TEXT_STYLE.HEADER_THAI_RED_PURPLE)
  countSelectText.position.set(pleaseSelectCardText.x + pleaseSelectCardText.width + 10, 0)
  selectCardTextContainer.addChild(countSelectText)

  selectCardTextContainer.position.set(
    subSpecialActionBg.width / 2 - selectCardTextContainer.width / 2,
    195,
  )

  const resultText = new PIXI.Text('', TEXT_STYLE.SUPER_HEADER_THAI_RED_PURPLE)
  resultText.anchor.set(0.5, 1)
  resultText.position.set(subSpecialActionBg.width / 2, selectCardTextContainer.y + 60)
  subSpecialActionContainer.addChild(resultText)
  resultText.visible = false

  const peopleResultText = new PIXI.Text('', TEXT_STYLE.HEADER_THAI)
  peopleResultText.anchor.set(0.5, 1)
  peopleResultText.position.set(resultText.x, resultText.y + 70)
  peopleResultText.visible = false
  subSpecialActionContainer.addChild(peopleResultText)

  const confirmButton = new PIXI.Sprite(resources['art/long-confirm-btn'].texture)
  confirmButton.position.set(skipButton.x, skipButton.y)
  confirmButton.interactive = true
  confirmButton.buttonMode = true
  subSpecialActionContainer.addChild(confirmButton)

  const factCheckAgainButton = new PIXI.Sprite(resources['art/fact-check-again-btn'].texture)
  factCheckAgainButton.position.set(confirmButton.x, confirmButton.y)
  factCheckAgainButton.visible = false
  factCheckAgainButton.interactive = true
  factCheckAgainButton.buttonMode = true
  specialActionContainer.addChild(factCheckAgainButton)

  const exposeAgainButton = new PIXI.Sprite(resources['art/expose-again-btn'].texture)
  exposeAgainButton.position.set(confirmButton.x, confirmButton.y)
  exposeAgainButton.visible = false
  exposeAgainButton.interactive = true
  exposeAgainButton.buttonMode = true
  specialActionContainer.addChild(exposeAgainButton)

  const finishButton = new PIXI.Sprite(resources['art/small-finish-special-action-btn'].texture)
  finishButton.anchor.set(1, 0)
  finishButton.position.set(confirmButton.x + confirmButton.width, confirmButton.y)
  finishButton.visible = false
  finishButton.interactive = true
  finishButton.buttonMode = true
  specialActionContainer.addChild(finishButton)

  const displaySpyText = new PIXI.Text('การ์ดของฝั่งตรงข้ามเป็นดังนี้', TEXT_STYLE.HEADER_THAI)
  displaySpyText.position.set(subSpecialActionBg.width / 2 - displaySpyText.width / 2, 195)
  subSpecialActionContainer.addChild(displaySpyText)
  displaySpyText.visible = false

  const setResultText = (text: string) => {
    resultText.text = text
  }

  const displayResult = () => {
    selectCardTextContainer.visible = false
    confirmButton.visible = false
    resultText.visible = true
    peopleResultText.visible = true
    finishButton.visible = true
  }

  const revertDisplayResult = () => {
    selectCardTextContainer.visible = true
    confirmButton.visible = true
    resultText.visible = false
    peopleResultText.visible = false
    finishButton.visible = false
    factCheckAgainButton.visible = false
    exposeAgainButton.visible = false
    onRevert()
  }

  const displayFactCheckResult = (isSuccessful: boolean, newPeople: number, prevPeople: number) => {
    if (isSuccessful) {
      setResultText('สำเร็จ!!')
    } else {
      setResultText('ล้มเหลว!!')
    }
    descriptionText.text = SPECIAL_ACTION.FACT_CHECK_AGAIN
    peopleResultText.text = 'คู่ต่อสู้เสีย ' + (prevPeople - newPeople) + ' คน'
    factCheckAgainButton.visible = true
    displayResult()
  }

  const displayExposeResult = (isSuccessful: boolean, newPeople: number, prevPeople: number) => {
    if (isSuccessful) {
      setResultText('สำเร็จ!!')
    } else {
      setResultText('ล้มเหลว!!')
    }
    descriptionText.text = SPECIAL_ACTION.EXPOSE_AGAIN
    peopleResultText.text = 'คู่ต่อสู้เสีย ' + (prevPeople - newPeople) + ' คน'
    exposeAgainButton.visible = true
    displayResult()
  }

  const onHoverSpecialActionButton = (id: number) => {
    switch (id) {
      case 1:
        descriptionText.text = SPECIAL_ACTION.FACK_CHECK_DES
        factCheckButton.texture = resources['art/fack-check-btn-on-hover'].texture
        break
      case 2:
        descriptionText.text = SPECIAL_ACTION.EXPOSE_DES
        exposeButton.texture = resources['art/expose-btn-on-hover'].texture
        break
      case 3:
        descriptionText.text = SPECIAL_ACTION.SPY_DES
        spyButton.texture = resources['art/spy-btn-on-hover'].texture
        break
      default:
        specialActionButtonContainer.visible = false
        specialActionBg.texture = resources['art/special-action-bg-2'].texture
        generalDescription.visible = true
        break
    }
  }

  const onMouseOut = (id: number) => {
    descriptionText.text = SPECIAL_ACTION.DEFAULT_DES
    switch (id) {
      case 1:
        factCheckButton.texture = resources['art/fack-check-btn'].texture
        break
      case 2:
        exposeButton.texture = resources['art/expose-btn'].texture
        break
      case 3:
        spyButton.texture = resources['art/spy-btn'].texture
        break
      default:
        specialActionButtonContainer.visible = true
        specialActionBg.texture = resources['art/special-action-bg'].texture
        generalDescription.visible = false
        break
    }
  }

  specialActionContainer.setTime = (time: number) => {
    timeLeft.text = time.toString()
  }

  const updateTextPosition = () => {
    countSelectText.position.set(pleaseSelectCardText.x + pleaseSelectCardText.width + 10, 0)
    selectCardTextContainer.position.set(
      subSpecialActionBg.width / 2 - selectCardTextContainer.width / 2,
      195,
    )
    actionText.position.set(
      subSpecialActionText.x + subSpecialActionText.width + 20,
      subSpecialActionText.y,
    )
    subSpecialActionTextContainer.position.set(
      subSpecialActionBg.width / 2 - subSpecialActionTextContainer.width / 2,
      70,
    )
  }

  specialActionContainer.reset = () => {
    subSpecialActionContainer.visible = false
    specialActionButtonContainer.visible = true
    displaySpyText.visible = false
    exposeAgainButton.visible = false
    factCheckAgainButton.visible = false
    finishButton.visible = false
    finishButton.texture = resources['art/small-finish-special-action-btn'].texture
  }

  const setToFactCheck = () => {
    subSpecialActionContainer.visible = true
    specialActionButtonContainer.visible = false
    actionText.text = 'ตรวจสอบ'
    pleaseSelectCardText.text = 'เลือกการ์ดที่จะตรวจสอบ'
    pleaseSelectCardText.visible = true
    descriptionText.text = SPECIAL_ACTION.FACK_CHECK_DES
    factCheckAgainButton.visible = false
    countSelectText.visible = true
    revertDisplayResult()
    updateTextPosition()
  }
  specialActionContainer.setToFactCheck = setToFactCheck

  const setToExpose = () => {
    subSpecialActionContainer.visible = true
    specialActionButtonContainer.visible = false
    actionText.text = 'เปิดโปง'
    pleaseSelectCardText.text = 'เลือกการ์ดที่จะเปิดโปง'
    pleaseSelectCardText.visible = true
    descriptionText.text = SPECIAL_ACTION.EXPOSE_DES
    exposeAgainButton.visible = false
    countSelectText.visible = true
    revertDisplayResult()
    updateTextPosition()
  }
  specialActionContainer.setToExpose = setToExpose

  const setToSpy = () => {
    subSpecialActionContainer.visible = true
    specialActionButtonContainer.visible = false
    actionText.text = 'สอดส่อง'
    selectCardTextContainer.visible = false
    descriptionText.text = 'หวังว่าคุณจะพอรู้กลยุทธ์ของคู่แข่ง มากขึ้นนะ!!'
    displaySpyText.visible = true
    finishButton.texture = resources['art/long-finish-btn'].texture
    confirmButton.visible = false
    finishButton.visible = true
    pleaseSelectCardText.visible = false
    countSelectText.visible = false
    revertDisplayResult()
  }
  specialActionContainer.setToSpy = setToSpy

  specialActionContainer.setSelect = (n: number) => {
    countSelectText.text = '(' + n + '/1)'
  }

  exposeAgainButton.on('mousedown', setToExpose).on('touchstart', setToExpose)
  factCheckAgainButton.on('mousedown', setToFactCheck).on('touchstart', setToFactCheck)

  specialActionContainer.skipButton = skipButton
  specialActionContainer.factCheckButton = factCheckButton
  specialActionContainer.exposeButton = exposeButton
  specialActionContainer.spyButton = spyButton
  specialActionContainer.moneyBar = moneyBar
  specialActionContainer.confirmButton = confirmButton
  specialActionContainer.finishButton = finishButton
  specialActionContainer.displayFactCheckResult = displayFactCheckResult
  specialActionContainer.displayExposeResult = displayExposeResult

  return specialActionContainer
}

export default loadSpecialActionContainer
