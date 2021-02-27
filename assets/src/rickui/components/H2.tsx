import React from 'react'
import { TextProps } from 'react-native'
import Text from './Text'

type Props = {} & TextProps

const H2: React.FC<Props> = (props) => {
  return (
    <Text aria-level="2" accessibilityRole="header" {...props}>
      {props.children}
    </Text>
  )
}

export default H2
