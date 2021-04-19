import * as PIXI from 'pixi.js'
import loadGameplayScene from './loadScene'
import { scenes } from '../../constants/scenes'

import { MONEY_CONFIG, PEOPLE_BAR_CONFIG, TIME_BAR_CONFIG } from '../../constants/gameConfig'
import { Scene } from '../../types'
import { AVATAR } from '../../constants/avatar'
import { CHANNEL, INIT_CHANNEL_LIST } from '../../constants/channels'

const GameplayScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const gameplayScene = loadGameplayScene(resources)
  const { finishButton, buyChannelButton, moneyBar, peopleBar, timeBar, player1, player2, turnText, channelDeck } = gameplayScene.children
  const scene = gameplayScene.scene as Scene

  let timer

  // Buttons
  finishButton
    .on('mousedown', () => onClickFinishButton(setCurrentScene))
    .on('touchstart', () => onClickFinishButton(setCurrentScene))
  const onClickFinishButton = (setCurrentScene: (scene: number) => void) => {
    clearInterval(timer)
    setCurrentScene(scenes.duel)
  }

  // buyChannelButton
  //   .on('mousedown', () => onClickBuyChannel(setCurrentScene))
  //   .on('touchstart', () => onClickBuyChannel(setCurrentScene))

  // const onClickBuyChannel = (setCurrentScene: (scene: number) => void) => {
  //   setCurrentScene(scenes.shop)
  // }

  // Init
  moneyBar.setMoney(MONEY_CONFIG.INIT)
  peopleBar.setPeople(PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE, PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE)
  // example to set turnText
  // turnText.setTurnText(2)
  
  //example to set avatar
  // player1.setAvatarName('พอล')
  // player1.setAvatarImg(AVATAR.man2)
  
  channelDeck.setChannel(INIT_CHANNEL_LIST)

  scene.onAppear = () => {
    // Timing
    let timeLeft = TIME_BAR_CONFIG.TIME_PER_TURN
    timer = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(timer)
        return
      }
      timeBar.setTime(timeLeft - 1)
      timeLeft -= 1
    }, 1000)
  }

  return scene
}

export default GameplayScene
