import * as PIXI from 'pixi.js'
import loadChannelInShop from './channelnShop'

interface channelShopType extends PIXI.Container {
  setChannelShop: (channelShopList) => void
}

export const loadChannelShop = (resources: PIXI.IResourceDictionary) => {
  const channelShopContainer = new PIXI.Container as channelShopType

  channelShopContainer.setChannelShop = (channelShopList) => {
    let prevX = 0 
    const padding = 20 
    for(let i in channelShopList){
      let channelConfig = channelShopList[i].channelConfig
      let isOwned = channelShopList[i].isOwned
      let channel = loadChannelInShop(resources,channelConfig,isOwned)
      channel.x = i=='0'? prevX: prevX + channel.width + padding
      prevX = channel.x
      channelShopContainer.addChild(channel)
    }
  }
  return channelShopContainer
}

export default loadChannelShop