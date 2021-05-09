import * as PIXI from 'pixi.js'
import { CardType } from '../../../components/card'
import loadChannel from '../../../components/channel'
import { CHANNEL, CHANNEL_COUNT, CHANNEL_ORDER } from '../../../constants/channels'
import { TEXT_STYLE } from '../../../constants/style'
import { Channel, ChannelSlots } from '../../../types'

interface ChannelDeckType extends PIXI.Container {
  setOnSelect: (boolean) => void
  insertCard: (channel: string, card: CardType) => void
  updateChannels: (availableChannels: Channel[]) => void
}

export const loadChannelDeck = (
  resources: PIXI.IResourceDictionary,
  availableChannels: Channel[],
) => {
  const channelDeck = new PIXI.Container() as ChannelDeckType
  channelDeck.position.set(97, 532)

  const channelText = new PIXI.Text('ช่องทางสื่อ', TEXT_STYLE.SUBHEADER_THAI)
  channelDeck.addChild(channelText)

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  overlay.position.set(-97, -532)
  overlay.visible = false
  channelDeck.addChild(overlay)

  const channelDeckBg = new PIXI.Sprite(resources['art/channel-deck-bg'].texture)
  channelDeckBg.position.set(0, channelText.y + channelText.height + 10)
  channelDeck.addChild(channelDeckBg)

  const channelPadding = 19
  const channelY = channelDeckBg.y + 10
  let prevChannelX = 37

  // Load channels
  const channelContainerArray = []
  Object.keys(CHANNEL).forEach((channelKey) => {
    const channelConfig = CHANNEL[channelKey]
    const channelContainer = loadChannel(resources, channelConfig, false)
    channelContainer.x = prevChannelX
    channelContainer.y = channelY
    prevChannelX += channelPadding
    channelDeck.addChild(channelContainer)
    channelContainerArray.push(channelContainer)
  })

  channelDeck.updateChannels = (availableChannels: Channel[]) => {
    availableChannels.forEach((channelConfig) => {
      const order = CHANNEL_ORDER[channelConfig.name]
      const channel = channelContainerArray[order]

      channel.setIsAvailable(true)
    })
  }

  channelDeck.insertCard = (channelName: string, card: CardType) => {
    const order = CHANNEL_ORDER[channelName]
    const selectedChannel = channelContainerArray[order]
    selectedChannel.setCard(card)
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
  }
}

export default loadChannelDeck
