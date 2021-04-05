import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../../../constants/style'
import { PEOPLE_BAR_CONFIG } from '../../../constants/gameConfig'
import { People } from '../../../types'

interface PeopleBarType extends PIXI.Container {
  barWidth: number
  player1Bar: PIXI.Sprite
  player2Bar: PIXI.Sprite
  player1People: PIXI.Text
  player2People: PIXI.Text
  neutralPeople: PIXI.Text
  setPeople: (myPeople: number, opponentPeople: number) => void
  getPeople: () => People
}

export const loadPeopleBar = (resources: PIXI.IResourceDictionary) => {
  const peopleBar = new PIXI.Container() as PeopleBarType
  // peopleBar.position.set(435, 74)

  const innerPeopleBar = new PIXI.Sprite(resources['art/inner-people-bar'].texture)
  peopleBar.addChild(innerPeopleBar)

  const player1PeopleBar = new PIXI.Sprite(resources['art/player1-people-bar'].texture)
  player1PeopleBar.position.set(5, 5)
  peopleBar.addChild(player1PeopleBar)

  const player2PeopleBar = new PIXI.Sprite(resources['art/player2-people-bar'].texture)
  player2PeopleBar.position.set(1045, 5)
  player2PeopleBar.anchor.set(1, 0)
  peopleBar.addChild(player2PeopleBar)

  const peopleBarBoarder = new PIXI.Sprite(resources['art/people-bar-boarder'].texture)
  peopleBar.addChild(peopleBarBoarder)

  // ----------------------text---------------------- //
  const player1PeopleText = new PIXI.Text('0', TEXT_STYLE.BODY_THAI)
  player1PeopleText.position.set(24, 66)
  peopleBar.addChild(player1PeopleText)

  const player2PeopleText = new PIXI.Text('0', TEXT_STYLE.BODY_THAI)
  player2PeopleText.anchor.set(1, 0)
  player2PeopleText.position.set(1022, 66)
  peopleBar.addChild(player2PeopleText)

  const neutralPeopleText = new PIXI.Text('0', TEXT_STYLE.BODY_THAI)
  neutralPeopleText.anchor.set(0.5, 0)
  neutralPeopleText.position.set(525, 66)
  peopleBar.addChild(neutralPeopleText)
  // ------------------------------------------------ //

  // set instance
  peopleBar.barWidth = innerPeopleBar.width
  peopleBar.player1Bar = player1PeopleBar
  peopleBar.player2Bar = player2PeopleBar
  peopleBar.player1People = player1PeopleText
  peopleBar.player2People = player2PeopleText
  peopleBar.neutralPeople = neutralPeopleText

  // set function
  peopleBar.setPeople = (myPeople: number, opponentPeople: number) => {
    setPeople(peopleBar, myPeople, opponentPeople)
  }

  peopleBar.getPeople = () => {
    return getPeople(peopleBar)
  }

  // init value
  peopleBar.player1Bar.width =
    PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE * (peopleBar.barWidth / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
  peopleBar.player2Bar.width =
    PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE * (peopleBar.barWidth / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
  peopleBar.player1People.text = PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE.toString()
  peopleBar.player2People.text = PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE.toString()
  peopleBar.neutralPeople.text = (
    PEOPLE_BAR_CONFIG.TOTAL_PEOPLE -
    PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE -
    PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE
  ).toString()

  return peopleBar
}

const setPeople = (peopleBar, myPeople, opponentPeople) => {
  peopleBar.player1Bar.width = myPeople * (peopleBar.barWidth / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
  peopleBar.player2Bar.width =
    opponentPeople * (peopleBar.barWidth / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
  peopleBar.player1People.text = myPeople
  peopleBar.player2People.text = opponentPeople
  peopleBar.neutralPeople.text = PEOPLE_BAR_CONFIG.TOTAL_PEOPLE - myPeople - opponentPeople
}

const getPeople = (peopleBar) => {
  return {
    myPeople: peopleBar.player1People.text,
    opponentPeople: peopleBar.player2People.text,
    neutralPeople: peopleBar.neutralPeople.text,
  } as People
}

export default loadPeopleBar
