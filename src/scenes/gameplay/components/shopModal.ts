import * as PIXI from 'pixi.js'
import loadMoneyBar from '../../../components/moneyBar'
import {
  CHANNEL,
  CHANNEL_ORDER,
  CHANNEL_THAI_NAME_MAP,
  initChannelSlot,
} from '../../../constants/channels'
import { TEXT_STYLE, COLOR } from '../../../constants/style'
import { ChannelInShopList, Channel, ChannelSlots } from '../../../types/index'
import loadChannelInShop, { ChannelInShopType } from '../../../components/channelInShop'

interface ShopModalType extends PIXI.Container {
  totalCost: number
  toggle: () => void
  setTotalCost: (totalCost: number) => void
  getTotalCost: () => number
  setChannels: (availableChannels: Channel[]) => void
  getSelectedChannels: () => Channel[]
  setAvailableChannels: (availableChannels: Channel[]) => void
  setMoneyText: (number) => void
}

export const loadShopModal = (resources: PIXI.IResourceDictionary) => {
  let isShowing = false
  let channelArray = []
  let totalCost = 0

  const shopModalWithOverlay = new PIXI.Container() as ShopModalType
  shopModalWithOverlay.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  shopModalWithOverlay.addChild(overlay)

  const shopModal = new PIXI.Container()
  shopModalWithOverlay.addChild(shopModal)

  const shopModalBg = new PIXI.Sprite(resources['art/shop-modal-bg'].texture)
  shopModal.addChild(shopModalBg)
  shopModal.position.set(overlay.width / 2 - shopModalBg.width / 2, 113)

  const panelBg = new PIXI.Sprite(resources['art/buy-channel-panel-bg'].texture)
  panelBg.anchor.set(0.5, 0)
  panelBg.position.set(shopModalBg.x + shopModalBg.width / 2, 150)
  shopModal.addChild(panelBg)

  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(panelBg.x - panelBg.width / 2, 595)
  shopModal.addChild(moneyBar)

  const channelContainer = new PIXI.Container()

  // channels
  shopModalWithOverlay.setChannels = (availableChannels: Channel[]) => {
    let prevX = 88
    let padding = 20
    let channelY = panelBg.y + 20

    // Clear old children
    while (channelContainer.children[0]) {
      channelContainer.removeChild(channelContainer.children[0])
    }

    // Object.keys(CHANNEL).forEach((channelKey, i) => {
    //   const channelInShop = loadChannelInShop(resources, CHANNEL[channelKey])
    //   channelInShop.x = i == 0 ? prevX : prevX + channelInShop.width + padding
    //   prevX = channelInShop.x
    //   channelInShop.y = channelY
    //   channelContainer.addChild(channelInShop)

    //   channelInShop.tickBox
    //     .on('mousedown', async () => {
    //       channelInShop.toggleIsSelected()
    //       toggleIsSelected(channelInShop)
    //     })
    //     .on('touchstart', () => {
    //       channelInShop.toggleIsSelected()
    //       toggleIsSelected(channelInShop)
    //     })

    //   channelArray.push(channelInShop)
    //   channelContainer.addChild(channelInShop)
    // })

    // availableChannels.forEach((channel) => {
    //   const order = CHANNEL_ORDER[channel.name]
    //   const channelInArray = channelArray[order]
    //   channelInArray.setIsOwned(true)
    // })

    shopModal.addChild(channelContainer)
  }

  shopModalWithOverlay.getSelectedChannels = () => {
    let selectedChannels = channelArray.filter((channel) => channel.channelObject.getIsSelected())
    return selectedChannels
  }

  //text
  const buyChannelText = new PIXI.Text('เลือกซื้อช่องทางสื่อ', TEXT_STYLE.HEADER_THAI)
  buyChannelText.anchor.set(0.5, 0)
  buyChannelText.position.set(shopModalBg.width / 2, 60)
  shopModal.addChild(buyChannelText)

  const totalCostText = new PIXI.Text(
    'ราคารวม: ' + totalCost.toString() + ' เหรียญ',
    TEXT_STYLE.SUBHEADER_THAI,
  )
  totalCostText.anchor.set(1, 0.5)
  totalCostText.position.set(panelBg.x + panelBg.width / 2, moneyBar.y + moneyBar.height / 2)
  shopModal.addChild(totalCostText)

  //button
  const buyButton = new PIXI.Sprite(resources['art/buy-button'].texture)
  buyButton.anchor.set(0.5, 0)
  buyButton.position.set(shopModalBg.width / 2, 700)
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

  shopModalWithOverlay.getTotalCost = () => {
    return totalCost
  }

  shopModalWithOverlay.setMoneyText = (money: number) => {
    moneyBar.setMoney(money)
  }

  const setTotalCost = (totalCost: number) => {
    totalCostText.text = 'ราคารวม: ' + totalCost.toString() + ' เหรียญ'
    totalCost = totalCost
  }

  const toggleIsSelected = (channel: ChannelInShopType) => {
    if (channel.getIsSelected()) {
      totalCost += channel.getChannelConfig().price
    } else {
      totalCost -= channel.getChannelConfig().price
    }
    setTotalCost(totalCost)
  }

  overlay.interactive = true

  return {
    scene: shopModalWithOverlay,
    buyButton,
  }
}
export default loadShopModal
