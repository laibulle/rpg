import React, { useContext } from 'react'
import { View, ViewProps } from 'react-native'
import { ThemeContext } from '..'
import Text from './Text'

type Props = { text?: string; size?: number; color?: string } & ViewProps

const Circle: React.FC<Props> = ({ text, size, color, style, children }) => {
  const [theme] = useContext(ThemeContext)
  return (
    <View
      style={{
        backgroundColor: color ? color : theme.primaryColor,
        borderWidth: 1,
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 5,
        borderColor: 'lightgrey',
        borderRadius: (size ? size : 40) / 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: size ? size : 40,
        height: size ? size : 40,
        ...(style as any),
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{text}</Text>
      {children}
    </View>
  )
}

export default Circle
