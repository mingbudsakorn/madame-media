import * as PIXI from 'pixi.js'
import loadPeopleBar from '../../components/peopleBar'
import loadAvatar from './components/avatar'
import { TEXT_STYLE } from '../../constants/style'
import { PEOPLE_BAR_CONFIG } from '../../constants/gameConfig'
import { AVATAR } from '../../constants/avatar'

interface ResultType extends PIXI.Container {
  setResult: (title: string, description: string) => void
}

const endGameScene = new PIXI.Container()
endGameScene.position.set(0, 0)

const loadEndGameScene = (resources: PIXI.IResourceDictionary) => {
  const bg = new PIXI.Sprite(resources['background/start-game-bg'].texture)
  bg.position.set(0, 0)
  endGameScene.addChild(bg)

  const smallBlueCircle = new PIXI.Sprite(resources['art/small-blue-circle'].texture)
  smallBlueCircle.position.set(112, 44)
  endGameScene.addChild(smallBlueCircle)

  const smallPinkCircle = new PIXI.Sprite(resources['art/small-pink-circle'].texture)
  smallPinkCircle.position.set(1582, 44)
  endGameScene.addChild(smallPinkCircle)

  const peopleBar = loadPeopleBar(
    resources,
    PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE,
    PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE,
  )
  peopleBar.position.set(435, 74)
  endGameScene.addChild(peopleBar)

  const player1 = loadAvatar(resources, AVATAR.man1, 'โจนาทาน')
  player1.position.set(224.5, 82)
  endGameScene.addChild(player1)

  const player2 = loadAvatar(resources, AVATAR.woman4, 'มิเชล')
  player2.position.set(1694.5, 82)
  endGameScene.addChild(player2)

  const modalBg = new PIXI.Sprite(resources['art/end-game-modal-bg'].texture)
  modalBg.anchor.set(0.5, 0)
  modalBg.position.set(bg.width / 2, 373)
  endGameScene.addChild(modalBg)

  const titleBg = new PIXI.Sprite(resources['art/end-game-title-bg'].texture)
  titleBg.anchor.set(0.5, 0)
  titleBg.position.set(bg.width / 2, 293)
  endGameScene.addChild(titleBg)

  const result = new PIXI.Container() as ResultType
  endGameScene.addChild(result)

  const titleText = new PIXI.Text('ผล', TEXT_STYLE.TITLE_THAI)
  titleText.anchor.set(0.5)
  titleText.position.set(bg.width / 2, titleBg.y + titleBg.height / 2)
  result.addChild(titleText)

  const textStyle = new PIXI.TextStyle({
    fontFamily: 'Chonburi',
    fontSize: 36,
    align: 'center',
    leading: 10,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: modalBg.width - 100,
  })

  const descriptionText = new PIXI.Text('คำอธิบาย', textStyle)
  descriptionText.anchor.set(0.5)
  descriptionText.position.set(bg.width / 2, modalBg.y + (modalBg.height + titleBg.height / 2) / 2 - 25)
  result.addChild(descriptionText)

  // ----------------------button---------------------- //
  const goBackHomeButton = new PIXI.Sprite(resources['art/go-back-home-btn'].texture)
  goBackHomeButton.anchor.set(0.5, 0)
  goBackHomeButton.position.set(bg.width / 2, 940)
  goBackHomeButton.interactive = true
  goBackHomeButton.buttonMode = true
  endGameScene.addChild(goBackHomeButton)
  // -------------------------------------------------- //

  result.setResult = (title: string, description: string) => {
    titleText.text = title
    descriptionText.text = description
  }

  return {
    scene: endGameScene,
    children: {
      bg,
      goBackHomeButton,
      result,
      player1,
      player2,
      peopleBar
    },
  }
}

export default loadEndGameScene
