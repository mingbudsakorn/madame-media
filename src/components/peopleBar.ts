import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../constants/style'
import { PEOPLE_BAR_CONFIG } from '../constants/gameConfig'
import { People } from '../types'

interface PeopleBarType extends PIXI.Container {
  setPeople: (myPeople: number, opponentPeople: number) => void
  getPeople: () => People
}

export const loadPeopleBar = (
  resources: PIXI.IResourceDictionary,
  myPeople: number,
  opponentPeople: number,
) => {
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

  const calculatePeople = (myPeople: number, opponentPeople: number) => {
    myPeople = myPeople <= 0? 0: myPeople
    opponentPeople = opponentPeople <= 0? 0: opponentPeople
    player1PeopleBar.width = myPeople * (innerPeopleBar.width / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
    player2PeopleBar.width =
      opponentPeople * (innerPeopleBar.width / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
    player1PeopleText.text = myPeople.toString()
    player2PeopleText.text = opponentPeople.toString()
    neutralPeopleText.text = (PEOPLE_BAR_CONFIG.TOTAL_PEOPLE - myPeople - opponentPeople).toString()
  }

  const getPeople = () => {
    return {
      myPeople: parseInt(player1PeopleText.text),
      opponentPeople: parseInt(player2PeopleText.text),
      neutralPeople: parseInt(neutralPeopleText.text),
    } as People
  }

  // getters/setters
  peopleBar.setPeople = (myPeople: number, opponentPeople: number) => {
    calculatePeople(myPeople, opponentPeople)
  }

  peopleBar.getPeople = () => {
    return getPeople()
  }

  // init value
  player1PeopleBar.width = myPeople * (innerPeopleBar.width / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
  player2PeopleBar.width = opponentPeople * (innerPeopleBar.width / PEOPLE_BAR_CONFIG.TOTAL_PEOPLE)
  player1PeopleText.text = myPeople.toString()
  player2PeopleText.text = opponentPeople.toString()
  neutralPeopleText.text = (PEOPLE_BAR_CONFIG.TOTAL_PEOPLE - myPeople - opponentPeople).toString()

  return peopleBar
}

export default loadPeopleBar
