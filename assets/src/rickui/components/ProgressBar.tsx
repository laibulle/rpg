import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '..'

type Props = { value: number }

const ProgressBar: React.FC<Props> = ({ value }) => {
  const [theme] = useContext(ThemeContext)

  return (
    <View
      style={{
        backgroundColor: 'lightgrey',
        width: '100%',
        height: 15,
        borderRadius: 15 * theme.roundedRatio,
      }}
    >
      <View
        style={{
          backgroundColor: theme.primaryColor,
          width: value < 0.05 ? 0 : value > 0.95 ? '100%' : `${value * 100}%`,
          height: 15,
          borderRadius: 15 * theme.roundedRatio,
        }}
      ></View>
    </View>
  )
}

export default ProgressBar
