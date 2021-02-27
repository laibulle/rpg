import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'

import { Size } from '../theme'
import useDimensions from '../hooks/useDimensions'

type Props = { breakpoint?: Size; ref?: any } & ViewProps

const styles = StyleSheet.create({
  default: { margin: 'auto' },
})

const Container: React.FC<Props> = (props) => {
  const breakpoint: Size = props.breakpoint ? props.breakpoint : 'sm'
  const breakpoints = [
    [1200, 1140],
    [992, 960],
    [768, 720],
    [576, 540],
  ]

  const dimensions = useDimensions()

  const getMaxWidth = (): number | '100%' => {
    const defaultValue = '100%'
    const sizes = ['sm', 'md', 'lg', 'xl']

    for (let i = 0; i < breakpoints.length; i++) {
      const [currentBreakpoint, width] = breakpoints[i]

      if (dimensions.width >= currentBreakpoint) {
        if (i == 0) return breakpoint === 'fluid' ? defaultValue : width
        return sizes.slice(0, -i).includes(breakpoint) ? width : defaultValue
      }
    }

    return defaultValue
  }

  return (
    <View
      {...props}
      style={[styles.default, { width: getMaxWidth() }, props.style]}
    >
      {props.children}
    </View>
  )
}

export default Container
