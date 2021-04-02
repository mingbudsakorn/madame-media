const loadGameplayScene = (app, setCurrentScene) => {

  app.loader
    .add('bg', 'src/assets/background/gameplay-1.png')
    .add('channelDeckBg', 'src/assets/art/channel-deck.png')
    .add('whiteRectangle', 'src/assets/art/white-rectangle.png')
    .add('sandClock', 'src/assets/art/sand-clock.png')
    .add('coin', 'src/assets/art/coin.png')
    .add('smallBlueCircle', 'src/assets/art/small-blue-circle.png')
    .add('smallPinkCircle', 'src/assets/art/small-pink-circle.png')
    .load((loader, resources) => {
      const bg = new PIXI.Sprite(resources.bg.texture)
      bg.position.set(0, 0, 0)
      app.stage.addChild(bg)

      const channelDeckBg = new PIXI.Sprite(resources.channelDeckBg.texture)
      channelDeckBg.position.set(97,637)
      app.stage.addChild(channelDeckBg)

      const whiteRectangle = new PIXI.Sprite(resources.whiteRectangle.texture)
      whiteRectangle.position.set(1388,492)
      app.stage.addChild(whiteRectangle)

      const sandClock = new PIXI.Sprite(resources.sandClock.texture)
      sandClock.position.set(27,491)
      app.stage.addChild(sandClock)

      const coin = new PIXI.Sprite(resources.coin.texture)
      coin.position.set(1130,490)
      app.stage.addChild(coin)

      const smallBlueCircle = new PIXI.Sprite(resources.smallBlueCircle.texture)
      smallBlueCircle.position.set(112,44)
      app.stage.addChild(smallBlueCircle)

      const smallPinkCircle = new PIXI.Sprite(resources.smallPinkCircle.texture)
      smallPinkCircle.position.set(1582,44)
      app.stage.addChild(smallPinkCircle)

    })

}

export default loadGameplayScene
