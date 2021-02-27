import React, { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'

import { Text } from '../rickui'

type Props = { value?: string }

const Damages: React.FC<Props> = ({ value }) => {
  const [animatedValue] = useState(new Animated.Value(1))
  const [display, setDisplay] = useState(false)

  const animate = () => {
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: 30,
      duration: 3000,
      easing: Easing.ease,
    }).start((finished) => {
      animatedValue.setValue(0)
      setDisplay(false)
    })
  }

  useEffect(() => {
    if (value) {
      setDisplay(true)
      animate()
    }
  }, [value])

  return (
    <Animated.View
      style={{
        position: 'absolute',
        zIndex: display ? 10000 : -1000,
        transform: [{ scale: animatedValue }],
      }}
    >
      <Text
        style={{
          color: '#850607',
          fontSize: 30,
          fontWeight: 'bold',
          fontFamily: 'creepster',
        }}
      >
        {value}
      </Text>
    </Animated.View>
  )
}

export default Damages
