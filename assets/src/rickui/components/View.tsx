import React from 'react'
import { View, ViewProps } from 'react-native'

type Props = ViewProps

const ViewCustom: React.FC<Props> = (props) => {
  return <View {...props}>{props.children}</View>
}

export default ViewCustom
