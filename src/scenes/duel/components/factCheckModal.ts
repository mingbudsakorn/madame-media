import * as PIXI from 'pixi.js'


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
  factCheckContainer.setOpponetCardList = (opponentCardList) => {
    for(let i in opponentCardList){
      let card = opponentCardList[i]
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