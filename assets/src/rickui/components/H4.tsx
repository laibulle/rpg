import React from 'react'
import { TextProps } from 'react-native'
import Text from './Text'

type Props = {} & TextProps

const H4: React.FC<Props> = (props) => {
  return (
    <Text aria-level="4" accessibilityRole="header" {...props}>
      {props.children}
    </Text>
  )
}

export default H4
