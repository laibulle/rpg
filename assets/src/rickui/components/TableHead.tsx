import React from 'react'
import { View, H5 } from '..'

import TableCell from './TableCell'

type Props = {
  data: Array<string>
}

const TableHead: React.FC<Props> = ({ data }) => {
  return (
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
      {data.map((item, i) => {
        return (
          <TableCell key={`thead-${i}`}>
            <H5>{item}</H5>
          </TableCell>
        )
      })}
    </View>
  )
}

export default TableHead
