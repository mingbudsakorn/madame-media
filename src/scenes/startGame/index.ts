import * as PIXI from 'pixi.js'
import loadStartGameScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'

const StartGameScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const startGameScene = loadStartGameScene(resources)

  const { createRoomButton, joinRoomButton, howToPlayButton, quitButton } = startGameScene.children
  const scene = startGameScene.scene as Scene

  // Buttons

  // createRoomButton
  //   .on('mousedown', () => onClickCreateRoom(setCurrentScene))
  //   .on('touchstart', () => onClickCreateRoom(setCurrentScene))
  // const onClickCreateRoom = (setCurrentScene: (scene: number) => void) => {
  //   setCurrentScene(scenes.createRoom)
  // }

  return scene
}

export default StartGameScene
