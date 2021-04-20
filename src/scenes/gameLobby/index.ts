import * as PIXI from 'pixi.js'
import loadGameLobbyScene from './loadScene'
import { Scene } from '../../types'
import { scenes } from '../../constants/scenes'

const GameLobbyScene = (
  resources: PIXI.IResourceDictionary,
  setCurrentScene: (scene: number) => void,
) => {
  const gameLobbyScene = loadGameLobbyScene(resources)

  const { roomId, turn, leftButton, rightButton } = gameLobbyScene.children
  const scene = gameLobbyScene.scene as Scene

  // Buttons

  turn.setTurn(20)
  roomId.setRoomId('76009')


  return scene
}

export default GameLobbyScene
