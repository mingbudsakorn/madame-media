import * as PIXI from 'pixi.js'
import { COLOR, TEXT_STYLE } from '../../../constants/style'
import { loadMoneyBar, MoneyBarType } from '../../../components/moneyBar'
import { SPECIAL_ACTION } from '../../../constants/gameConfig'

interface SpecialActionContainerType extends PIXI.Container {
  skipButton: PIXI.Sprite
  factCheckButton: PIXI.Sprite
  exposeButton: PIXI.Sprite
  spyButton: PIXI.Sprite
  question: PIXI.Sprite
  moneyBar: MoneyBarType
  timeLeft: PIXI.Text
  setTime: (time: number) => void
}

const loadSpecialActionContainer = (resources: PIXI.IResourceDictionary) => {
  const specialActionContainer = new PIXI.Container() as SpecialActionContainerType

  const timeLeftText = new PIXI.Text('เหลือเวลา', TEXT_STYLE.SUBHEADER_THAI)
  timeLeftText.position.set(0, -42)
  specialActionContainer.addChild(timeLeftText)

  const timeLeft = new PIXI.Text(SPECIAL_ACTION.INIT_TIME.toString(), TEXT_STYLE.SUBHEADER_THAI_RED_PURPLE)
  timeLeft.position.set(timeLeftText.x + timeLeftText.width + 15, timeLeftText.y)
  specialActionContainer.addChild(timeLeft)

  const secondText = new PIXI.Text('วินาที', TEXT_STYLE.SUBHEADER_THAI)
  secondText.position.set(timeLeft.x + timeLeft.width + 15, timeLeftText.y)
  specialActionContainer.addChild(secondText)

  const specialActionBg = new PIXI.Sprite(resources['art/special-action-bg'].texture)
  specialActionBg.position.set(0,0)
  specialActionContainer.addChild(specialActionBg)

  const specialActionText = new PIXI.Text('การกระทำพิเศษ', TEXT_STYLE.HEADER_THAI)
  specialActionText.anchor.set(0.5, 0)
  specialActionText.position.set(specialActionBg.width/2, 32)
  specialActionContainer.addChild(specialActionText)

  const question = new PIXI.Sprite(resources['art/special-action-question'].texture)
  question.anchor.set(0, 0.5)
  question.interactive = true
  question.buttonMode = true
  question
    .on('mouseover', () => onHoverSpecialActionButton(0))
    .on('mouseout', () => onMouseOut(0))
  question.position.set(specialActionText.x + specialActionText.width/2 + 20, specialActionText.y + specialActionText.height/2)
  specialActionContainer.addChild(question)

  let padding = 100

  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(specialActionBg.width + padding, specialActionBg.y)
  specialActionContainer.addChild(moneyBar)

  let btnPadding = 72

  const specialActionButtonContainer = new PIXI.Container()
  specialActionContainer.addChild(specialActionButtonContainer)

  const factCheckButton = new PIXI.Sprite(resources['art/fack-check-btn'].texture)
  factCheckButton.position.set(98, 121)
  factCheckButton.interactive = true
  factCheckButton.buttonMode = true
  factCheckButton
    .on('mouseover', () => onHoverSpecialActionButton(1))
    .on('mouseout', () => onMouseOut(1))
  specialActionButtonContainer.addChild(factCheckButton)

  const exposeButton = new PIXI.Sprite(resources['art/expose-btn'].texture)
  exposeButton.position.set(factCheckButton.x + factCheckButton.width + btnPadding, factCheckButton.y)
  exposeButton.interactive = true
  exposeButton.buttonMode = true
  exposeButton
    .on('mouseover', () => onHoverSpecialActionButton(2))
    .on('mouseout', () => onMouseOut(2))
  specialActionButtonContainer.addChild(exposeButton)

  const spyButton = new PIXI.Sprite(resources['art/spy-btn'].texture)
  spyButton.position.set(exposeButton.x + exposeButton.width + btnPadding, exposeButton.y)
  spyButton.interactive = true
  spyButton.buttonMode = true
  spyButton
    .on('mouseover', () => onHoverSpecialActionButton(3))
    .on('mouseout', () => onMouseOut(3))
  specialActionButtonContainer.addChild(spyButton)

  const descriptionBg = new PIXI.Sprite(resources['art/special-action-description-bg'].texture)
  descriptionBg.position.set(moneyBar.x, moneyBar.y + moneyBar.height + 20)
  specialActionContainer.addChild(descriptionBg)

  const skipButton = new PIXI.Sprite(resources['art/skip-btn'].texture)
  skipButton.interactive = true
  skipButton.buttonMode = true
  skipButton.position.set(descriptionBg.x, descriptionBg.y + descriptionBg.height + 20)
  specialActionContainer.addChild(skipButton)

  const textStyle =  new PIXI.TextStyle({
    fontFamily: 'Chonburi',
    fontSize: 36,
    align: 'center',
    leading: 10,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: descriptionBg.width - 20
  })

  const descriptionText = new PIXI.Text(SPECIAL_ACTION.DEFAULT_DES, textStyle)
  descriptionText.anchor.set(0.5)
  descriptionText.position.set(descriptionBg.x + descriptionBg.width/2, descriptionBg.y + descriptionBg.height/2)
  specialActionContainer.addChild(descriptionText)

  const textStyle2 =  new PIXI.TextStyle({
    fontFamily: 'Chonburi',
    fontSize: 36,
    align: 'center',
    fill: COLOR.CHARCOAL,
    leading: 10,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: specialActionBg.width - 50
  })

  const generalDescription = new PIXI.Text(SPECIAL_ACTION.GENERAL_DES, textStyle2)
  generalDescription.anchor.set(0.5)
  generalDescription.position.set(specialActionBg.x + specialActionBg.width/2, specialActionBg.y + specialActionBg.height/2)
  specialActionContainer.addChild(generalDescription)
  generalDescription.visible = false


  const onHoverSpecialActionButton = (id: number) => {
    switch(id) {
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
    switch(id) {
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

  specialActionContainer.skipButton = skipButton
  specialActionContainer.factCheckButton = factCheckButton
  specialActionContainer.exposeButton = exposeButton
  specialActionContainer.spyButton = spyButton
  specialActionContainer.moneyBar = moneyBar

  return specialActionContainer
}

export default loadSpecialActionContainer
