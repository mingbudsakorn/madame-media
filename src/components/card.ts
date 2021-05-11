import * as PIXI from 'pixi.js'
import { TYPE } from '../constants/card'
import { TEXT_STYLE } from '../constants/style'
import { Card, CardSet } from '../types'

export interface CardType extends PIXI.Container {
  getCardConfig: () => Card
  setIsReal: (boolean) => void
  getIsReal: () => boolean
}

const loadCard = (resources: PIXI.IResourceDictionary, cardConfig: Card) => {
  const card = new PIXI.Container() as CardType

  let isReal = true

  let cardBg = new PIXI.Sprite(resources['cards/real-card-bg'].texture)
  card.addChild(cardBg)

  let cardLine = new PIXI.Sprite(resources['cards/card-line'].texture)
  cardLine.position.set(30, 122)
  card.addChild(cardLine)

  let audioIconBig = cardConfig.audioFactor
    ? new PIXI.Sprite(resources['cards/avail-volume-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  audioIconBig.position.set(42, 654)
  card.addChild(audioIconBig)

  let visualIconBig = cardConfig.visualFactor
    ? new PIXI.Sprite(resources['cards/avail-img-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-img-big'].texture)
  visualIconBig.position.set(182, 654)
  card.addChild(visualIconBig)

  let textIconBig = cardConfig.textFactor
    ? new PIXI.Sprite(resources['cards/avail-text-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  textIconBig.position.set(322, 654)
  card.addChild(textIconBig)

  let audioIconSmall = new PIXI.Sprite(audioIconBig.texture)
  audioIconSmall.width = 45
  audioIconSmall.height = 45
  audioIconSmall.position.set(34, 31)
  card.addChild(audioIconSmall)

  let visualIconSmall = new PIXI.Sprite(visualIconBig.texture)
  visualIconSmall.width = 45
  visualIconSmall.height = 45
  visualIconSmall.position.set(90, 31)
  card.addChild(visualIconSmall)

  let textIconSmall = new PIXI.Sprite(textIconBig.texture)
  textIconSmall.width = 45
  textIconSmall.height = 45
  textIconSmall.position.set(146, 31)
  card.addChild(textIconSmall)

  let cardName = new PIXI.Text(cardConfig.name, TEXT_STYLE.BODY_THAI_CHARCOAL)
  cardName.position.set(34, 86)
  card.addChild(cardName)

  const cardTypeText = cardConfig.effectType === 'pr' ? TYPE.PR.text : TYPE.ATTACK.text
  let cardType = new PIXI.Text(cardTypeText, TEXT_STYLE.HEADER_THAI_CHACOAL)
  cardType.anchor.set(0.5)
  cardType.position.set(cardBg.width / 2, 571.5)
  card.addChild(cardType)

  let cardPrice = new PIXI.Text(cardConfig.cost.toString(), TEXT_STYLE.HEADER_THAI_CHACOAL)
  cardPrice.anchor.set(1, 1)
  cardPrice.position.set(396, 83)
  card.addChild(cardPrice)

  let unitText = new PIXI.Text('เหรียญ', TEXT_STYLE.OVERLINE_THAI_CHACOAL)
  unitText.anchor.set(0, 1)
  unitText.position.set(405, 76)
  card.addChild(unitText)

  let audioText = new PIXI.Text(
    Math.floor(cardConfig.audioFactor * 100) + '%',
    TEXT_STYLE.BODY_THAI_CHARCOAL,
  )
  audioText.anchor.set(0.5)
  audioText.position.set(142, 683.5)
  card.addChild(audioText)

  let visualText = new PIXI.Text(
    Math.floor(cardConfig.visualFactor) * 100 + '%',
    TEXT_STYLE.BODY_THAI_CHARCOAL,
  )
  visualText.anchor.set(0.5)
  visualText.position.set(282, 683.5)
  card.addChild(visualText)

  let textText = new PIXI.Text(
    Math.floor(cardConfig.textFactor) * 100 + '%',
    TEXT_STYLE.BODY_THAI_CHARCOAL,
  )
  textText.anchor.set(0.5)
  textText.position.set(422, 683.5)
  card.addChild(textText)

  const cardEffectText = cardConfig.effectType === 'pr' ? TYPE.PR.effect : TYPE.ATTACK.effect
  let effectText = new PIXI.Text(cardEffectText, TEXT_STYLE.BODY_THAI_CHARCOAL)
  effectText.anchor.set(0.5)
  effectText.position.set(cardBg.width / 2, 619)
  card.addChild(effectText)

  let cardImageBg = new PIXI.Sprite(resources['cards/card-img-bg'].texture)
  cardImageBg.position.set(45, 147)
  card.addChild(cardImageBg)

  let cardImagePath = resources['cards/' + cardConfig.name]
  if (cardImagePath) {
    cardImageBg.texture = cardImagePath.texture
    cardImageBg.width = 400
    cardImageBg.height = 385
  }

  // Fake Text
  let fakeText = new PIXI.Text('ปลอม', TEXT_STYLE.SUPER_HEADER_THAI_CHACOAL)
  fakeText.anchor.set(0.5)
  fakeText.position.set(cardBg.width / 2, 339.5)
  fakeText.visible = false
  card.addChild(fakeText)

  card.setIsReal = (realValue: boolean) => {
    if (!realValue) {
      isReal = false
      fakeText.visible = true
      cardBg.texture = resources['cards/fake-card-bg'].texture
      cardPrice.text = (cardConfig.cost / 2).toString()
    } else {
      isReal = true
      fakeText.visible = false
      cardBg.texture = resources['cards/real-card-bg'].texture
      cardPrice.text = cardConfig.cost.toString()
    }
  }

  card.getIsReal = () => {
    return isReal
  }

  card.getCardConfig = () => {
    return cardConfig
  }

  return card
}

export default loadCard
