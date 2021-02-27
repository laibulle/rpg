import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'

type Props = {} & ViewProps

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'white',
    borderWidth: 1,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
})
const Card: React.FC<Props> = ({ style, children }) => {
  return <View style={[styles.default, style]}>{children}</View>
}

export default Card
