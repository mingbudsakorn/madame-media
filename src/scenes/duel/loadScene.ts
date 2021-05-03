import * as PIXI from 'pixi.js'

// import { scenes } from '../../constants/scenes'
// import { PEOPLE_BAR_CONFIG } from '../../constants/gameConfig'

import loadChannelContainer from './components/channelContainer'
import loadPeopleBar from '../../components/peopleBar'
import loadSpecialActionContainer from './components/specialActionContainer'
// // // test
// // import loadChannel from '../../components/Channel.js'
// // import { CHANNEL } from '../../utils/channel.js'
// import { CARD } from '../../constants/card'

const emptySlot = {
  SOCIAL_MEDIA: null,
  MOUTH: null,
  WEBPAGE: null,
  TV: null,
  RADIO: null,
  PUBLICATION: null,
  OUT_OF_HOME: null,
}

const duelScene = new PIXI.Container()
duelScene.position.set(0, 0)
// let localGameState

const loadDuelScene = (resources: PIXI.IResourceDictionary) => {
  const duelBg = new PIXI.Sprite(resources['art/duel-bg'].texture)
  duelScene.addChild(duelBg)

  const duelCompareBg = new PIXI.Sprite(resources['art/duel-compare-bg'].texture)
  duelCompareBg.position.set(66, 296)
  duelScene.addChild(duelCompareBg)

  const opponentChannelContainer = loadChannelContainer(resources, emptySlot, false)
  opponentChannelContainer.position.set(66, 50)
  duelScene.addChild(opponentChannelContainer)

  const myChannelContainer = loadChannelContainer(resources, emptySlot, true)
  myChannelContainer.position.set(opponentChannelContainer.x, 645)
  duelScene.addChild(myChannelContainer)

  const peopleBar = loadPeopleBar(resources, 0, 0)
  peopleBar.position.set(435, 509)
  duelScene.addChild(peopleBar)

  const specialActionContainer = loadSpecialActionContainer(resources)
  specialActionContainer.position.set(65, 635)
  duelScene.addChild(specialActionContainer)
  specialActionContainer.visible = false

  return {
    scene: duelScene,
    children: {
      duelBg,
      duelCompareBg,
      opponentChannelContainer,
      myChannelContainer,
      peopleBar,
      specialActionContainer,
    },
  }
}

export default loadDuelScene
