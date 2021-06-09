import * as PIXI from 'pixi.js'
import loadEndGameScene from './loadScene'
import { GameState, Scene } from '../../types'
import { scenes } from '../../constants/scenes'
import { RESULT } from '../../constants/gameConfig'
import { gameState as initialState } from '../../constants/initialState'

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

  const goHome = () => {
    window.location.reload()
    // setCurrentScene(scenes.startGame, initialState, nextPossibleScenes[scenes.startGame])
  }

  goBackHomeButton.on('mousedown', goHome).on('touchstart', goHome)

  scene.onAppear = async () => {
    const { winner, playerId, people } = gameState

    player1.setAvatarImg(gameState.player1.avatar)
    player1.setAvatarName(gameState.player1.name)
    player2.setAvatarImg(gameState.player2.avatar)
    player2.setAvatarName(gameState.player2.name)

    if (winner) {
      // eslint-disable-next-line
      if (winner.id === playerId) {
        result.setResult(RESULT.WIN.title, RESULT.WIN.description)
      } else {
        result.setResult(RESULT.LOSE.title, RESULT.LOSE.description)
      }
    } else {
      result.setResult(RESULT.DRAW.title, RESULT.DRAW.description)
    }

    let peopleNumber = 0
    let neutralNumber = 0
    let opponentNumber = 0
    Object.keys(people).forEach((key) => {
      if (key === playerId) {
        peopleNumber = people[key]
      } else if (key === 'neutral') {
        neutralNumber = people[key]
      } else {
        opponentNumber = people[key]
      }
    })
    peopleBar.setPeople(peopleNumber, opponentNumber)
  }

  return scene
}

export default EndGameScene
