import * as PIXI from 'pixi.js'
import { TEXT_STYLE } from '../constants/style'
import { MONEY_CONFIG } from '../constants/gameConfig'

interface MoneyBarType extends PIXI.Container {
  money: PIXI.Text
  setMoney: (money: number) => void
}

export const loadMoneyBar = (resources: PIXI.IResourceDictionary) => {
  const moneyBar = new PIXI.Container() as MoneyBarType

  const coin = new PIXI.Sprite(resources['art/coin'].texture)
  moneyBar.addChild(coin)

  const moneyBackground = new PIXI.Sprite(resources['art/money-bg'].texture)
  moneyBackground.anchor.set(0, 0.5)
  moneyBackground.position.set(196, 35)
  moneyBar.addChild(moneyBackground)

  const moneyText = new PIXI.Text('เงิน :', TEXT_STYLE.SUBHEADER_THAI)
  moneyText.anchor.set(0, 0.5)
  moneyText.position.set(87, 35)
  moneyBar.addChild(moneyText)

  const marbleText = new PIXI.Text('เหรียญ', TEXT_STYLE.SUBHEADER_THAI)
  marbleText.anchor.set(0, 0.5)
  marbleText.position.set(532, 35)
  moneyBar.addChild(marbleText)

  const money = new PIXI.Text(MONEY_CONFIG.INIT.toString(), TEXT_STYLE.SUBHEADER_THAI)
  money.anchor.set(0.5, 0.5)
  money.position.set(356, 35)
  moneyBar.addChild(money)

  // set instance
  moneyBar.money = money

  // // set function
  moneyBar.setMoney = (money: number) => {
    moneyBar.money.text = money.toString()
  }

  return moneyBar
}

export default loadMoneyBar
