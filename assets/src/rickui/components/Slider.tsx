import Slider from '@react-native-community/slider'
import React, { useContext } from 'react'
import { SliderProps } from 'react-native'
import { ThemeContext } from '..'

type Props = {} & SliderProps

const SliderC: React.FC<Props> = (props) => {
  const [theme] = useContext(ThemeContext)
  return (
    <Slider
      {...{
        minimumTrackTintColor: theme.primaryColor,
        thumbTintColor: theme.primaryColor,
        ...(props as any),
      }}
    />
  )
}

export default SliderC
