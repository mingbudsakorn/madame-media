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
}

export interface Channel {
  name: string
  audio: number
  visual: number
  text: number
  price: number
  percentage: number
}
