import * as PIXI from 'pixi.js'
import { CardType } from '../../../components/card'
import loadChannel from '../../../components/channel'
import { CHANNEL } from '../../../constants/channels'
import { TEXT_STYLE } from '../../../constants/style'
import { Channel, ChannelSlots } from '../../../types'

interface ChannelDeckType extends PIXI.Container {
  setOnSelect: (boolean) => void
  insertCard: (channel: string, card: CardType) => void
  setAvailableChannels: (channels: ChannelSlots) => void
}

export const loadChannelDeck = (
  resources: PIXI.IResourceDictionary,
  availableChannels: ChannelSlots,
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
  const firstChannelX = 37

  // ------test channel------- //
  const channel = loadChannel(resources, CHANNEL.SOCIAL_MEDIA, false)
  channel.position.set(firstChannelX, channelY)
  channelDeck.addChild(channel)

  const channel2 = loadChannel(resources, CHANNEL.MOUTH, false)
  channel2.position.set(channel.x + channel.width + channelPadding, channel.y)
  channelDeck.addChild(channel2)

  const channel3 = loadChannel(resources, CHANNEL.WEBPAGE, false)
  channel3.position.set(channel2.x + channel.width + channelPadding, channel.y)
  channelDeck.addChild(channel3)

  const channel4 = loadChannel(resources, CHANNEL.TV, false)
  channel4.position.set(channel3.x + channel.width + channelPadding, channel.y)
  channelDeck.addChild(channel4)

  const channel5 = loadChannel(resources, CHANNEL.RADIO, false)
  channel5.position.set(channel4.x + channel.width + channelPadding, channel.y)
  channelDeck.addChild(channel5)

  const channel6 = loadChannel(resources, CHANNEL.PUBLICATION, false)
  channel6.position.set(channel5.x + channel.width + channelPadding, channel.y)
  channelDeck.addChild(channel6)

  const channel7 = loadChannel(resources, CHANNEL.OUT_OF_HOME, false)
  channel7.position.set(channel6.x + channel.width + channelPadding, channel.y)
  channelDeck.addChild(channel7)
  // ------------------------- //

  // const polygonButtonLeft = new PIXI.Sprite(resources.polygonButtonLeft.texture)
  // polygonButtonLeft.position.set(53, 714)
  // channelDeck.addChild(polygonButtonLeft)

  // const polygonButtonRight = new PIXI.Sprite(resources.polygonButtonRight.texture)
  // polygonButtonRight.position.set(1486, 714)
  // channelDeck.addChild(polygonButtonRight)

  // Insert Card to Channel

  const channelMap = {
    SOCIAL_MEDIA: channel,
    MOUTH: channel2,
    WEBPAGE: channel3,
    TV: channel4,
    RADIO: channel5,
    PUBLICATION: channel6,
    OUT_OF_HOME: channel7,
  }

  Object.keys(channelMap).forEach((channelObject) => {
    channelMap[channelObject].interactive = true
    channelMap[channelObject].setIsAvailable(false)
  })

  const updateChannels = (availableChannels: ChannelSlots) => {
    if (availableChannels) {
      Object.keys(availableChannels).forEach((channel) => {
        if (availableChannels[channel].isOwned) {
          channelMap[channel].setIsAvailable(true)
        } else {
          channelMap[channel].setIsAvailable(false)
        }
      })
    }
  }

  channelDeck.setAvailableChannels = (availableChannels: ChannelSlots) => {
    updateChannels(availableChannels)
  }
  updateChannels(availableChannels)

  channelDeck.insertCard = (channel: string, card: CardType) => {
    const selectedChannel = channelMap[channel]
    selectedChannel.setCard(card)
  }

  channelDeck.setOnSelect = (select: boolean) => {
    if (select) {
      overlay.visible = true
    } else {
      overlay.visible = false
    }
  }

  return {
    scene: channelDeck,
    channels: {
      SOCIAL_MEDIA: channel,
      MOUTH: channel2,
      WEBPAGE: channel3,
      TV: channel4,
      RADIO: channel5,
      PUBLICATION: channel6,
      OUT_OF_HOME: channel7,
    },
  }
}

export default loadChannelDeck
