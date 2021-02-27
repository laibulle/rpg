import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const leftArrow = require('../../assets/left-arrow.png')
const rightArrow = require('../../assets/right-arrow.png')

type Props = { direction: 'left' | 'right'; onPress: () => void }

const Arrow: React.FC<Props> = ({ direction, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        resizeMode="contain"
        style={styles.arrow}
        source={direction === 'left' ? leftArrow : rightArrow}
      />
    </TouchableOpacity>
  )
}

export default Arrow

const styles = StyleSheet.create({
  arrow: { width: 100, height: 50 },
})
