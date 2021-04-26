import * as PIXI from 'pixi.js'
import { Channel } from '../../../types'
import { TEXT_STYLE } from '../../../constants/style'

interface channelInShopType extends PIXI.Container{

}
export const loadChannelInShop = (
  resources: PIXI.IResourceDictionary, 
  channelConfig: Channel, 
  isOwned: boolean) => 
  {
  const channelInShop = new PIXI.Container  as channelInShopType

  let channelName = new PIXI.Text(
    channelConfig.name,
    isOwned ? TEXT_STYLE.BODY_THAI_CHARCOAL : TEXT_STYLE.BODY_THAI,)  
  
  let channelBg = isOwned
  ? new PIXI.Sprite(resources['art/owned-channel-bg'].texture)
  : new PIXI.Sprite(resources['art/not-owned-channel-bg'].texture)

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

  return channelInShop

  }

export default loadChannelInShop