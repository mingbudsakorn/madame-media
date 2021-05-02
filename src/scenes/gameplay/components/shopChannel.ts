import * as PIXI from 'pixi.js'
import { ChannelInShopType } from '../../../components/channelInShop'
import { TEXT_STYLE, COLOR } from '../../../constants/style'
import loadMoneyBar from '../../../components/moneyBar'

interface ShopChannelType extends PIXI.Container {
  setChannels: (channels: ChannelInShopType[]) => void
  getTotalPrice: () => void
  toggle: () => void
}

const loadShopChannel = (resources: PIXI.IResourceDictionary) => {
  const shopChannel = new PIXI.Container() as ShopChannelType

  let channelArray = []
  let totalPrice = 0
  let init = true
  let isShowing = false

  const shopChannelBg = new PIXI.Sprite(resources['art/shop-channel-bg'].texture)
  shopChannelBg.position.set(0, 0)
  shopChannel.addChild(shopChannelBg)

  //moneyBar
  const moneyBar = loadMoneyBar(resources)
  moneyBar.position.set(shopChannelBg.x - shopChannelBg.width / 2, 595)
  shopChannel.addChild(moneyBar)

  //text
  const buyChannelText = new PIXI.Text('เลือกซื้อช่องทางสื่อ', TEXT_STYLE.HEADER_THAI)
  buyChannelText.anchor.set(0.5, 0)
  buyChannelText.position.set(shopChannelBg.width / 2, 60)
  shopChannel.addChild(buyChannelText)

  const totalCostText = new PIXI.Text(
    'ราคารวม: ' + totalPrice + ' เหรียญ',
    TEXT_STYLE.SUBHEADER_THAI,
  )
  totalCostText.anchor.set(1, 0.5)
  totalCostText.position.set(
    shopChannelBg.x + shopChannelBg.width / 2,
    moneyBar.y + moneyBar.height / 2,
  )
  shopChannel.addChild(totalCostText)

  //button
  const buyButton = new PIXI.Sprite(resources['art/buy-button'].texture)
  buyButton.anchor.set(0.5, 0)
  buyButton.position.set(shopChannelBg.width / 2, 700)
  buyButton.interactive = true
  buyButton.buttonMode = true
  shopChannel.addChild(buyButton)

  const closeButton = new PIXI.Sprite(resources['art/close-button'].texture)
  closeButton.position.set(1700, 50)
  closeButton.interactive = true
  closeButton.buttonMode = true
  closeButton
    .on('mousedown', () => shopChannel.toggle())
    .on('touchstart', () => shopChannel.toggle())
  shopChannel.addChild(closeButton)

  const channelContainer = new PIXI.Container()
  const toggleIsSelected = (channel: ChannelInShopType) => {
    if (channel.getIsSelected) {
      //change from selected to not selected
      totalPrice -= channel.getChannelConfig().price
    } else {
      //change from not selected to selected
      init ? (init = false) : (totalPrice += channel.getChannelConfig().price)
    }
    channel.setIsSelected(!channel.getIsSelected)
  }

  const displayChannels = async (channels: ChannelInShopType[]) => {
    channelArray.length = 0
    let prevX = 0
    const padding = 20
    channels.forEach((channel, i) => {
      const singleChannelContainer = new PIXI.Container()
      channel.x = i == 0 ? prevX : prevX + channel.width + padding
      prevX = channel.x
      singleChannelContainer.addChild(channel)

      const tickBox = new PIXI.Sprite(resources['art/unchecked-channel'].texture)
      tickBox.buttonMode = true
      tickBox.interactive = true
      tickBox.anchor.set(0.5, 0)
      tickBox.position.set(channel.width / 2, channel.y + channel.height / 2 + 20)
      tickBox
        .on('mousedown', () => toggleIsSelected(channel))
        .on('touchstart', () => toggleIsSelected(channel))
      singleChannelContainer.addChild(tickBox)

      channelContainer.addChild(singleChannelContainer)
      channelArray.push({
        tickBox: tickBox,
        channel: channel,
      })
    })
  }

  shopChannel.addChild(channelContainer)

  shopChannel.getTotalPrice = () => {
    return totalPrice
  }
  shopChannel.setChannels = (channels: ChannelInShopType[]) => {
    while (channelContainer.children[0]) {
      channelContainer.removeChild(channelContainer.children[0])
    }
    displayChannels(channels)
  }
  shopChannel.toggle = () => {
    isShowing = !isShowing
    if (isShowing) {
      shopChannel.visible = true
    } else {
      shopChannel.visible = false
    }
  }

  return { scene: shopChannel, channelArray }
}
export default loadShopChannel
