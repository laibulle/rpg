import React, { useContext } from 'react'
import { Text, TextProps } from 'react-native'
import { ThemeContext } from '..'

type Props = {} & TextProps

const CustomText: React.FC<Props> = (props) => {
  const [theme] = useContext(ThemeContext)

  const getStyle = () => {
    switch ((props as any)['aria-level']) {
      case '1':
        return theme.styles.h1
      case '2':
        return theme.styles.h2
      case '3':
        return theme.styles.h3
      case '4':
        return theme.styles.h4
      case '5':
        return theme.styles.h5
    }
    return theme.styles.h1
  }

  return (
    <Text
      {...props}
      style={[
        props.accessibilityRole === 'header'
          ? [theme.styles.header, getStyle()]
          : theme.styles.text,
        props.style,
      ]}
    >
      {props.children}
    </Text>
  )
}

export default CustomText
