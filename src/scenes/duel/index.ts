import * as PIXI from 'pixi.js'
import loadDuelScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { SPECIAL_ACTION } from '../../constants/gameConfig'

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
  const duelScene = loadDuelScene(resources)

  const { duelCompareBg, opponentChannelContainer, myChannelContainer, specialActionContainer } = duelScene.children
  const scene = duelScene.scene as Scene

  // Init channels
  myChannelContainer.setChannels(mockCardList)
  opponentChannelContainer.setChannels(mockCardList2)

  scene.onAppear = () => {
    const channelPadding = 25
    let channelCount = 0
    setInterval(() => {
      if (channelCount >= 6) {
        clearInterval()
        duelCompareBg.visible = false
        myChannelContainer.visible = false
        // example
        // specialActionContainer.moneyBar.setMoney(1000)
        specialActionContainer.visible = true
        // setCurrentScene(scenes.gameplay)
        return
      }
      channelCount += 1
      duelCompareBg.x = duelCompareBg.x + duelCompareBg.width + channelPadding
    }, 1000)
  }

  return scene
}

export default DuelScene
