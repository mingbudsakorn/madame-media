import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
TEXT_STYLE

interface factCheckType extends PIXI.Container{
  setOpponetCardList: (opponentCardList) => void
  doFactCheck: (card)=> void 
}

export const loadFactCheck = (
  resources: PIXI.IResourceDictionary, 
  opponentCardList,
)=>
{
  const factCheckContainer = new PIXI.Container as factCheckType

  const  factCheckBg = new PIXI.Sprite(resources['art/fact-check-bg'].texture)
  const selectCardText = new PIXI.Text('เลือกการ์ดที่จะตรวจสอบ', TEXT_STYLE.HEADER_THAI) 
  const factCheckDescription = new PIXI.Sprite(resources['art/fact-check-description'].texture)
  const confirmButton = new PIXI.Sprite(resources['art/confirm-btn'].texture)

  factCheckContainer.addChild(factCheckBg)
  factCheckContainer.addChild(selectCardText)
  factCheckContainer.addChild(factCheckDescription)
  factCheckContainer.addChild(confirmButton)

  factCheckContainer.setOpponetCardList = (opponentCardList) => {
    for(let i in opponentCardList){
      let card = opponentCardList[i].cardConfig
      card.buttonMode = true
      card.interactive = true
      card.on('mousedown', (card) => doFactCheck(card))
      card.on('touchstart', (card) => doFactCheck(card))
    }
  }
  const doFactCheck = (card) => {
    if(!card.isReal){
      const fakeCardOverLay = new PIXI.Sprite(resources['art/fake-card-overlay'].texture)
      factCheckContainer.addChild(fakeCardOverLay)
    }
    else{
      const realCardOverlay = new PIXI.Sprite(resources['art/real-card-overlay'].texture)
      factCheckContainer.addChild(realCardOverlay)
    }
  }
  return factCheckContainer

}
export default loadFactCheck