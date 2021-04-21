import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../constants/style'
import { AVATAR, AVATAR_BG } from '../../constants/avatar'
import loadAvatar from '../../components/avatar'

interface TurnTextType extends PIXI.Text {
  setTurn: (turnNumber: number) => void
}

interface RoomIdType extends PIXI.Text {
  setRoomId: (id: string) => void
}

const gameLobbyScene = new PIXI.Container()
gameLobbyScene.position.set(0, 0)

const loadGameLobbyScene = (resources: PIXI.IResourceDictionary) => {
  const bg = new PIXI.Sprite(resources['background/lobby-bg'].texture)
  bg.position.set(0, 0)
  gameLobbyScene.addChild(bg)

  const welcome = new PIXI.Text('ยินดีต้อนรับ', TEXT_STYLE.SUPER_HEADER_THAI)
  welcome.anchor.set(0.5, 0)
  welcome.position.set(bg.width / 2, 60)
  gameLobbyScene.addChild(welcome)

  const codeText = new PIXI.Text('รหัสเกม', TEXT_STYLE.SUBHEADER_THAI_CHARCOAL)
  codeText.position.set(679, 163)
  gameLobbyScene.addChild(codeText)

  const roomId = new PIXI.Text('123456', TEXT_STYLE.SUBHEADER_THAI_RED_PURPLE) as RoomIdType
  roomId.position.set(codeText.x + codeText.width + 10, codeText.y)
  gameLobbyScene.addChild(roomId)

  const turnNumberText = new PIXI.Text('จำนวนรอบ', TEXT_STYLE.SUBHEADER_THAI_CHARCOAL)
  turnNumberText.position.set(roomId.x + 145, codeText.y)
  gameLobbyScene.addChild(turnNumberText)

  const turnText = new PIXI.Text('10', TEXT_STYLE.SUBHEADER_THAI_RED_PURPLE)
  turnText.position.set(turnNumberText.x + turnNumberText.width + 10, codeText.y)
  gameLobbyScene.addChild(turnText)

  const myAvatar = loadAvatar(resources, AVATAR_BG.myAvatarBg, AVATAR.man1, 'ซงจุงกิ')
  myAvatar.position.set(230, 275)
  gameLobbyScene.addChild(myAvatar)

  const opponentAvatar = loadAvatar(resources, AVATAR_BG.opponentAvatarBg, AVATAR.unknown, '???')
  opponentAvatar.position.set(1190, myAvatar.y)
  gameLobbyScene.addChild(opponentAvatar)

  const selectTurn = new PIXI.Container()
  gameLobbyScene.addChild(selectTurn)

  // ----------------------button---------------------- //
  const startGameButton = new PIXI.Sprite(resources['art/start-game-btn'].texture)
  startGameButton.anchor.set(0.5, 0)
  startGameButton.position.set(bg.width / 2, 940)
  startGameButton.interactive = true
  gameLobbyScene.addChild(startGameButton)

  const lobbyTurnBg = new PIXI.Sprite(resources['art/lobby-turn-bg'].texture)
  lobbyTurnBg.anchor.set(0.5)
  lobbyTurnBg.position.set(startGameButton.x, startGameButton.y - 80)
  selectTurn.addChild(lobbyTurnBg)

  const leftButton = new PIXI.Sprite(resources['art/button-polygon-left'].texture)
  leftButton.scale.set(0.7)
  leftButton.anchor.set(0.5)
  leftButton.position.set(lobbyTurnBg.x - lobbyTurnBg.width / 2 - 50, lobbyTurnBg.y)
  leftButton.interactive = true
  selectTurn.addChild(leftButton)

  const rightButton = new PIXI.Sprite(resources['art/button-polygon-right'].texture)
  rightButton.scale.set(0.7)
  rightButton.anchor.set(0.5)
  rightButton.position.set(lobbyTurnBg.x + lobbyTurnBg.width / 2 + 50, leftButton.y)
  rightButton.interactive = true
  selectTurn.addChild(rightButton)

  const backButton = new PIXI.Sprite(resources['art/back-button'].texture)
  backButton.interactive = true
  backButton.position.set(58, 58)
  gameLobbyScene.addChild(backButton)

  // -------------------------------------------------- //

  const waitingText = new PIXI.Text(
    'ระบบกำลังนำคุณเข้าสู่หน้าเริ่มเกม...',
    TEXT_STYLE.SUBHEADER_THAI_CHARCOAL,
  )
  waitingText.anchor.set(0.5)
  waitingText.position.set(startGameButton.x, startGameButton.y + startGameButton.height / 2)
  waitingText.visible = false
  gameLobbyScene.addChild(waitingText)

  const turn = new PIXI.Text('จำนวนรอบ: 10', TEXT_STYLE.SUBHEADER_THAI_RED_PURPLE) as TurnTextType
  turn.anchor.set(0.5)
  turn.position.set(lobbyTurnBg.x, lobbyTurnBg.y)
  selectTurn.addChild(turn)

  //methods
  turn.setTurn = (turnNumber: number) => {
    turn.text = 'จำนวนรอบ: ' + turnNumber
    turnText.text = turnNumber.toString()
  }

  roomId.setRoomId = (id: string) => {
    roomId.text = id
  }

  // when click start game
  // selectTurn.visible = false
  // startGameButton.visible = false
  // backButton.visible = false
  // waitingText.visible = true

  return {
    scene: gameLobbyScene,
    children: {
      bg,
      welcome,
      codeText,
      roomId,
      turnNumberText,
      turnText,
      turn,
      myAvatar,
      opponentAvatar,
      leftButton,
      rightButton,
      waitingText,
      selectTurn,
    },
  }
}

export default loadGameLobbyScene
