import * as PIXI from 'pixi.js'
import loadChannel from '../../../components/channel'
import loadCard from '../../../components/card'
import { CHANNEL } from '../../../constants/channels'
import { TEXT_STYLE } from '../../../constants/style'

interface ChannelDeckType extends PIXI.Container {
  setChannel: (channelList) => void
}

export const loadChannelDeck = (resources: PIXI.IResourceDictionary) => {
  const channelDeck = new PIXI.Container() as ChannelDeckType
  channelDeck.position.set(97, 532)

  const channelText = new PIXI.Text('ช่องทางสื่อ', TEXT_STYLE.SUBHEADER_THAI)
  channelDeck.addChild(channelText)

  const channelDeckBg = new PIXI.Sprite(resources['art/channel-deck-bg'].texture)
  channelDeckBg.position.set(0, channelText.y + channelText.height + 10)
  channelDeck.addChild(channelDeckBg)

  const channelPadding = 19
  const channelY = channelDeckBg.y + 10
  const firstChannelX = 37

  const channels = new PIXI.Container()
  channels.position.set(firstChannelX,channelY)
  channelDeck.addChild(channels)

  channelDeck.setChannel = (channelCardList) => {
    let prevX = 0
    channels.removeChildren()
    for (let i in channelCardList) {
      let channelConfig = channelCardList[i].channelConfig
      let isAvailable = channelCardList[i].isAvailable
      let cardConfig = channelCardList[i].cardConfig
      let channel = loadChannel(resources, channelConfig, isAvailable)
      channel.x = i=='0'? prevX: prevX + channel.width + channelPadding
      prevX = channel.x
      channels.addChild(channel)

      
      if (cardConfig != null) {
        let card = loadCard(resources,cardConfig)
        card.height = channel.getHeight()
        card.width = channel.getWidth()
        card.x = channel.x
        let channelBg = channel.getBg()
        card.y = channelBg.y
        channels.addChild(card)
      }

      // if (cardConfigList[i] != null) {
      //   let card = loadCard(resources,cardConfigList[i])
      //   card.height = channel.getHeight()
      //   card.width = channel.getWidth()
      //   card.x = channel.x
      //   let channelBg = channel.getBg()
      //   card.y = channelBg.y
      //   channels.addChild(card)
      // }
    }
  }

  return channelDeck
}

export default loadChannelDeck
