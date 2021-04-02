const loadGameplayScene = (app, setCurrentScene) => {
  app.loader.add('bg', 'src/assets/background/gameplay-1.png').load((loader, resources) => {
    const bg = new PIXI.Sprite(resources.bg.texture)

    bg.x = 0
    bg.y = 0
    bg.z = 0

    app.stage.addChild(bg)
  })
}

export default loadGameplayScene
