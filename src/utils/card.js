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
  },
  2: {
    real: {
      name: 'ประกาศนโยบาย',
      type: TYPE.PR.TEXT,
      audio: 7,
      visual: 2,
      text: 1,
      price: 140,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'ประกาศนโยบาย',
      type: TYPE.PR.TEXT,
      audio: 7,
      visual: 2,
      text: 1,
      price: 70,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  3: {
    real: {
      name: 'รักนะยัยประชาชน',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 0,
      text: 4,
      price: 100,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'รักนะยัยประชาชน',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 0,
      text: 4,
      price: 50,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  4: {
    real: {
      name: 'บริจาคการกุศล',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 20,
      text: 0,
      price: 220,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'บริจาคการกุศล',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 20,
      text: 0,
      price: 110,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  5: {
    real: {
      name: 'ไปบ้านเด็กกำพร้า',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 7,
      text: 0,
      price: 130,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'ไปบ้านเด็กกำพร้า',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 7,
      text: 0,
      price: 65,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  6: {
    real: {
      name: 'รณรงค์เรื่องเพศหลากหลาย',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 0,
      text: 14,
      price: 180,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'รณรงค์เรื่องเพศหลากหลาย',
      type: TYPE.PR.TEXT,
      audio: 0,
      visual: 0,
      text: 14,
      price: 90,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  7: {
    real: {
      name: 'ลงพื้นที่ไปหาชาวบ้าน',
      type: TYPE.PR.TEXT,
      audio: 15,
      visual: 10,
      text: 15,
      price: 320,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'ลงพื้นที่ไปหาชาวบ้าน',
      type: TYPE.PR.TEXT,
      audio: 15,
      visual: 10,
      text: 15,
      price: 160,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  8: {
    real: {
      name: 'ฉันจบเกียรตินิยม มหาลัยชั้นนำนะจ๊ะ!',
      type: TYPE.PR.TEXT,
      audio: 12,
      visual: 0,
      text: 12,
      price: 160,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'ฉันจบเกียรตินิยม มหาลัยชั้นนำนะจ๊ะ!',
      type: TYPE.PR.TEXT,
      audio: 12,
      visual: 0,
      text: 12,
      price: 80,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  9: {
    real: {
      name: 'ร้องเพลงปลุกใจประชาชน',
      type: TYPE.PR.TEXT,
      audio: 25,
      visual: 0,
      text: 0,
      price: 240,
      effect: TYPE.PR.EFFECT,
      description: ''
    },
    fake: {
      name: 'ร้องเพลงปลุกใจประชาชน',
      type: TYPE.PR.TEXT,
      audio: 25,
      visual: 0,
      text: 0,
      price: 120,
      effect: TYPE.PR.EFFECT,
      description: ''
    }
  },
  10: {
    real: {
      name: 'แอบปล่อยรูปหลุด',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 20,
      text: 0,
      price: 300,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'แอบปล่อยรูปหลุด',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 20,
      text: 0,
      price: 150,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  11: {
    real: {
      name: 'มันด่าประชาชน!!!',
      type: TYPE.ATTACK.TEXT,
      audio: 8,
      visual: 0,
      text: 8,
      price: 140,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'มันด่าประชาชน!!!',
      type: TYPE.ATTACK.TEXT,
      audio: 8,
      visual: 0,
      text: 8,
      price: 70,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  12: {
    real: {
      name: 'นโยบายเขาแย่',
      type: TYPE.ATTACK.TEXT,
      audio: 10,
      visual: 0,
      text: 0,
      price: 150,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'นโยบายเขาแย่',
      type: TYPE.ATTACK.TEXT,
      audio: 10,
      visual: 0,
      text: 0,
      price: 75,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  13: {
    real: {
      name: 'เธอ ซื้อ เสียง',
      type: TYPE.ATTACK.TEXT,
      audio: 10,
      visual: 10,
      text: 15,
      price: 420,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'เธอ ซื้อ เสียง',
      type: TYPE.ATTACK.TEXT,
      audio: 10,
      visual: 10,
      text: 15,
      price: 210,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  14: {
    real: {
      name: 'นางทำงานไม่เป็น',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 3,
      text: 2,
      price: 120,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'นางทำงานไม่เป็น',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 3,
      text: 2,
      price: 60,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  15: {
    real: {
      name: 'ลูกชายนางเป็นเด็กเกเร',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 0,
      text: 7,
      price: 130,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'ลูกชายนางเป็นเด็กเกเร',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 0,
      text: 7,
      price: 65,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  16: {
    real: {
      name: 'นางแอบล่าสัตว์สงวน',
      type: TYPE.ATTACK.TEXT,
      audio: 20,
      visual: 0,
      text: 0,
      price: 200,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'นางแอบล่าสัตว์สงวน',
      type: TYPE.ATTACK.TEXT,
      audio: 20,
      visual: 0,
      text: 0,
      price: 100,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  17: {
    real: {
      name: 'นางซื้อกระเป๋าจระเข้!',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 3,
      text: 0,
      price: 60,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'นางซื้อกระเป๋าจระเข้',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 3,
      text: 0,
      price: 30,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  },
  18: {
    real: {
      name: 'นางโพสต์บุลลี่เพื่อนค่า!!',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 0,
      text: 25,
      price: 240,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    },
    fake: {
      name: 'นางโพสต์บุลลี่เพื่อนค่า!',
      type: TYPE.ATTACK.TEXT,
      audio: 0,
      visual: 0,
      text: 25,
      price: 120,
      effect: TYPE.ATTACK.EFFECT,
      description: ''
    }
  }
}