import * as PIXI from 'pixi.js'
import loadChannel from '../../../components/channel'
import loadMoneyBar from '../../../components/moneyBar'
import { Channel } from '../../../types'
import { TEXT_STYLE, COLOR } from '../../../constants/style'

interface LoadShopModalType extends PIXI.Container {
  toggle: () => void
}

export const loadShopModal = (resources: PIXI.IResourceDictionary, channel: Channel) => {
  let isShowing = false

  const shopModalWithOverlay = new PIXI.Container() as LoadShopModalType
  shopModalWithOverlay.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  shopModalWithOverlay.addChild(overlay)

  const shopModal = new PIXI.Container()
  shopModal.position.set(216, 113)
  shopModalWithOverlay.addChild(shopModal)

  const shopModalBg = new PIXI.Sprite(resources['art/shop-modal-bg'].texture)
  shopModal.addChild(shopModalBg)

  const panelBg = new PIXI.Sprite(resources['art/buy-channel-panel-bg'].texture)
  panelBg.anchor.set(0.5,0)
  panelBg.position.set(shopModalBg.x + shopModalBg.width/2, 150)
  shopModal.addChild(panelBg)

  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(85, 595)
  shopModal.addChild(moneyBar)

  //text
  const buyChannelText = new PIXI.Text('เลือกซื้อช่องทางสื่อ', TEXT_STYLE.HEADER_THAI)
  buyChannelText.position.set(527, 60)
  shopModal.addChild(buyChannelText)

  //button
  const buyButton = new PIXI.Sprite(resources['art/buy-button'].texture)
  buyButton.position.set(527, 700)
  buyButton.interactive = true
  buyButton.buttonMode = true
  shopModal.addChild(buyButton)

  const closeButton = new PIXI.Sprite(resources['art/close-button'].texture)
  closeButton.position.set(1350, 50)
  closeButton.interactive = true
  closeButton.buttonMode = true
  closeButton
    .on('mousedown', () => shopModalWithOverlay.toggle())
    .on('touchstart', () => shopModalWithOverlay.toggle())
  shopModal.addChild(closeButton)

  const leftButton = new PIXI.Sprite(resources['art/button-polygon-left'].texture)
  leftButton.anchor.set(0.5)
  leftButton.position.set(panelBg.x-panelBg.width/2, panelBg.y+panelBg.height/2)
  leftButton.interactive = true
  leftButton.buttonMode = true
  shopModal.addChild(leftButton)

  const rightButton = new PIXI.Sprite(resources['art/button-polygon-right'].texture)
  rightButton.anchor.set(0.5)
  rightButton.position.set(panelBg.x+panelBg.width/2, leftButton.y)
  rightButton.interactive = true
  rightButton.buttonMode = true
  shopModal.addChild(rightButton)

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

  overlay.interactive = true

  return shopModalWithOverlay
}
export default loadShopModal