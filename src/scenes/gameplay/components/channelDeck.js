const loadChannelDeck = (app) => {
    app.loader.add('channelDeckBg', 'src/assets/art/channel-deck.png').load((loader, resources) => {
        const channelDeckBg = new PIXI.Sprite(resources.channelDeckBg.texture)

        channelDeckBg.position.set(97,637,1)

        app.stage.addChild(channelDeckBg)
    })
}

export default loadChannelDeck
  