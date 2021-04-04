import { textStyle } from '../../../utils/style.js'

const loadPeopleBar = (app, resources) => {
  const peopleBar = new PIXI.Container()
  peopleBar.position.set(435, 74)

  const innerPeopleBar = new PIXI.Sprite(resources.innerPeopleBar.texture)
  peopleBar.addChild(innerPeopleBar)

  const player1PeopleBar = new PIXI.Sprite(resources.player1PeopleBar.texture)
  player1PeopleBar.position.set(5,5)
  peopleBar.addChild(player1PeopleBar)

  const player2PeopleBar = new PIXI.Sprite(resources.player2PeopleBar.texture)
  player2PeopleBar.position.set(1045,5)
  player2PeopleBar.anchor.set(1,0)
  peopleBar.addChild(player2PeopleBar)

  const peopleBarBoarder = new PIXI.Sprite(resources.peopleBarBoarder.texture)
  peopleBar.addChild(peopleBarBoarder)

  // set instance
  peopleBar.player1 = player1PeopleBar
  peopleBar.player2 = player2PeopleBar

  // ajust value
  peopleBar.player1.width = 200
  peopleBar.player2.width = 200

  app.stage.addChild(peopleBar)

  return peopleBar
}

export default loadPeopleBar
