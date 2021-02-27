import React, { useRef } from 'react'
import {
  Text,
  ButtonProps,
  TouchableOpacity,
  Animated,
  ViewStyle,
  StyleSheet,
} from 'react-native'
import { getSuitableTextColorStyle } from '../helpers'

import { ThemeContext } from '../theme'

type Props = {
  enabled?: boolean
  loading?: boolean
  style?: ViewStyle | ViewStyle[]
  color?: string
} & ButtonProps

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
const CustomButton: React.FC<Props> = (props) => {
  const [theme] = React.useContext(ThemeContext)

  const isClickable = () => props.enabled !== false && props.loading !== true

  const enabledOrDisabledStyle = () =>
    isClickable() ? theme.styles.enabled : theme.styles.disabled

  const color = props.color ? props.color : theme.primaryColor
  const animatedValue = useRef(new Animated.Value(0)).current
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [color, 'black'],
  })

  const handlePressIn = () =>
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start()
  const handlePressOut = () =>
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start()

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityComponentType="button"
      onPress={(e) => {
        if (isClickable()) {
          props.onPress(e)
        }
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          theme.styles.shadow,
          enabledOrDisabledStyle(),
          {
            backgroundColor: backgroundColor,
            padding: 10,
            borderRadius: 5 * theme.roundedRatio,
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.5],
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          },
          props.style,
        ]}
      >
        <Text
          style={[
            theme.styles.header,
            getSuitableTextColorStyle(color),
            styles.text,
          ]}
        >
          {props.title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default CustomButton
