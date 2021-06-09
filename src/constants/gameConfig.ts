export const TIME_BAR_CONFIG = {
  TIME_PER_TURN: 120,
}

export const PEOPLE_BAR_CONFIG = {
  TOTAL_PEOPLE: 999,
  INIT_MY_PEOPLE: 200,
  INIT_OPPONENT_PEOPLE: 200,
}

export const MONEY_CONFIG = {
  INIT: 500,
}

export const CARD_CONFIG = {
  CARDS_PER_TURN: 6,
}

export const SPECIAL_ACTION = {
  FACK_CHECK_DES: 'ตรวจสอบไพ่ของฝั่งตรงข้าม ถ้าเป็นไพ่ปลอม ไพ่ใบนั้นจะไม่ส่งผล',
  EXPOSE_DES: 'เปิดโปงไพ่ของฝั่งตรงข้าม ถ้าเป็นไพ่ปลอม เราจะได้เอฟเฟกของไพ่ใบนั้นมาแทน',
  SPY_DES: 'ดูไพ่ทั้งหมดของฝั่งตรงข้าม แล้วจบเทิร์น',
  DEFAULT_DES: 'กรุณาเลือกการกระทำพิเศษ',
  GENERAL_DES: 'การกระทำพิเศษ คือ การกระทำที่จะสามารถทำให้คุณได้เปรียบคู่ต่อสู้ได้',
  INIT_TIME: 30,
  FACT_CHECK_AGAIN: 'ตรวจสอบอีกครั้ง 75 เหรียญ',
  EXPOSE_AGAIN: 'เปิดโปงอีกครั้ง 125 เหรียญ'
}

export const RESULT = {
  WIN: {
    title: 'ชนะ!!',
    description: 'ยินดีด้วยคุณชนะ! สมแล้วจริงๆเก่งมาก! แต่อย่าหลงตัวไปล่ะ ชัยชนะคงไม่ได้อยู่กับคุณไปตลอดหรอก!',
  },
  LOSE: {
    title: 'แพ้!!',
    description: 'เสียใจด้วยคุณแพ้ แต่ใช่ว่าแพ้แล้วจะแพ้ตลอดไปนะ ครั้งหน้าคุณต้องทำได้แน่!',
  },
  DRAW: {
    title: 'เสมอ!!',
    description: 'ไม่มีใครยอมใครเลยนะ เยี่ยมจริงๆ',
  },
}

export const SELECTED_CARD_NUM = 3
