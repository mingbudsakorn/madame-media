export const TYPE = {
  PR: {
    TEXT: 'ประชาสัมพันธ์',
    EFFECT: '( เป็นกลาง ) >>> ( ฝั่งเรา )'
  },
  ATTACK: {
    TEXT: 'โจมตี',
    EFFECT: '( ฝั่งคู่แข่ง ) >>> ( เป็นกลาง )'
  }
}

export const CARD = {
  0: {
    real: {
      name: 'แนะนำตัวต่อสาธารณะชน',
      type: TYPE.PR.TEXT,
      audio: 1,
      visual: 1,
      text: 1,
      price: 50,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'แนะนำตัวต่อสาธารณะชน',
      type: TYPE.PR.TEXT,
      audio: 1,
      visual: 1,
      text: 1,
      price: 25,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  1: {
    real: {
      name: 'โอ้ย ฉันทำงานหนักแหละ',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 0,
      text: 5,
      price: 110,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'โอ้ย ฉันทำงานหนักแหละ',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 0,
      text: 5,
      price: 55,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  }
}