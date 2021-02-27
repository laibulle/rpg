import React from 'react'
import { TextProps } from 'react-native'
import Text from './Text'

type Props = {} & TextProps

const H1: React.FC<Props> = (props) => {
  return (
    <Text aria-level="1" accessibilityRole="header" {...props}>
      {props.children}
    </Text>
  )
}

export default H1
