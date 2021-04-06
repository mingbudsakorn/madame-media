import * as PIXI from 'pixi.js'
import loadDuelScene from './loadScene'

const mockCardList = [
  {
    channel: 0,
    card: 1,
  },
  {
    channel: 1,
    card: 0,
  },
]
const mockCardList2 = [
  {
    channel: 1,
    card: 0,
  },
  {
    channel: 4,
    card: 1,
  },
]

const DuelScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const { scene, children } = loadDuelScene(resources)

  const { duelCompareBg, opponentChannelContainer, myChannelContainer } = children

  // Init channels
  myChannelContainer.setChannels(mockCardList)
  opponentChannelContainer.setChannels(mockCardList2)

  const channelPadding = 25
  let channelCount = 0
  setInterval(() => {
    if (channelCount >= 6) {
      clearInterval()
      return
    }
    channelCount += 1
    duelCompareBg.x = duelCompareBg.x + duelCompareBg.width + channelPadding
  }, 1000)

  return scene
}

export default DuelScene
