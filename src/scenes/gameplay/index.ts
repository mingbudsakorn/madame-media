import * as PIXI from 'pixi.js'
import loadGameplayScene from './loadScene'
import { scenes } from '../../constants/scenes'

import { MONEY_CONFIG, PEOPLE_BAR_CONFIG, TIME_BAR_CONFIG } from '../../constants/gameConfig'

const GameplayScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const { scene, children } = loadGameplayScene(resources)
  const { finishButton, buyChannelButton, moneyBar, peopleBar, timeBar } = children

  // Buttons
  finishButton
    .on('mousedown', () => onClickFinishButton(setCurrentScene))
    .on('touchstart', () => onClickFinishButton(setCurrentScene))

  buyChannelButton
    .on('mousedown', () => onClickBuyChannel(setCurrentScene))
    .on('touchstart', () => onClickBuyChannel(setCurrentScene))

  const onClickBuyChannel = (setCurrentScene: (scene: number) => void) => {
    setCurrentScene(scenes.shop)
  }

  const onClickFinishButton = (setCurrentScene: (scene: number) => void) => {
    setCurrentScene(scenes.duel)
  }

  // Init
  moneyBar.setMoney(MONEY_CONFIG.INIT)
  peopleBar.setPeople(PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE, PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE)

  // Timing
  let timeLeft = TIME_BAR_CONFIG.TIME_PER_TURN
  setInterval(() => {
    if (timeLeft === 0) {
      clearInterval()
      return
    }
    timeBar.setTime(timeLeft - 1)
    timeLeft -= 1
  }, 1000)

  return scene
}

export default GameplayScene
