import React from 'react'
import { View } from 'react-native'

type Props = { value: string; onChange: (color: string) => void }

const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={{}}>
      <input
        type="color"
        id="head"
        name="head"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      ></input>
    </View>
  )
}

export default ColorPicker
