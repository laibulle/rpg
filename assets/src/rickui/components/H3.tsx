import React from 'react'
import { TextProps } from 'react-native'
import Text from './Text'

type Props = {} & TextProps

const H3: React.FC<Props> = (props) => {
  return (
    <Text aria-level="3" accessibilityRole="header" {...props}>
      {props.children}
    </Text>
  )
}

export default H3
