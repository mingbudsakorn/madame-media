import * as PIXI from 'pixi.js'
import { CardType } from '../components/card'

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
  name: string // Card name
  audioFactor: number // Card audio factor
  visualFactor: number // Card visual factor
  textFactor: number // Card text factor
  cost: number // Card cost to play
  effectType: 'pr' | 'attack' // Card effect type
  id?: string // Card ID
  type?: number
}

export interface Channel {
  name: string
  audio: number
  visual: number
  text: number
  price: number
  baseFactor: number
  type: number
}
export interface CardSlots {
  [key: number]: Card
}

export interface SummarySlots {
  [key: number]: string | null
}

export interface SceneWrapper {
  scene: PIXI.Container
  children: {
    [key: string]: any
  }
}

export interface Scene extends PIXI.Container {
  onAppear?: () => void
  setGameState?: (gameState: GameState) => void
  setNextPossibleScenes: (scenes: { [key: number]: PIXI.Container }) => void
}

export interface GameState {
  gold?: number
  player1?: {
    name: string
    avatar: any
  }
  player2?: {
    name: string
    avatar: any
  }
  gameId?: string
  playerId?: string
  rounds?: number
  currentRound?: number
  allChannels?: Channel[]
  battleResult?: any
  winner?: null
}

export interface Button extends PIXI.Sprite {
  setActive: (isActive: boolean) => void
  setSelected: (isSelected: boolean) => void
  onHover: () => void
}

export interface ChannelInShopList {
  channelConfig: Channel
  isOwned: boolean
}
