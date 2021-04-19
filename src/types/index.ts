import * as PIXI from 'pixi.js'

export interface People {
  myPeople: number
  opponentPeople: number
  neutralPeople: number
}

export interface CardSet {
  real: Card
  fake: Card
}

export interface Card {
  name: string
  type: string
  audio: number
  visual: number
  text: number
  price: number
  effect: string
  description: string
  isReal: boolean
}

export interface Channel {
  name: string
  audio: number
  visual: number
  text: number
  price: number
  percentage: number
}

export interface DuelChannel {
  card: number
  channel: number
}

export interface Scene extends PIXI.Container {
  onAppear: () => void
}
