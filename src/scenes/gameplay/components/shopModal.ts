import * as PIXI from 'pixi.js'
import loadChannel from '../../../components/channel'
import loadMoneyBar from '../../../components/moneyBar'
import { CHANNEL } from '../../../constants/channels'
import { TEXT_STYLE, COLOR } from '../../../constants/style'
import loadChannelShop from './channelShop'


const mockChannelInShopList = [
  {
    channelConfig: CHANNEL.SOCIAL_MEDIA,
    isOwned : false
  },
  {
    channelConfig: CHANNEL.MOUTH,
    isOwned : true
  },
  {
    channelConfig: CHANNEL.WEBPAGE,
    isOwned : true
  },
  {
    channelConfig: CHANNEL.TV,
    isOwned : false
  },
  {
    channelConfig: CHANNEL.RADIO,
    isOwned : true
  },
  {
    channelConfig: CHANNEL.PUBLICATION,
    isOwned : true
  },
  {
    channelConfig: CHANNEL.OUT_OF_HOME,
    isOwned : false
  },
]
interface LoadShopModalType extends PIXI.Container {
  totalcost : number
  toggle: () => void
  setTotalCost:(totalCost: number) => void
}

export const loadShopModal = (resources: PIXI.IResourceDictionary) => {
  let isShowing = false

  const shopModalWithOverlay = new PIXI.Container() as LoadShopModalType
  shopModalWithOverlay.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  shopModalWithOverlay.addChild(overlay)

  const shopModal = new PIXI.Container()
  shopModalWithOverlay.addChild(shopModal)

  const shopModalBg = new PIXI.Sprite(resources['art/shop-modal-bg'].texture)
  shopModal.addChild(shopModalBg)
  shopModal.position.set(overlay.width/2-(shopModalBg.width/2), 113)

  const panelBg = new PIXI.Sprite(resources['art/buy-channel-panel-bg'].texture)
  panelBg.anchor.set(0.5,0)
  panelBg.position.set(shopModalBg.x + shopModalBg.width/2, 150)
  shopModal.addChild(panelBg)

  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(panelBg.x-panelBg.width/2, 595)
  shopModal.addChild(moneyBar)


  //channels
  const channelShopDeck = loadChannelShop(resources)
  channelShopDeck.setChannelShop(mockChannelInShopList)
  channelShopDeck.position.set(shopModalBg.width/2 - channelShopDeck.width/2,165)
  shopModal.addChild(channelShopDeck)

  //text
  const buyChannelText = new PIXI.Text('เลือกซื้อช่องทางสื่อ', TEXT_STYLE.HEADER_THAI)
  buyChannelText.anchor.set(0.5,0)
  buyChannelText.position.set(shopModalBg.width/2, 60)
  shopModal.addChild(buyChannelText)

  const totalCostText = new PIXI.Text('ราคารวม: ' + '0 เหรียญ', TEXT_STYLE.SUBHEADER_THAI)
  totalCostText.anchor.set(1,0.5)
  totalCostText.position.set(panelBg.x+panelBg.width/2,moneyBar.y+moneyBar.height/2)
  shopModal.addChild(totalCostText)

  //button
  const buyButton = new PIXI.Sprite(resources['art/buy-button'].texture)
  buyButton.anchor.set(0.5,0)
  buyButton.position.set(shopModalBg.width/2, 700)
  buyButton.interactive = true
  buyButton.buttonMode = true
  shopModal.addChild(buyButton)

  const closeButton = new PIXI.Sprite(resources['art/close-button'].texture)
  closeButton.position.set(1700, 50)
  closeButton.interactive = true
  closeButton.buttonMode = true
  closeButton
    .on('mousedown', () => shopModalWithOverlay.toggle())
    .on('touchstart', () => shopModalWithOverlay.toggle())
  shopModal.addChild(closeButton)

  //visibility
  shopModalWithOverlay.visible = isShowing

  //methods
  shopModalWithOverlay.toggle = () => {
    isShowing = !isShowing
    if (isShowing) {
      shopModalWithOverlay.visible = true
    } else {
      shopModalWithOverlay.visible = false
    }
  }

  shopModalWithOverlay.setTotalCost = (totalCost: number) => {
    totalCostText.text = 'ราคารวม: ' + totalCost.toString() + 'เหรียญ'
  } 
  overlay.interactive = true

  return shopModalWithOverlay
}
export default loadShopModal