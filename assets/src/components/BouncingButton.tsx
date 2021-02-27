import React, { useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import { Button } from '../rickui'

type Props = {
  onPress: () => void
  title: string
  display: boolean
}

const BouncingButton: React.FC<Props> = ({ onPress, title, display }) => {
  const attackButtonOpacity = new Animated.Value(0)

  const width = attackButtonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  })

  const height = attackButtonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  })

  const animate = (v: number) => {
    attackButtonOpacity.setValue(0)
    Animated.timing(attackButtonOpacity, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1200,
      easing: Easing.bounce,
    }).start()
  }

  useEffect(() => {
    animate(display ? 1 : 0)
  }, [display])

  return (
    <Animated.View
      style={{
        opacity: attackButtonOpacity,
        width: width,
        height: height,
      }}
    >
      <Button title={title} onPress={onPress} />
    </Animated.View>
  )
}

export default BouncingButton
