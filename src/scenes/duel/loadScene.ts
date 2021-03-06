import * as PIXI from 'pixi.js'

// import { scenes } from '../../constants/scenes'
// import { PEOPLE_BAR_CONFIG } from '../../constants/gameConfig'

import loadChannelContainer from './components/channelContainer'
import loadPeopleBar from '../../components/peopleBar'
import loadSpecialActionContainer from './components/specialActionContainer'
import loadSummaryModal from './components/summaryModal'
import loadModal from '../../components/modal'

const duelScene = new PIXI.Container()
duelScene.position.set(0, 0)
// let localGameState

const loadDuelScene = (resources: PIXI.IResourceDictionary) => {
  const duelBg = new PIXI.Sprite(resources['art/duel-bg'].texture)
  duelScene.addChild(duelBg)

  const specialActionContainer = loadSpecialActionContainer(resources)
  specialActionContainer.position.set(65, 635)
  duelScene.addChild(specialActionContainer)
  specialActionContainer.visible = false

  const duelCompareBg = new PIXI.Sprite(resources['art/duel-compare-bg'].texture)
  duelCompareBg.position.set(66, 296)
  duelScene.addChild(duelCompareBg)

  const opponentChannelContainer = loadChannelContainer(resources, false, specialActionContainer)
  opponentChannelContainer.position.set(66, 50)
  duelScene.addChild(opponentChannelContainer)

  const myChannelContainer = loadChannelContainer(resources, true, specialActionContainer)
  myChannelContainer.position.set(opponentChannelContainer.x, 645)
  duelScene.addChild(myChannelContainer)

  const peopleBar = loadPeopleBar(resources, 0, 0)
  peopleBar.position.set(435, 509)
  duelScene.addChild(peopleBar)

  const summaryModal = loadSummaryModal(resources)
  duelScene.addChild(summaryModal)
  summaryModal.visible = false

  const waitingModal = loadModal(resources)
  duelScene.addChild(waitingModal)
  waitingModal.setText('กรุณารอสักครู่', 'กรุณารออีกฝั่ง')
  waitingModal.setShowAcceptButton(false)
  waitingModal.setClosable(false)

  const notEnoughMoneyModal = loadModal(resources)
  duelScene.addChild(notEnoughMoneyModal)
  notEnoughMoneyModal.setText('เกิดข้อผิดพลาด', 'คุณมีจำนวนเงินไม่เพียงพอ')
  notEnoughMoneyModal.setShowAcceptButton(true)
  notEnoughMoneyModal.setClosable(true)

  return {
    scene: duelScene,
    children: {
      duelBg,
      duelCompareBg,
      opponentChannelContainer,
      myChannelContainer,
      peopleBar,
      specialActionContainer,
      summaryModal,
      waitingModal,
      notEnoughMoneyModal,
    },
  }
}

export default loadDuelScene
