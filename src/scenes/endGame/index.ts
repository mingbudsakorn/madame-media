import * as PIXI from 'pixi.js'
import loadEndGameScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { RESULT } from '../../constants/gameConfig'
import { AVATAR } from '../../constants/avatar'
import { gameState as initialState } from '../../constants/initialState'

const EndGameScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const endGameScene = loadEndGameScene(resources)
  const scene = endGameScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initialState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const { result, goBackHomeButton, player1, player2, peopleBar } = endGameScene.children

  result.setResult(RESULT.DRAW.title, RESULT.DRAW.description)
  peopleBar.setPeople(400, 400)
  player1.setAvatarImg(AVATAR.man2)
  player1.setAvatarName('ซงจุงกิ')

  return scene
}

export default EndGameScene
