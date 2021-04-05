import { COLOR, TEXT_STYLE } from '../utils/style.js'

const loadChannel = (resources, channelConfig, isAvailable) => {
  let channel = new PIXI.Container()
  
  let channelName = new PIXI.Text(channelConfig.name, TEXT_STYLE.BODY_THAI)
  let channelBg = isAvailable? new PIXI.Sprite(resources.availChannelBg.texture) : new PIXI.Sprite(resources.unavailChannelBg.texture)
  
  channelName.style.fill = isAvailable? COLOR.BLACK : COLOR.CHARCOAL
  channelName.anchor.set(0.5,0)
  channelName.position.set(channelBg.width/2,5)
  channel.addChild(channelName)

  channelBg.position.set(0,channelName.height + 8)
  channel.addChild(channelBg)

  let audioIcon = channelConfig.audio? new PIXI.Sprite(resources.availAudio.texture) : new PIXI.Sprite(resources.notAvailAudio.texture)
  audioIcon.width = 30
  audioIcon.height = 30
  audioIcon.position.set(17,channelBg.y+channelBg.height+10)
  channel.addChild(audioIcon)

  let visualIcon = channelConfig.visual? new PIXI.Sprite(resources.availVisual.texture) : new PIXI.Sprite(resources.notAvailVisual.texture)
  visualIcon.width = 30
  visualIcon.height = 30
  visualIcon.position.set(audioIcon.x+audioIcon.width+23, audioIcon.y)
  channel.addChild(visualIcon)

  let textIcon = channelConfig.text? new PIXI.Sprite(resources.availText.texture) : new PIXI.Sprite(resources.notAvailText.texture)
  textIcon.width = 30
  textIcon.height = 30
  textIcon.position.set(visualIcon.x+visualIcon.width+23, audioIcon.y)
  channel.addChild(textIcon)
  
  let percentageText = new PIXI.Text(channelConfig.percentage+'%', TEXT_STYLE.BODY_THAI)
  percentageText.style.fill = isAvailable? COLOR.BLACK : COLOR.CHARCOAL
  percentageText.anchor.set(0.5,0)
  percentageText.position.set(channelBg.width/2, channelBg.y+20)
  channel.addChild(percentageText)

  return channel
}

export default loadChannel