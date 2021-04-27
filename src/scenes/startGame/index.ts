import * as PIXI from 'pixi.js'
import loadStartGameScene from './loadScene'
import { GameState, Scene, SceneWrapper } from '../../types'
import { scenes } from '../../constants/scenes'
import { gameState as initialState } from '../../constants/initialState'

const StartGameScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number, gameState: GameState, sceneObject: Scene) => void,
) => {
  const startGameScene = loadStartGameScene(resources)
  const scene = startGameScene.scene as Scene
  // Init
  let nextPossibleScenes
  scene.setNextPossibleScenes = (scenes) => {
    nextPossibleScenes = scenes
  }
  let gameState = initialState
  scene.setGameState = (settingState: GameState) => {
    gameState = settingState
  }

  const { createRoomButton, joinRoomButton, howToPlayButton } = startGameScene.children

  // Buttons
  createRoomButton
    .on('mousedown', () => onClickCreateRoom())
    .on('touchstart', () => onClickCreateRoom())
  joinRoomButton.on('mousedown', () => onClickJoinRoom()).on('touchstart', () => onClickJoinRoom())

  const onClickCreateRoom = () => {
    setCurrentScene(scenes.createRoom, gameState, nextPossibleScenes[scenes.createRoom])
  }
  const onClickJoinRoom = () => {
    setCurrentScene(scenes.joinRoom, gameState, nextPossibleScenes[scenes.joinRoom])
  }

  return scene
}

export default StartGameScene
