import { Channel, ChannelSlots } from '../types'
//test
import { CARD } from './card'

interface ChannelConfigList {
  [key: string]: Channel
}

export const CHANNEL_THAI_NAME_MAP = {
  โซเชียลมีเดีย: 'SOCIAL_MEDIA',
  ปากต่อปาก: 'MOUTH',
  เว็บเพจ: 'WEBPAGE',
  โทรทัศน์: 'TV',
  วิทยุ: 'RADIO',
  สิ่งพิมพ์: 'PUBLICATION',
  สื่อนอกบ้าน: 'OUT_OF_HOME',
}

const INIT_CHANNELS = {
  SOCIAL_MEDIA: false,
  MOUTH: false,
  WEBPAGE: false,
  TV: false,
  RADIO: false,
  PUBLICATION: false,
  OUT_OF_HOME: false,
}

export const initChannelSlot = () => {
  const channels = INIT_CHANNELS
  Object.keys(CHANNEL).forEach((channelKey) => {
    channels[channelKey] = {
      channelConfig: CHANNEL[channelKey],
      channelObject: null,
      isOwned: false,
    }
  })
  return (channels as unknown) as ChannelSlots
}

export const CHANNEL_ORDER = {
  โซเชียลมีเดีย: 0,
  ปากต่อปาก: 1,
  เว็บเพจ: 2,
  โทรทัศน์: 3,
  วิทยุ: 4,
  สิ่งพิมพ์: 5,
  สื่อนอกบ้าน: 6,
}

export const CHANNEL_COUNT = 7

export const CHANNEL = {
  SOCIAL_MEDIA: {
    name: 'โซเชียลมีเดีย',
    audio: 1,
    visual: 1,
    text: 1,
    price: 500,
    baseFactor: 20,
  },
  MOUTH: {
    name: 'ปากต่อปาก',
    audio: 1,
    visual: 0,
    text: 0,
    price: 0,
    baseFactor: 3,
  },
  WEBPAGE: {
    name: 'เว็บเพจ',
    audio: 0,
    visual: 1,
    text: 1,
    price: 0,
    baseFactor: 5,
  },
  TV: {
    name: 'โทรทัศน์',
    audio: 1,
    visual: 1,
    text: 0,
    price: 300,
    baseFactor: 12,
  },
  RADIO: {
    name: 'วิทยุ',
    audio: 1,
    visual: 0,
    text: 0,
    price: 150,
    baseFactor: 5,
  },
  PUBLICATION: {
    name: 'สิ่งพิมพ์',
    audio: 0,
    visual: 1,
    text: 1,
    price: 0,
    baseFactor: 8,
  },
  OUT_OF_HOME: {
    name: 'สื่อนอกบ้าน',
    audio: 0,
    visual: 1,
    text: 1,
    price: 250,
    baseFactor: 10,
  },
} as ChannelConfigList

export const INIT_CHANNEL_CARD_LIST = [
  {
    channelConfig: CHANNEL.MOUTH,
    isAvailable: true,
    // cardConfig: null,
    // test
    cardConfig: CARD[0].real,
  },
  {
    channelConfig: CHANNEL.WEBPAGE,
    isAvailable: true,
    // cardConfig: null,
    // test
    cardConfig: CARD[3].fake,
  },
  {
    channelConfig: CHANNEL.PUBLICATION,
    isAvailable: true,
    cardConfig: null,
  },
  {
    channelConfig: CHANNEL.SOCIAL_MEDIA,
    isAvailable: false,
    cardConfig: null,
  },
  {
    channelConfig: CHANNEL.TV,
    isAvailable: false,
    cardConfig: null,
  },
  {
    channelConfig: CHANNEL.RADIO,
    isAvailable: false,
    cardConfig: null,
  },
  {
    channelConfig: CHANNEL.OUT_OF_HOME,
    isAvailable: false,
    cardConfig: null,
  },
]
