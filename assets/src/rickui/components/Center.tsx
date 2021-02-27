import React, { ReactText } from 'react'
import { ViewProps } from 'react-native'
import Align from './Align'

type Props = { children: React.ReactElement | ReactText[] } & ViewProps

const Center: React.FC<Props> = (props) => {
  return (
    <Align alignement="middle-center" {...props}>
      {props.children}
    </Align>
  )
}

export default Center
