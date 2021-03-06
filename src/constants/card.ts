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
      effectType: 'pr',
      audioFactor: 1,
      visualFactor: 1,
      textFactor: 1,
      cost: 50,
    },
    fake: {
      name: 'แนะนำตัวต่อสาธารณะชน',
      effectType: 'pr',
      audioFactor: 1,
      visualFactor: 1,
      textFactor: 1,
      cost: 25,
    },
  },
  1: {
    real: {
      name: 'โอ้ย ฉันทำงานหนักแหละ',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 5,
      cost: 110,
    },
    fake: {
      name: 'โอ้ย ฉันทำงานหนักแหละ',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 5,
      cost: 55,
    },
  },
  2: {
    real: {
      name: 'ประกาศนโยบาย',
      effectType: 'pr',
      audioFactor: 7,
      visualFactor: 2,
      textFactor: 1,
      cost: 140,
    },
    fake: {
      name: 'ประกาศนโยบาย',
      effectType: 'pr',
      audioFactor: 7,
      visualFactor: 2,
      textFactor: 1,
      cost: 70,
    },
  },
  3: {
    real: {
      name: 'รักนะยัยประชาชน',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 4,
      cost: 100,
    },
    fake: {
      name: 'รักนะยัยประชาชน',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 4,
      cost: 50,
    },
  },
  4: {
    real: {
      name: 'บริจาคการกุศล',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 20,
      textFactor: 0,
      cost: 220,
    },
    fake: {
      name: 'บริจาคการกุศล',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 20,
      textFactor: 0,
      cost: 110,
    },
  },
  5: {
    real: {
      name: 'ไปบ้านเด็กกำพร้า',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 7,
      textFactor: 0,
      cost: 130,
    },
    fake: {
      name: 'ไปบ้านเด็กกำพร้า',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 7,
      textFactor: 0,
      cost: 65,
    },
  },
  6: {
    real: {
      name: 'รณรงค์เรื่องเพศหลากหลาย',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 14,
      cost: 180,
    },
    fake: {
      name: 'รณรงค์เรื่องเพศหลากหลาย',
      effectType: 'pr',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 14,
      cost: 90,
    },
  },
  7: {
    real: {
      name: 'ลงพื้นที่ไปหาชาวบ้าน',
      effectType: 'pr',
      audioFactor: 15,
      visualFactor: 10,
      textFactor: 15,
      cost: 320,
    },
    fake: {
      name: 'ลงพื้นที่ไปหาชาวบ้าน',
      effectType: 'pr',
      audioFactor: 15,
      visualFactor: 10,
      textFactor: 15,
      cost: 160,
    },
  },
  8: {
    real: {
      name: 'ฉันจบเกียรตินิยม มหาลัยชั้นนำนะจ๊ะ!',
      effectType: 'pr',
      audioFactor: 12,
      visualFactor: 0,
      textFactor: 12,
      cost: 160,
    },
    fake: {
      name: 'ฉันจบเกียรตินิยม มหาลัยชั้นนำนะจ๊ะ!',
      effectType: 'pr',
      audioFactor: 12,
      visualFactor: 0,
      textFactor: 12,
      cost: 80,
    },
  },
  9: {
    real: {
      name: 'ร้องเพลงปลุกใจประชาชน',
      effectType: 'pr',
      audioFactor: 25,
      visualFactor: 0,
      textFactor: 0,
      cost: 240,
    },
    fake: {
      name: 'ร้องเพลงปลุกใจประชาชน',
      effectType: 'pr',
      audioFactor: 25,
      visualFactor: 0,
      textFactor: 0,
      cost: 120,
    },
  },
  10: {
    real: {
      name: 'แอบปล่อยรูปหลุด',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 20,
      textFactor: 0,
      cost: 300,
    },
    fake: {
      name: 'แอบปล่อยรูปหลุด',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 20,
      textFactor: 0,
      cost: 150,
    },
  },
  11: {
    real: {
      name: 'มันด่าประชาชน!!!',
      effectType: 'attack',
      audioFactor: 8,
      visualFactor: 0,
      textFactor: 8,
      cost: 140,
    },
    fake: {
      name: 'มันด่าประชาชน!!!',
      effectType: 'attack',
      audioFactor: 8,
      visualFactor: 0,
      textFactor: 8,
      cost: 70,
    },
  },
  12: {
    real: {
      name: 'นโยบายเขาแย่',
      effectType: 'attack',
      audioFactor: 10,
      visualFactor: 0,
      textFactor: 0,
      cost: 150,
    },
    fake: {
      name: 'นโยบายเขาแย่',
      effectType: 'attack',
      audioFactor: 10,
      visualFactor: 0,
      textFactor: 0,
      cost: 75,
    },
  },
  13: {
    real: {
      name: 'เธอ ซื้อ เสียง',
      effectType: 'attack',
      audioFactor: 10,
      visualFactor: 10,
      textFactor: 15,
      cost: 420,
    },
    fake: {
      name: 'เธอ ซื้อ เสียง',
      effectType: 'attack',
      audioFactor: 10,
      visualFactor: 10,
      textFactor: 15,
      cost: 210,
    },
  },
  14: {
    real: {
      name: 'นางทำงานไม่เป็น',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 3,
      textFactor: 2,
      cost: 120,
    },
    fake: {
      name: 'นางทำงานไม่เป็น',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 3,
      textFactor: 2,
      cost: 60,
    },
  },
  15: {
    real: {
      name: 'ลูกชายนางเป็นเด็กเกเร',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 7,
      cost: 130,
    },
    fake: {
      name: 'ลูกชายนางเป็นเด็กเกเร',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 7,
      cost: 65,
    },
  },
  16: {
    real: {
      name: 'นางแอบล่าสัตว์สงวน',
      effectType: 'attack',
      audioFactor: 20,
      visualFactor: 0,
      textFactor: 0,
      cost: 200,
    },
    fake: {
      name: 'นางแอบล่าสัตว์สงวน',
      effectType: 'attack',
      audioFactor: 20,
      visualFactor: 0,
      textFactor: 0,
      cost: 100,
    },
  },
  17: {
    real: {
      name: 'นางซื้อกระเป๋าจระเข้!',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 3,
      textFactor: 0,
      cost: 60,
    },
    fake: {
      name: 'นางซื้อกระเป๋าจระเข้',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 3,
      textFactor: 0,
      cost: 30,
    },
  },
  18: {
    real: {
      name: 'นางโพสต์บุลลี่เพื่อนข้า!!',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 25,
      cost: 240,
    },
    fake: {
      name: 'นางโพสต์บุลลี่เพื่อนข้า!',
      effectType: 'attack',
      audioFactor: 0,
      visualFactor: 0,
      textFactor: 25,
      cost: 120,
    },
  },
} as CardList
