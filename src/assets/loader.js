import art from './art/*.png'
import background from './background/*.png'
import cards from './cards/*.png'
import channels from './channels/*.png'

export const assets = {
  ...Object.keys(art).reduce((acc, key) => ({ ...acc, [`art/${key}`]: art[key] }), {}),
  ...Object.keys(background).reduce(
    (acc, key) => ({ ...acc, [`background/${key}`]: background[key] }),
    {},
  ),
  ...Object.keys(cards).reduce((acc, key) => ({ ...acc, [`cards/${key}`]: cards[key] }), {}),
  ...Object.keys(channels).reduce(
    (acc, key) => ({ ...acc, [`channels/${key}`]: channels[key] }),
    {},
  ),
}
