import React from 'react'
import { View, ViewProps } from 'react-native'
import useDimensions from '../hooks/useDimensions'

type Props = {} & ViewProps

const PageCenter: React.FC<Props> = (props) => {
  const dimensions = useDimensions()

  return (
    <View
      style={[
        {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: dimensions.height,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  )
}

export default PageCenter
