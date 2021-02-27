import React from 'react'

import { CellContent } from './TableCell'

import TableRow from './TableRow'

type Props = {
  data: Array<CellContent>[]
}

const TableRows: React.FC<Props> = (props) => {
  return (
    <>
      {props.data.map((item, i) => {
        return <TableRow key={`table-row-${i}`} data={item} />
      })}
    </>
  )
}

export default TableRows
