import * as PIXI from 'pixi.js'
import loadDuelScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { OVERLAY } from '../../constants/specialAction'
import { gameState as initGameState } from '../../constants/initialState'
import loadCard from '../../components/card'
import { CARD } from '../../constants/card'
import { SPECIAL_ACTION } from '../../constants/gameConfig'

import socket from '../../socket'

const mockOpponentCard = (resources: PIXI.IResourceDictionary) => {
  const card1 = loadCard(resources, CARD[12])
  const card2 = loadCard(resources, CARD[8])
  return {
    SOCIAL_MEDIA: null,
    MOUTH: card1,
    WEBPAGE: null,
    TV: card2,
    RADIO: null,
    PUBLICATION: null,
    OUT_OF_HOME: null,
  }
}

const mockSummary = () => {
  return {
    SOCIAL_MEDIA: null,
    MOUTH: OVERLAY.expose,
    WEBPAGE: null,
    TV: OVERLAY.factCheck,
    RADIO: null,
    PUBLICATION: null,
    OUT_OF_HOME: null,
  }
}

const DuelScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const duelScene = loadDuelScene(resources)
  const scene = duelScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initGameState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  // DUEL RESULTS
  socket.on('battle-result', (res) => {
    console.log(res)
  })

  const {
    duelCompareBg,
    opponentChannelContainer,
    myChannelContainer,
    specialActionContainer,
    summaryModal,
  } = duelScene.children

  scene.onAppear = () => {
    // const channelPadding = 25
    // let channelCount = 0
    // setInterval(() => {
    //   if (channelCount >= 6) {
    //     clearInterval()
    //     duelCompareBg.visible = false
    //     myChannelContainer.visible = false
    //     // example
    //     // specialActionContainer.moneyBar.setMoney(1000)
        // specialActionContainer.visible = true
    //     // setCurrentScene(scenes.gameplay)
    //     return
    //   }
    //   channelCount += 1
    //   duelCompareBg.x = duelCompareBg.x + duelCompareBg.width + channelPadding
    // }, 2000)

    const { cards } = gameState

    myChannelContainer.setChannels(cards)
    opponentChannelContainer.setChannels(mockOpponentCard(resources))

    //set summary
    myChannelContainer.setSummary(cards, mockSummary())
    opponentChannelContainer.setSummary(mockOpponentCard(resources), mockSummary())
    summaryModal.visible = true
  }

  return scene
}

export default DuelScene
