import React, { useContext } from 'react'
import { TextProps } from 'react-native'

import { ThemeContext, Text } from '..'

type Props = {
  to: string
  navigate: (to: string) => void
  children?: React.ReactNode
} & TextProps

const LinkText: React.FC<Props> = (props) => {
  return (
    <Text
      accessibilityRole="link"
      style={props.style as any}
      onPress={() => props.navigate(props.to)}
    >
      {props.children}
    </Text>
  )

  //return <Link {...(props as any)} />
}

export default LinkText
