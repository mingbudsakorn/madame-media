import { Channel } from '../types'

interface ChannelConfigList {
  [key: string]: Channel
}

export const CHANNEL = {
  SOCIAL_MEDIA: {
    name: 'โซเชียลมีเดีย',
    audio: 1,
    visual: 1,
    text: 1,
    price: 500,
    percentage: 20,
  },
  MOUTH: {
    name: 'ปากต่อปาก',
    audio: 1,
    visual: 0,
    text: 0,
    price: 0,
    percentage: 3,
  },
  WEBPAGE: {
    name: 'เว็บเพจ',
    audio: 0,
    visual: 1,
    text: 1,
    price: 0,
    percentage: 5,
  },
  TV: {
    name: 'โทรทัศน์',
    audio: 1,
    visual: 1,
    text: 0,
    price: 300,
    percentage: 12,
  },
  RADIO: {
    name: 'วิทยุ',
    audio: 1,
    visual: 0,
    text: 0,
    price: 150,
    percentage: 5,
  },
  PUBLICATION: {
    name: 'สิ่งพิมพ์',
    audio: 0,
    visual: 1,
    text: 1,
    price: 0,
    percentage: 8,
  },
  OUT_OF_HOME: {
    name: 'สื่อนอกบ้าน',
    audio: 0,
    visual: 1,
    text: 1,
    price: 250,
    percentage: 10,
  },
} as ChannelConfigList

export const INIT_CHANNEL_LIST = [
  {
    channelConfig: CHANNEL.MOUTH,
    isAvailable: true
  },
  {
    channelConfig: CHANNEL.WEBPAGE,
    isAvailable: true
  },
  {
    channelConfig: CHANNEL.PUBLICATION,
    isAvailable: true
  },
  {
    channelConfig: CHANNEL.SOCIAL_MEDIA,
    isAvailable: false
  },
  {
    channelConfig: CHANNEL.TV,
    isAvailable: false
  },
  {
    channelConfig: CHANNEL.RADIO,
    isAvailable: false
  },
  {
    channelConfig: CHANNEL.OUT_OF_HOME,
    isAvailable: false
  },
]

