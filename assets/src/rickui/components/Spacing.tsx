import React from 'react'
import { View, ViewProps } from 'react-native'
import { spacer, SpacingProperty } from '../theme'

type Props = { spacings: SpacingProperty | SpacingProperty[] } & ViewProps

const propertyPositionTranslations: { [id: string]: string } = {
  t: 'Top',
  b: 'Bottom',
  l: 'Left',
  r: 'Right',
}

const propertyTranslation: { [id: string]: string } = {
  m: 'margin',
  p: 'padding',
}

const Spacing: React.FC<Props> = ({ style, children, spacings }) => {
  const nSpacings = !(spacings.constructor === Array)
    ? [spacings as SpacingProperty]
    : (spacings as SpacingProperty[])

  const g = (space: SpacingProperty) => {
    const parts = space.split('-')
    const getPropertyPosition = (p: string) => propertyPositionTranslations[p]

    const propertyName =
      propertyTranslation[parts[0][0]] + getPropertyPosition(parts[0][1])
    const value = parseFloat(parts[1]) * spacer()
    return [propertyName, value]
  }

  const properties = () => {
    const p: any = {}

    nSpacings.forEach((element) => {
      const [prop, v] = g(element)
      p[prop] = v
    })

    return p
  }

  //{ ...properties(), ...(style as any) }

  return <View style={[properties(), style]}>{children}</View>
}

export default Spacing
