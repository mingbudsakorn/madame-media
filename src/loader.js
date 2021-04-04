// Load resource
export const loadAsset = (app, setup) => {
  app.loader
  .add('bg', 'src/assets/background/gameplay-bg.png')
  .add('smallBlueCircle', 'src/assets/art/small-blue-circle.png')
  .add('smallPinkCircle', 'src/assets/art/small-pink-circle.png')
  .add('sandClock', 'src/assets/art/sand-clock.png')
  .add('innerTimeBar', 'src/assets/art/inner-time-bar.png')
  .add('outerTimeBar', 'src/assets/art/outer-time-bar.png')
  .add('timeBarBoarder', 'src/assets/art/time-bar-boarder.png')
  .add('coin', 'src/assets/art/coin.png')
  .add('moneyBackground', 'src/assets/art/money-bg.png')
  .add('channelDeckBg', 'src/assets/art/channel-deck-bg.png')
  .add('polygonButtonLeft', 'src/assets/art/button-polygon-left.png')
  .add('polygonButtonRight', 'src/assets/art/button-polygon-right.png')
  .add('finishButton', 'src/assets/art/finish-button.png')
  .add('innerPeopleBar', 'src/assets/art/inner-people-bar.png')
  .add('player1PeopleBar', 'src/assets/art/player1-people-bar.png')
  .add('player2PeopleBar', 'src/assets/art/player2-people-bar.png')
  .add('peopleBarBoarder', 'src/assets/art/people-bar-boarder.png')
  .add('buyChannelButton', 'src/assets/art/buy-channel-button.png')
  .add('man1', 'src/assets/art/man1.png')
  .add('women4', 'src/assets/art/women4.png')
  .add('shopBg', 'src/assets/art/shop-bg.png')
  .add('backButton','src/assets/art/back-button.png')
  .load(() => {
    setup(app)
  })
}

