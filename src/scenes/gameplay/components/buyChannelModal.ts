import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { Channel } from '../../../types'

interface BuyChannelModalType extends PIXI.Container {
  setChannelConfig: (channelConfig: Channel) => void
  buyButton: PIXI.Sprite
  toggle: () => void
  setVisible: (boolean) => void
}

const channelImgName = {
  โซเชียลมีเดีย: 'channels/social-media',
  ปากต่อปาก: 'channels/mouth',
  เว็บเพจ: 'channels/web',
  โทรทัศน์: 'channels/tv',
  วิทยุ: 'channels/radio',
  สิ่งพิมพ์: 'channels/print',
  สื่อนอกบ้าน: 'channels/out-of-home',
}

export const loadBuyChannelModal = (resources: PIXI.IResourceDictionary) => {
  let isShowing = false
  let channelConfig = null as Channel

  const buyChannelModal = new PIXI.Container() as BuyChannelModalType
  buyChannelModal.position.set(0, 0)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  buyChannelModal.addChild(overlay)

  const modal = new PIXI.Container()
  modal.position.set(554, 48)

  const modalBg = new PIXI.Sprite(resources['art/buy-channel-modal'].texture)
  modal.addChild(modalBg)

  const headerText = new PIXI.Text('ซื้อช่องทางสื่อ', TEXT_STYLE.HEADER_THAI)
  headerText.anchor.set(0.5, 0)
  headerText.position.set(modalBg.width / 2, 40)
  modal.addChild(headerText)

  const nameText = new PIXI.Text(
    channelConfig ? channelConfig.name : '',
    TEXT_STYLE.SUBHEADER_THAI_CHARCOAL,
  )
  nameText.anchor.set(0.5, 0)
  nameText.position.set(modalBg.width / 2, headerText.y + headerText.height + 20)
  modal.addChild(nameText)

  const channelImg = new PIXI.Sprite(
    resources[channelConfig ? channelImgName[channelConfig.name] : 'cards/card-img-bg'].texture,
  )
  channelImg.anchor.set(0.5, 0)
  channelImg.position.set(modalBg.width / 2, nameText.y + nameText.height + 40)
  channelImg.width = 300
  channelImg.height = 300
  modal.addChild(channelImg)

  let audioIcon =
    channelConfig && channelConfig.audio
      ? new PIXI.Sprite(resources['cards/avail-volume-big'].texture)
      : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  audioIcon.width = 48
  audioIcon.height = 48
  audioIcon.position.set(310, channelImg.y + channelImg.width + 40)
  modal.addChild(audioIcon)

  let visualIcon =
    channelConfig && channelConfig.visual
      ? new PIXI.Sprite(resources['cards/avail-img-big'].texture)
      : new PIXI.Sprite(resources['cards/not-avail-img-big'].texture)
  visualIcon.width = 48
  visualIcon.height = 48
  visualIcon.position.set(audioIcon.x + audioIcon.width + 23, audioIcon.y)
  modal.addChild(visualIcon)

  let textIcon =
    channelConfig && channelConfig.text
      ? new PIXI.Sprite(resources['cards/avail-text-big'].texture)
      : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  textIcon.width = 48
  textIcon.height = 48
  textIcon.position.set(visualIcon.x + visualIcon.width + 23, audioIcon.y)
  modal.addChild(textIcon)

  const percentageText = new PIXI.Text(
    channelConfig ? `ฐานผู้รับสาร ${channelConfig.baseFactor * 100}%` : '',
    TEXT_STYLE.SUBHEADER_THAI_CHARCOAL,
  )
  percentageText.anchor.set(0.5, 0)
  percentageText.position.set(modalBg.width / 2, audioIcon.y + audioIcon.width + 40)
  modal.addChild(percentageText)

  //button
  const buyButton = new PIXI.Sprite(resources['art/buy-channel-button'].texture)
  buyButton.anchor.set(0.5, 0.5)
  buyButton.position.set(modalBg.width / 2, 875)
  buyButton.interactive = true
  buyButton.buttonMode = true
  modal.addChild(buyButton)

  const moneyContainer = new PIXI.Container()

  const moneyIcon = new PIXI.Sprite(resources['art/coin'].texture)
  const channelCost = new PIXI.Text(
    channelConfig ? channelConfig.price.toString() : '0',
    TEXT_STYLE.HEADER_THAI,
  )

  moneyIcon.height = 45
  moneyIcon.width = 45

  moneyIcon.position.set(0, 0)
  channelCost.position.set(moneyIcon.x + moneyIcon.width + 40, 0)

  moneyContainer.addChild(moneyIcon)
  moneyContainer.addChild(channelCost)

  moneyContainer.position.set(modalBg.width / 2 - (moneyContainer.width * 3) / 4, 750)

  modal.addChild(moneyContainer)

  const closeButton = new PIXI.Sprite(resources['art/close-button'].texture)
  closeButton.position.set(modalBg.width - closeButton.width - 50, 50)
  closeButton.interactive = true
  closeButton.buttonMode = true
  closeButton
    .on('mousedown', () => buyChannelModal.toggle())
    .on('touchstart', () => buyChannelModal.toggle())
  modal.addChild(closeButton)

  //visibility
  buyChannelModal.visible = isShowing

  //methods
  buyChannelModal.toggle = () => {
    isShowing = !isShowing
    if (isShowing) {
      buyChannelModal.visible = true
    } else {
      buyChannelModal.visible = false
    }
  }

  buyChannelModal.setChannelConfig = (newChannelConfig: Channel) => {
    channelConfig = newChannelConfig
    channelImg.texture = resources[channelImgName[newChannelConfig.name]].texture
    channelCost.text = newChannelConfig.price.toString()
    nameText.text = newChannelConfig.name
    percentageText.text = `ฐานผู้รับสาร ${Math.floor(newChannelConfig.baseFactor * 100)}%`
    audioIcon.texture = channelConfig.audio
      ? resources['cards/avail-volume-big'].texture
      : resources['cards/not-avail-volume-big'].texture
    visualIcon.texture = channelConfig.audio
      ? resources['cards/avail-img-big'].texture
      : resources['cards/not-avail-img-big'].texture
    textIcon.texture = channelConfig.text
      ? resources['cards/avail-text-big'].texture
      : resources['cards/not-avail-text-big'].texture
  }

  buyChannelModal.addChild(modal)
  buyChannelModal.setVisible = (visible) => {
    buyChannelModal.visible = visible
    isShowing = visible
  }

  buyChannelModal.buyButton = buyButton

  return buyChannelModal
}
