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

export interface CardSlots {
  SOCIAL_MEDIA: number | null
  MOUTH: number | null
  WEBPAGE: number | null
  TV: number | null
  RADIO: number | null
  PUBLICATION: number | null
  OUT_OF_HOME: number | null
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

type ChannelName =
  | 'SOCIAL_MEDIA'
  | 'MOUTH'
  | 'WEBPAGE'
  | 'TV'
  | 'RADIO'
  | 'PUBLICATION'
  | 'OUT_OF_HOME'

export interface GameState {
  money?: number
  cards?: CardSlots
  availableChannels?: ChannelName[]
  people?: {
    ours: number
    neutral: number
    theirs: number
  }
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
  turns?: number
  currentTurn?: number
}

export interface Button extends PIXI.Sprite {
  setActive: (isActive: boolean) => void
  setSelected: (isSelected: boolean) => void
  onHover: () => void
}
