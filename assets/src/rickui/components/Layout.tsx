import React, { useContext } from 'react'
import { View, ViewProps } from 'react-native'
import { ThemeContext } from '..'

type Props = {} & ViewProps

const Layout: React.FC<Props> = ({ children }) => {
  const [theme] = useContext(ThemeContext)

  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>{children}</View>
  )
}

export default Layout
