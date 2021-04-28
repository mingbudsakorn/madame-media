import { GameState } from '../types'
import { MONEY_CONFIG, PEOPLE_BAR_CONFIG } from './gameConfig'

export const gameState = {
  money: MONEY_CONFIG.INIT,
  cards: {
    SOCIAL_MEDIA: null,
    MOUTH: null,
    WEBPAGE: null,
    TV: null,
    RADIO: null,
    PUBLICATION: null,
    OUT_OF_HOME: null,
  },
  people: {
    ours: PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE,
    neutral:
      PEOPLE_BAR_CONFIG.TOTAL_PEOPLE -
      PEOPLE_BAR_CONFIG.INIT_MY_PEOPLE -
      PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE,
    theirs: PEOPLE_BAR_CONFIG.INIT_OPPONENT_PEOPLE,
  },
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
} as GameState
