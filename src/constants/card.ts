import { CardSet } from '../types'

export const TYPE = {
  PR: {
    text: 'ประชาสัมพันธ์',
    effect: '( เป็นกลาง ) >>> ( ฝั่งเรา )',
  },
  ATTACK: {
    text: 'โจมตี',
    effect: '( ฝั่งคู่แข่ง ) >>> ( เป็นกลาง )',
  },
}

interface CardList {
  [key: number]: CardSet
}

export const CARD = {
  0: {
    real: {
      name: 'แนะนำตัวต่อสาธารณะชน',
      type: TYPE.PR.text,
      audio: 1,
      visual: 1,
      text: 1,
      price: 50,
      effect: TYPE.PR.effect,
      description: '',
    },
    fake: {
      name: 'แนะนำตัวต่อสาธารณะชน',
      type: TYPE.PR.text,
      audio: 1,
      visual: 1,
      text: 1,
      price: 25,
      effect: TYPE.PR.effect,
      description: '',
    },
  },
  1: {
    real: {
      name: 'โอ้ย ฉันทำงานหนักแหละ',
      type: TYPE.PR.text,
      audio: 0,
      visual: 0,
      text: 5,
      price: 110,
      effect: TYPE.PR.effect,
      description: '',
    },
    fake: {
      name: 'โอ้ย ฉันทำงานหนักแหละ',
      type: TYPE.PR.text,
      audio: 0,
      visual: 0,
      text: 5,
      price: 55,
      effect: TYPE.PR.effect,
      description: '',
    },
  },
} as CardList
