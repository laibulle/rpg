import React from 'react'
import { View } from '..'

export type CellContent = string | React.ReactNode
type Props = {}

const TableCell: React.FC<Props> = (props) => {
  return (
    <View style={{ flex: 1, alignSelf: 'stretch' }} {...props}>
      {props.children}
    </View>
  )
}

export default TableCell
