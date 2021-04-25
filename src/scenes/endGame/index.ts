import * as PIXI from 'pixi.js'
import loadEndGameScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { RESULT } from '../../constants/gameConfig'
import { AVATAR } from '../../constants/avatar'

const EndGameScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const endGameScene = loadEndGameScene(resources)

  const { result, goBackHomeButton, player1, player2, peopleBar } = endGameScene.children
  const scene = endGameScene.scene as Scene

  result.setResult(RESULT.DRAW.title, RESULT.DRAW.description)
  peopleBar.setPeople(400, 400)
  player1.setAvatarImg(AVATAR.man2)
  player1.setAvatarName('ซงจุงกิ')

  return scene
}

export default EndGameScene
