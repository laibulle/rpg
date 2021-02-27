import React, { useContext } from 'react'
import { View, Text, ThemeContext } from '..'

import TableCell, { CellContent } from './TableCell'

type Props = {
  data: Array<CellContent>
}

const TableRow: React.FC<Props> = ({ data }) => {
  const [theme] = useContext(ThemeContext)

  const renderContent = (v: CellContent) => {
    if (typeof v == 'string') {
      return <Text>{v}</Text>
    }

    return v
  }

  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        ...theme.styles.pt1,
        ...theme.styles.pb1,
      }}
    >
      {data.map((item, i) => {
        return <TableCell key={`${i}`}>{renderContent(item)}</TableCell>
      })}
    </View>
  )
}

export default TableRow
