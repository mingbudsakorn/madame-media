import * as PIXI from 'pixi.js'
import { Channel } from '../../../types'

interface LoadShopModalType extends PIXI.Container {
  toggle: () => void
}

export const loadShopModal = (resources: PIXI.IResourceDictionary, channel: Channel) => {
  const shopModalWithOverlay = new PIXI.Container() as LoadShopModalType
  shopModalWithOverlay.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  shopModalWithOverlay.addChild(overlay)

  const shopModal = new PIXI.Container()
  shopModal.position.set(468, 121)
  shopModalWithOverlay.addChild(shopModal)

  const shopModalBg = new PIXI.Sprite(resources['art/shop-modal-bg'].texture)
  shopModal.addChild(shopModalBg)

  retun shopModalWithOverlay

}
export default loadShopModal