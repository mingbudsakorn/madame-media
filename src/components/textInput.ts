import * as PIXI from 'pixi.js'
import TextInput from 'pixi-text-input'
import { TEXT_STYLE, COLOR } from '../constants/style'

export const loadTextInput = (
  placeholder = ''
) => {

  const textInput = new TextInput({
    input: {
      fontSize: '28pt',
      fontFamily: 'Chonburi',
      padding: '20px',
      width: '470px',
      color: COLOR.BLACK
  },
    box: {
      default: {fill: COLOR.WHITE, rounded: 10, stroke: {color: COLOR.SILVER, width: 6}},
      focused: {fill: COLOR.WHITE, rounded: 10, stroke: {color: COLOR.BLUE, width: 6}}
    }
  })
  textInput.placeholder = placeholder

  return textInput
}

export default loadTextInput
