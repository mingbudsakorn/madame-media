import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../constants/style'

const startGameScene = new PIXI.Container()
startGameScene.position.set(0, 0)

const loadStartGameScene = (resources: PIXI.IResourceDictionary) => {
  const bg = new PIXI.Sprite(resources['background/start-game-bg'].texture)
  bg.position.set(0, 0)
  startGameScene.addChild(bg)

  const title = new PIXI.Text('มาดามมีเดีย', TEXT_STYLE.TITLE_THAI)
  title.anchor.set(0.5, 0)
  title.position.set(bg.width / 2, 200)
  startGameScene.addChild(title)

  const startGameBoarder = new PIXI.Sprite(resources['art/start-game-boarder'].texture)
  startGameBoarder.anchor.set(0.5, 0)
  startGameBoarder.position.set(bg.width / 2, 440)
  startGameScene.addChild(startGameBoarder)

  const startGameText = new PIXI.Text('เริ่มเกม', TEXT_STYLE.SUBHEADER_THAI)
  startGameText.anchor.set(0.5)
  startGameText.position.set(bg.width / 2, startGameBoarder.y + 20)
  startGameScene.addChild(startGameText)

  // ----------------------button---------------------- //
  const createRoomButton = new PIXI.Sprite(resources['art/create-room-btn'].texture)
  createRoomButton.position.set(749, startGameBoarder.y + 53)
  createRoomButton.interactive = true
  startGameScene.addChild(createRoomButton)

  const joinRoomButton = new PIXI.Sprite(resources['art/join-room-btn'].texture)
  joinRoomButton.position.set(createRoomButton.x, createRoomButton.y + createRoomButton.height + 20)
  joinRoomButton.interactive = true
  startGameScene.addChild(joinRoomButton)

  const howToPlayButton = new PIXI.Sprite(resources['art/how-to-play-btn'].texture)
  howToPlayButton.position.set(createRoomButton.x, joinRoomButton.y + joinRoomButton.height + 40)
  howToPlayButton.interactive = true
  startGameScene.addChild(howToPlayButton)

  const quitButton = new PIXI.Sprite(resources['art/quit-btn'].texture)
  quitButton.position.set(createRoomButton.x, howToPlayButton.y + howToPlayButton.height + 20)
  quitButton.interactive = true
  startGameScene.addChild(quitButton)
  // -------------------------------------------------- //

  return {
    scene: startGameScene,
    children: {
      bg,
      createRoomButton,
      joinRoomButton,
      howToPlayButton,
      quitButton,
    },
  }
}

export default loadStartGameScene
