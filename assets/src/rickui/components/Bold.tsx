import React from 'react'
import { TextProps, StyleSheet } from 'react-native'
import Text from './Text'

type Props = {} & TextProps

const style = StyleSheet.create({
  bold: { fontWeight: 'bold' },
})

const Bold: React.FC<Props> = (props) => {
  return (
    <Text {...props} style={[style.bold, props.style]}>
      {props.children}
    </Text>
  )
}

export default Bold
