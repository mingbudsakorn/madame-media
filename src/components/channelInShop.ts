import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../constants/style'
import { Channel } from '../types'

export interface ChannelInShopType extends PIXI.Container {
  getChannelConfig: () => Channel
  getIsSelected: () => boolean
  setIsSelected: (isSelected: boolean) => void
  toggleIsSelected: () => void
  setIsOwned: (isOwned: boolean) => void
  unselect: () => void
  tickBox: PIXI.Sprite
}

const loadChannelInShop = (resources: PIXI.IResourceDictionary, channelConfig: Channel) => {
  const channelInShop = new PIXI.Container() as ChannelInShopType

  let isSelected = false
  let channelName = new PIXI.Text(channelConfig.name, TEXT_STYLE.BODY_THAI)

  let channelBg = new PIXI.Sprite(resources['art/not-owned-channel-bg'].texture)

  channelName.anchor.set(0.5, 0)
  channelName.position.set(channelBg.width / 2, 5)
  channelInShop.addChild(channelName)

  channelBg.position.set(0, channelName.height + 8)
  channelInShop.addChild(channelBg)

  let audioIcon = channelConfig.audio
    ? new PIXI.Sprite(resources['cards/avail-volume-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  audioIcon.width = 30
  audioIcon.height = 30
  audioIcon.position.set(40, channelBg.y + 20)
  channelInShop.addChild(audioIcon)

  let visualIcon = channelConfig.visual
    ? new PIXI.Sprite(resources['cards/avail-img-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-img-big'].texture)
  visualIcon.width = 30
  visualIcon.height = 30
  visualIcon.position.set(audioIcon.x + audioIcon.width + 23, audioIcon.y)
  channelInShop.addChild(visualIcon)

  let textIcon = channelConfig.text
    ? new PIXI.Sprite(resources['cards/avail-text-big'].texture)
    : new PIXI.Sprite(resources['cards/not-avail-volume-big'].texture)
  textIcon.width = 30
  textIcon.height = 30
  textIcon.position.set(visualIcon.x + visualIcon.width + 23, audioIcon.y)
  channelInShop.addChild(textIcon)

  // OWNED OR NOT
  const moneyIcon = new PIXI.Sprite(resources['art/coin'].texture)
  const channelCost = new PIXI.Text(channelConfig.price.toString(), TEXT_STYLE.HEADER_THAI)
  moneyIcon.anchor.set(0.5, 0)
  channelCost.anchor.set(0.5, 0)

  moneyIcon.height = 45
  moneyIcon.width = 45

  moneyIcon.position.set(channelBg.width / 2, channelBg.height / 2 - 20)
  channelCost.position.set(channelBg.width / 2, moneyIcon.y + moneyIcon.height + 10)

  channelInShop.addChild(moneyIcon)
  channelInShop.addChild(channelCost)

  channelInShop.setIsOwned = (newIsOwned: boolean) => {
    if (newIsOwned) {
      moneyIcon.visible = false
      channelCost.visible = false
      tickBox.visible = false
      channelBg.texture = resources['art/owned-channel-bg'].texture
      channelName.style = TEXT_STYLE.BODY_THAI_CHARCOAL
      isSelected = false
    } else {
      moneyIcon.visible = true
      channelCost.visible = true
      tickBox.visible = true
      channelBg.texture = resources['art/not-owned-channel-bg'].texture
      channelName.style = TEXT_STYLE.BODY_THAI
    }
  }

  const tickBox = new PIXI.Sprite(resources['art/unchecked-channel'].texture)
  tickBox.buttonMode = true
  tickBox.interactive = true
  tickBox.anchor.set(0.5, 0)
  tickBox.position.set(channelInShop.width / 2, channelInShop.y + channelInShop.height / 2 + 100)
  channelInShop.addChild(tickBox)

  //getters and setters
  channelInShop.toggleIsSelected = async () => {
    isSelected = !isSelected
    toggleTickBox()
  }

  const toggleTickBox = () => {
    if (isSelected) {
      tickBox.texture = resources['art/checked-channel'].texture
    } else {
      tickBox.texture = resources['art/unchecked-channel'].texture
    }
  }

  channelInShop.getIsSelected = () => {
    return isSelected
  }

  channelInShop.unselect = () => {
    isSelected = false
  }

  channelInShop.getChannelConfig = () => {
    return channelConfig
  }

  channelInShop.tickBox = tickBox

  return channelInShop
}
export default loadChannelInShop
