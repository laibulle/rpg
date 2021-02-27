import React, { useState } from 'react'
import { Dimensions, View, ViewProps } from 'react-native'

type Props = {} & ViewProps

const PageWrapper: React.FC<Props> = (props) => {
  const getMaxHeight = () => {
    return Dimensions.get('window').height
  }

  const [height, setHeight] = useState(getMaxHeight())

  return (
    <View
      style={{
        ...(props.style as any),
        height,
      }}
    >
      {props.children}
    </View>
  )
}

export default PageWrapper
