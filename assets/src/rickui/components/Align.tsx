import React, { ReactText } from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'

import { Alignement } from '../theme'

type Props = {
  children: React.ReactElement | ReactText[]
  alignement: Alignement
} & ViewProps

const styles = StyleSheet.create({
  flexJStart: { display: 'flex', justifyContent: 'flex-start' },
  flexJEnd: { display: 'flex', justifyContent: 'flex-end' },
  jcenter: { display: 'flex', justifyContent: 'center' },
  flexAStart: { display: 'flex', alignItems: 'flex-start' },
  flexAEnd: { display: 'flex', alignItems: 'flex-end' },
  acenter: { display: 'flex', alignItems: 'center' },
})

const Align: React.FC<Props> = (props) => {
  const { children, alignement } = props
  const parts = alignement.split('-')

  const getAlignItems = (part: string, type: 'justify' | 'align'): any => {
    if (type == 'align') {
      switch (part) {
        case 'left':
          return styles.flexJStart
        case 'top':
          return styles.flexJStart
        case 'right':
          return styles.flexJEnd
        case 'bottom':
          return styles.flexJEnd
        default:
          return styles.jcenter
      }
    }

    switch (part) {
      case 'left':
        return styles.flexAStart
      case 'top':
        return styles.flexAStart
      case 'right':
        return styles.flexAEnd
      case 'bottom':
        return styles.flexAEnd
      default:
        return styles.acenter
    }
  }

  const justifyContent = getAlignItems(parts[0], 'justify')
  const alignItems = getAlignItems(parts[1], 'align')

  return (
    <View style={[justifyContent, alignItems, props.style as any]}>
      {children}
    </View>
  )
}

export default Align
