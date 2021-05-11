import * as PIXI from 'pixi.js'
import loadEndGameScene from './loadScene'
import { GameState, Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { RESULT } from '../../constants/gameConfig'
import { gameState as initialState } from '../../constants/initialState'
import axios from 'axios'

const url = process.env.BACKEND_URL

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

  const { player1: player1Info, player2: player2Info } = gameState

  const goHome = () => {
    setCurrentScene(scenes.startGame, initialState, nextPossibleScenes[scenes.startGame])
  }

  goBackHomeButton.on('mousedown', goHome).on('touchstart', goHome)

  scene.onAppear = async () => {
    player1.setAvatarImg(player1Info.avatar)
    player1.setAvatarName(player1Info.name)
    player2.setAvatarImg(player2Info.avatar)
    player2.setAvatarName(player2Info.name)

    const res = await axios.get(
      `${url}/state?gameId=${gameState.gameId}&playerId=${gameState.playerId}`,
    )
    if (res && res.data) {
      console.log(res.data)
      const { people, opponent } = res.data
      peopleBar.setPeople(people, opponent)

      if (people > opponent) {
        // I win
        result.setResult(RESULT.WIN.title, RESULT.WIN.description)
      } else if (people < opponent) {
        // I lose
        result.setResult(RESULT.LOSE.title, RESULT.LOSE.description)
      } else {
        // draw
        result.setResult(RESULT.DRAW.title, RESULT.DRAW.description)
      }
    }
  }

  return scene
}

export default EndGameScene
