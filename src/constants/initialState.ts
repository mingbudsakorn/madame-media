import { GameState } from '../types'
import { MONEY_CONFIG, PEOPLE_BAR_CONFIG } from './gameConfig'

export const gameState = {
  gold: MONEY_CONFIG.INIT,
  player1: {
    name: '',
    avatar: null,
  },
  player2: {
    name: '',
    avatar: null,
  },
  gameId: null,
  playerId: null,
  turns: 0,
  currentTurn: 1,
  allChannels: [],
  winner: null,
} as GameState
