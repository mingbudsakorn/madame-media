import * as PIXI from 'pixi.js'
import { CardType } from '../../../components/card'
import loadChannel from '../../../components/channel'
import { CHANNEL_COUNT } from '../../../constants/channels'
import { TEXT_STYLE } from '../../../constants/style'
import { Channel } from '../../../types'

interface ChannelDeckType extends PIXI.Container {
  setOnSelect: (boolean) => void
  insertCard: (channel: string, card: CardType) => void
  initChannels: (allChannels: Channel[]) => void
  updateChannels: (availableChannels: Channel[]) => void
  clearCards: () => void
}

export const loadChannelDeck = (resources: PIXI.IResourceDictionary) => {
  const channelDeck = new PIXI.Container() as ChannelDeckType
  channelDeck.position.set(97, 488)

  const channelText = new PIXI.Text('ช่องทางสื่อ', TEXT_STYLE.SUBHEADER_THAI)
  channelDeck.addChild(channelText)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  overlay.position.set(-97, -488)
  overlay.visible = false
  channelDeck.addChild(overlay)

  const channelDeckBg = new PIXI.Sprite(resources['art/channel-deck-bg'].texture)
  channelDeckBg.position.set(0, channelText.y + channelText.height + 10)
  channelDeck.addChild(channelDeckBg)

  const channelPadding = 29
  const channelY = channelDeckBg.y + 10
  let prevChannelX = 37

  // Load channels
  const channelContainerArray = [] // might not be ordered
  const channelArray = [null, null, null, null, null, null, null]

  channelDeck.initChannels = (allChannels: Channel[]) => {
    for (let i = 0; i < CHANNEL_COUNT; i++) {
      const channelContainer = new PIXI.Container()
      channelContainer.x = prevChannelX
      channelContainer.y = channelY
      prevChannelX += channelPadding + 170
      channelDeck.addChild(channelContainer)
      channelContainerArray.push(channelContainer)
    }
    allChannels.forEach((channel) => {
      const channelContainer = channelContainerArray[channel.type]
      const channelObject = loadChannel(resources, channel, false)
      channelContainer.addChild(channelObject)
      channelObject.interactive = true
      channelArray[channel.type] = channelObject
    })
  }

  // Call this method at initialization
  channelDeck.updateChannels = (availableChannels: Channel[]) => {
    availableChannels.forEach((channelConfig) => {
      const channel = channelArray[channelConfig.type]

      channel.setIsAvailable(true)
    })
  }

  channelDeck.insertCard = (channelType: string, card: CardType) => {
    const selectedChannel = channelArray[channelType]
    selectedChannel.setCard(card)
  }

  channelDeck.clearCards = () => {
    channelArray.forEach((channelObject) => {
      channelObject.removeCard()
    })
  }

  channelDeck.setOnSelect = (select: boolean) => {
    if (select) {
      overlay.visible = true
    } else {
      overlay.visible = false
    }
  }

  overlay.interactive = true
  overlay
    .on('mousedown', () => {
      overlay.visible = false
    })
    .on('touchstart', () => {
      overlay.visible = false
    })

  return {
    scene: channelDeck,
    channelArray,
  }
}

export default loadChannelDeck
