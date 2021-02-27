import React, { useContext } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { ThemeContext } from '..'

import Text from './Text'

type Props = { label?: string; validation?: RegExp } & TextInputProps

const CustomTextInput: React.FC<Props> = (props) => {
  const [theme] = useContext(ThemeContext)

  return (
    <View>
      {props.label ? <Text>{props.label}</Text> : <></>}
      <TextInput
        {...props}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : 'lightgrey'
        }
        style={[
          theme.styles.formBorder,
          theme.styles.text,
          props.style,
          { backgroundColor: 'black' },
        ]}
      >
        {props.children}
      </TextInput>
    </View>
  )
}

export default CustomTextInput
