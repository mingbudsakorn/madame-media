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
  1: {
    real: {
      name: 'แนะนำตัวต่อสาธารณะชน',
      type: TYPE.PR.TEXT,
      audio: 1,
      visual: 1,
      text: 1,
      price: 50,
      effect: TYPE.PR.EFFECT
    },
    fake: {
      name: 'แนะนำตัวต่อสาธารณะชน',
      type: TYPE.PR.TEXT,
      audio: 1,
      visual: 1,
      text: 1,
      price: 25,
      effect: TYPE.PR.EFFECT
    }
  }
}