import React from 'react'
import { View } from '..'

type Props = {}

const Table: React.FC<Props> = (props) => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      {...props}
    >
      {props.children}
    </View>
  )
}

export default Table
