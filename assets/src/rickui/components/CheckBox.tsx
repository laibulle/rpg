import React, { useContext } from 'react'
import { CheckBox, CheckBoxProps } from 'react-native'
import { ThemeContext } from '../theme'

type Props = {} & CheckBoxProps

const CheckBoxC: React.FC<Props> = (props) => {
  const [theme] = useContext(ThemeContext)
  return <CheckBox {...(props as any)} />
}

export default CheckBoxC
