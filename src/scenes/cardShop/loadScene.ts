import * as PIXI from 'pixi.js'
import { TEXT_STYLE, COLOR } from '../../constants/style'
import loadCardInShop, { CardInShopType } from './components/cardInShop'
import { Card, CardSet } from '../../types/index'
import { Button } from '../../types/index'
import loadModal from '../../components/modal'

const cardShopScene = new PIXI.Container()
cardShopScene.position.set(0, 0)

interface CardShopDeckType extends PIXI.Container {
  setCard: (cardConfigList: Card[]) => void
  getSelectedCards: () => Card[]
  resetCount: () => void
}

const loadCardShopScene = (resources: PIXI.IResourceDictionary) => {
  let cardsObject = []

  const bg = new PIXI.Sprite(resources['background/cardshop-bg'].texture)
  bg.position.set(0, 0)
  cardShopScene.addChild(bg)

  //text
  const buyChannelText = new PIXI.Text('เลือกการ์ด 3 จาก 5 ใบ', TEXT_STYLE.SUPER_HEADER_THAI)
  buyChannelText.anchor.set(0.5, 0)
  buyChannelText.position.set(bg.width / 2, 147)
  cardShopScene.addChild(buyChannelText)

  //cards
  const cardShopDeck = new PIXI.Container() as CardShopDeckType
  cardShopDeck.position.set(327, 340)
  cardShopScene.addChild(cardShopDeck)
  let count = 0

  cardShopDeck.setCard = (cardConfigList: Card[]) => {
    let prevX = 0
    const padding = 20
    // clear old cards
    while (cardShopDeck.children[0]) {
      cardShopDeck.removeChildAt(0)
    }
    cardsObject = []
    for (let i in cardConfigList) {
      let cardConfig = cardConfigList[i]
      const cardInShop = loadCardInShop(resources, cardConfig)
      cardInShop.x = i == '0' ? prevX : prevX + cardInShop.width + padding
      prevX = cardInShop.x
      cardShopDeck.addChild(cardInShop)

      cardInShop.tickBox
        .on('mousedown', () => {
          cardInShop.toggle()
          updateCount(cardInShop)
        })
        .on('touchstart', () => {
          cardInShop.toggle()
          updateCount(cardInShop)
        })

      cardInShop.card
        .on('mousedown', () => {
          cardInShop.toggle()
          updateCount(cardInShop)
        })
        .on('touchstart', () => {
          cardInShop.toggle()
          updateCount(cardInShop)
        })

      cardsObject.push(cardInShop)
    }
  }

  const updateCount = (cardInShop: CardInShopType) => {
    if (cardInShop.getIsSelected()) {
      count += 1
    } else {
      count -= 1
    }
    if (count == 3) {
      setActiveConfirmButton(true)
    } else {
      setActiveConfirmButton(false)
    }
  }

  cardShopDeck.resetCount = () => {
    count = 0
    setActiveConfirmButton(false)
  }

  cardShopDeck.getSelectedCards = () => {
    let selectedCards = cardsObject.filter((card) => card.getIsSelected())
    let selectedConfig = []
    selectedCards.forEach((card) => {
      selectedConfig.push(card.getCardConfig())
    })
    return selectedConfig
  }

  //button
  const confirmButton = new PIXI.Sprite(resources['art/disable-confirm-btn'].texture) as Button
  confirmButton.position.set(751, 897)
  confirmButton.interactive = true
  const setActiveConfirmButton = (isActive: Boolean) => {
    if (isActive) {
      confirmButton.texture = resources['art/confirm-btn'].texture
      confirmButton.buttonMode = true
    } else {
      confirmButton.texture = resources['art/disable-confirm-btn'].texture
      confirmButton.buttonMode = false
    }
  }
  cardShopScene.addChild(confirmButton)

  const waitingModal = loadModal(resources)
  cardShopScene.addChild(waitingModal)
  waitingModal.setText('กรุณารอสักครู่', 'กรุณารออีกฝั่ง')
  waitingModal.setShowAcceptButton(false)
  waitingModal.setClosable(false)

  return {
    scene: cardShopScene,
    children: {
      bg,
      confirmButton,
      cardShopDeck,
      waitingModal,
    },
  }
}
export default loadCardShopScene
