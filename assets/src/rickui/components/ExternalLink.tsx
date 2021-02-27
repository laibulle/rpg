import React from 'react'

import Text from './Text'
import { ViewProps } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '..'

type Props = { style: ViewProps; href: string; target?: '_blank' }

const ExternalLink: React.FC<Props> = (props) => {
  const [theme] = useContext(ThemeContext)

  {
    /*// @ts-ignore */
  }
  return (
    <Text
      accessibilityRole="link"
      style={theme.styles.text}
      {...(props as any)}
    />
  )
}

export default ExternalLink
