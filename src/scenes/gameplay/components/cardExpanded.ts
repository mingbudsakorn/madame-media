import * as PIXI from 'pixi.js'
import loadCard, { CardType } from '../../../components/card'
import loadMoneyBar from '../../../components/moneyBar'
// import { CARD } from '../../../constants/card'
import { Card } from '../../../types'

interface Type extends PIXI.Container {
  setCards: (cards: Card[]) => void
  useCard: (index: number) => void
}

const loadCardExpanded = (resources: PIXI.IResourceDictionary, onClose: () => void) => {
  const cardExpanded = new PIXI.Container() as Type

  const overlay = new PIXI.Sprite(resources['art/overlay'].texture)
  overlay.interactive = true
  overlay.on('mousedown', onClose)
  cardExpanded.addChild(overlay)

  const cardContainer = new PIXI.Container()

  const toggleCard = (card: CardType, toggleButton: PIXI.Sprite) => {
    const currentRealValue = card.getIsReal()
    if (currentRealValue) {
      toggleButton.texture = resources['art/toggle-to-real'].texture
    } else {
      toggleButton.texture = resources['art/toggle-to-fake'].texture
    }
    card.setIsReal(!currentRealValue)
  }

  let cardArray = []

  const displayCards = async (cards: Card[]) => {
    cardArray.length = 0
    cards.forEach((cardConfig, i) => {
      const singleCardContainer = new PIXI.Container()
      const card = loadCard(resources, cardConfig)
      card.width = 275
      card.height = 404
      card.x = 300 * i
      card.y = 0
      card.interactive = true
      singleCardContainer.addChild(card)

      const toggleButton = new PIXI.Sprite(resources['art/toggle-to-fake'].texture)
      toggleButton.position.set(card.x, 420)
      toggleButton.width = 275
      toggleButton.height = 68
      toggleButton.interactive = true
      toggleButton.on('mousedown', () => toggleCard(card, toggleButton))
      toggleButton.alpha = 0
      singleCardContainer.addChild(toggleButton)

      const useCardButton = new PIXI.Sprite(resources['art/use-card-button'].texture)
      useCardButton.position.set(card.x, 500)
      useCardButton.width = 275
      useCardButton.height = 68
      useCardButton.interactive = true
      useCardButton.alpha = 0
      // useCardButton.on('mousedown', () => {
      //   onUseCard(card)
      // })
      singleCardContainer.addChild(useCardButton)

      singleCardContainer.interactive = true

      singleCardContainer.on('mouseover', () => {
        toggleButton.alpha = 1
        useCardButton.alpha = 1
      })
      singleCardContainer.on('mouseout', () => {
        toggleButton.alpha = 0
        useCardButton.alpha = 0
      })
      cardContainer.addChild(singleCardContainer)

      cardArray.push({
        useButton: useCardButton,
        toggleButton: toggleButton,
        card: card,
      })
    })

    cardContainer.x = overlay.width / 2 - cardContainer.width / 2
    cardContainer.y = overlay.height / 2 - cardContainer.height / 2
  }

  cardExpanded.addChild(cardContainer)

  cardExpanded.useCard = (index) => {
    cardArray[index].useButton.visible = false
    cardArray[index].toggleButton.visible = false
  }

  const moneyBar = loadMoneyBar(resources, 'light')
  moneyBar.position.set(1170, 100)
  cardExpanded.addChild(moneyBar)

  cardExpanded.setCards = (cards: Card[]) => {
    // clear old cards
    while (cardContainer.children[0]) {
      cardContainer.removeChild(cardContainer.children[0])
    }
    displayCards(cards)
  }

  return {
    scene: cardExpanded,
    cardArray,
    moneyBar,
  }
}

export default loadCardExpanded
