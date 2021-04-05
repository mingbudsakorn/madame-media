import { COLOR, TEXT_STYLE } from '../utils/style.js'

const loadCard = (resources, cardConfig, isReal) => {
  const card = new PIXI.Container()

  let cardBg = isReal? new PIXI.Sprite(resources.realCardBg.texture) : new PIXI.Sprite(resources.fakeCardBg.texture)
  card.addChild(cardBg)

  let cardLine = new PIXI.Sprite(resources.cardLine.texture)
  cardLine.position.set(30,122)
  card.addChild(cardLine)

  let audioIconBig = cardConfig.audio? new PIXI.Sprite(resources.availAudio.texture) : new PIXI.Sprite(resources.notAvailAudio.texture)
  audioIconBig.position.set(42,654)
  card.addChild(audioIconBig)

  let visualIconBig = cardConfig.visual? new PIXI.Sprite(resources.availVisual.texture) : new PIXI.Sprite(resources.notAvailVisual.texture)
  visualIconBig.position.set(182,654)
  card.addChild(visualIconBig)

  let textIconBig = cardConfig.text? new PIXI.Sprite(resources.availText.texture) : new PIXI.Sprite(resources.notAvailText.texture)
  textIconBig.position.set(322,654)
  card.addChild(textIconBig)
  
  let audioIconSmall = new PIXI.Sprite(audioIconBig.texture)
  audioIconSmall.width = 45
  audioIconSmall.height = 45
  audioIconSmall.position.set(34,31)
  card.addChild(audioIconSmall)

  let visualIconSmall = new PIXI.Sprite(visualIconBig.texture)
  visualIconSmall.width = 45
  visualIconSmall.height = 45
  visualIconSmall.position.set(90,31)
  card.addChild(visualIconSmall)

  let textIconSmall = new PIXI.Sprite(textIconBig.texture)
  textIconSmall.width = 45
  textIconSmall.height = 45
  textIconSmall.position.set(146,31)
  card.addChild(textIconSmall)
  
  let cardName = new PIXI.Text(cardConfig.name, TEXT_STYLE.BODY_THAI_CHARCOAL)
  cardName.position.set(34, 86)
  card.addChild(cardName)

  let cardType = new PIXI.Text(cardConfig.type, TEXT_STYLE.HEADER_THAI_CHACOAL)
  cardType.anchor.set(0.5)
  cardType.position.set(cardBg.width/2, 571.5)
  card.addChild(cardType)

  let cardPrice = new PIXI.Text(cardConfig.price, TEXT_STYLE.HEADER_THAI_CHACOAL)
  cardPrice.anchor.set(1,1)
  cardPrice.position.set(396, 83)
  card.addChild(cardPrice)

  let unitText = new PIXI.Text('เหรียญ', TEXT_STYLE.OVERLINE_THAI_CHACOAL)
  unitText.anchor.set(0,1)
  unitText.position.set(405, 76)
  card.addChild(unitText)

  let audioText = new PIXI.Text(cardConfig.audio + '%', TEXT_STYLE.BODY_THAI_CHARCOAL)
  audioText.anchor.set(0.5)
  audioText.position.set(142, 683.5)
  card.addChild(audioText)

  let visualText = new PIXI.Text(cardConfig.visual + '%', TEXT_STYLE.BODY_THAI_CHARCOAL)
  visualText.anchor.set(0.5)
  visualText.position.set(282, 683.5)
  card.addChild(visualText)

  let textText = new PIXI.Text(cardConfig.text + '%', TEXT_STYLE.BODY_THAI_CHARCOAL)
  textText.anchor.set(0.5)
  textText.position.set(422, 683.5)
  card.addChild(textText)
  
  let effectText = new PIXI.Text(cardConfig.effect, TEXT_STYLE.BODY_THAI_CHARCOAL)
  effectText.anchor.set(0.5)
  effectText.position.set(cardBg.width/2, 619)
  card.addChild(effectText)

  let cardImageBg = new PIXI.Sprite(resources.cardImageBg.texture)
  cardImageBg.position.set(45,147)
  card.addChild(cardImageBg)

  if (!isReal) {
    let fakeText = new PIXI.Text('ปลอม', TEXT_STYLE.SUPER_HEADER_THAI_CHACOAL)
    fakeText.anchor.set(0.5)
    fakeText.position.set(cardBg.width/2, 339.5)
    card.addChild(fakeText)
  }

  return card
}

export default loadCard