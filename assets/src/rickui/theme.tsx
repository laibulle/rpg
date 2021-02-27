import React, { useState } from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { css } from '@emotion/native'

export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'fluid'

export const baseRadius = 5

export type Alignement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type SpacingProperty =
  | 'mt-0'
  | 'mt-1'
  | 'mt-2'
  | 'mt-3'
  | 'mt-4'
  | 'mt-5'
  | 'mb-0'
  | 'mb-1'
  | 'mb-2'
  | 'mb-3'
  | 'mb-4'
  | 'mb-5'
  | 'ml-0'
  | 'ml-1'
  | 'ml-2'
  | 'ml-3'
  | 'ml-4'
  | 'ml-5'
  | 'mr-0'
  | 'mr-1'
  | 'mr-2'
  | 'mr-3'
  | 'mr-4'
  | 'mr-5'
  | 'pt-0'
  | 'pt-1'
  | 'pt-2'
  | 'pt-3'
  | 'pt-4'
  | 'pt-5'
  | 'pb-0'
  | 'pb-1'
  | 'pb-2'
  | 'pb-3'
  | 'pb-4'
  | 'pb-5'
  | 'pl-0'
  | 'pl-1'
  | 'pl-2'
  | 'pl-3'
  | 'pl-4'
  | 'pl-5'
  | 'pr-0'
  | 'pr-1'
  | 'pr-2'
  | 'pr-3'
  | 'pr-4'
  | 'pr-5'

export type ThemeVariables = {
  primaryColor?: string
  roundedRatio?: number
}

export const Padding1: SpacingProperty[] = ['pt-1', 'pb-1', 'pl-1', 'pr-1']
export const Padding2: SpacingProperty[] = ['pt-2', 'pb-2', 'pl-2', 'pr-2']
export const Padding3: SpacingProperty[] = ['pt-3', 'pb-3', 'pl-3', 'pr-3']
export const Padding4: SpacingProperty[] = ['pt-4', 'pb-4', 'pl-4', 'pr-4']
export const Padding5: SpacingProperty[] = ['pt-5', 'pb-5', 'pl-5', 'pr-5']

export const Margin1: SpacingProperty[] = ['mt-1', 'mb-1', 'ml-1', 'mr-1']
export const Margin3: SpacingProperty[] = ['mt-3', 'mb-3', 'ml-3', 'mr-3']

export const spacer = () => 10

const text: TextStyle = {
  fontFamily: 'poppins',
  color: 'white',
  fontSize: 14,
}
const flexRow = { display: 'flex', flexDirection: 'row' } as ViewStyle
const flexRowCenter = {
  ...flexRow,
  justifyContent: 'center',
  alignItems: 'center',
} as ViewStyle
const flexColumn = { display: 'flex', flexDirection: 'column' } as ViewStyle
const flexColumnCenter = {
  ...flexColumn,
  justifyContent: 'center',
  alignItems: 'center',
} as ViewStyle

const spacerMult = (v: number) => spacer() * v

let variables = {
  primaryColor: '#ff6a00',
  roundedRatio: 1,
  backgroundColor: '#ffffff',
}

const styles: any = {
  formBorder: {
    borderColor: variables.primaryColor,
    borderWidth: 1,
    borderRadius: baseRadius * variables.roundedRatio,
    padding: 15,
  },
  shadow: {
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  disabled: { opacity: 0.5 },
  enabled: { opacity: 1 },
  h1: { ...text, ...{ fontSize: 40, fontWeight: 'bold' } } as TextStyle,
  h2: { ...text, ...{ fontSize: 30, fontWeight: 'bold' } } as TextStyle,
  h3: { ...text, ...{ fontSize: 30, fontWeight: 'bold' } } as TextStyle,
  h4: { ...text, ...{ fontSize: 20, fontWeight: 'bold' } } as TextStyle,
  h5: { ...text, ...{ fontSize: 16, fontWeight: 'bold' } } as TextStyle,
  text,
  flexRow,
  flexColumn,
  flexColumnCenter,
  flexRowCenter,
  header: {
    fontFamily: 'nunito',
    //color: 'inherit',
    fontSize: 16,
  } as ViewStyle,
  pt3: { paddingTop: spacerMult(3) } as ViewStyle,
  pb3: { paddingBottom: spacerMult(3) } as ViewStyle,
  pl3: { paddingLeft: spacerMult(3) } as ViewStyle,
  pr3: { paddingRight: spacerMult(3) } as ViewStyle,
  p3: { padding: spacerMult(3) } as ViewStyle,
  mt3: { marginTop: spacerMult(3) } as ViewStyle,
  mb3: { marginBottom: spacerMult(3) } as ViewStyle,
  ml3: { marginLeft: spacerMult(3) } as ViewStyle,
  mr3: { marginRight: spacerMult(3) } as ViewStyle,
  m3: { margin: spacerMult(3) } as ViewStyle,
  pt2: { paddingTop: spacerMult(2) } as ViewStyle,
  pb2: { paddingBottom: spacerMult(2) } as ViewStyle,
  pl2: { paddingLeft: spacerMult(2) } as ViewStyle,
  pr2: { paddingRight: spacerMult(2) } as ViewStyle,
  p2: { padding: spacerMult(2) } as ViewStyle,
  mt2: { marginTop: spacerMult(2) } as ViewStyle,
  mb2: { marginBottom: spacerMult(2) } as ViewStyle,
  ml2: { marginLeft: spacerMult(2) } as ViewStyle,
  mr2: { marginRight: spacerMult(2) } as ViewStyle,
  m2: { margin: spacerMult(2) } as ViewStyle,
  pt1: { paddingTop: spacerMult(1) } as ViewStyle,
  pb1: { paddingBottom: spacerMult(1) } as ViewStyle,
  pl1: { paddingLeft: spacerMult(1) } as ViewStyle,
  pr1: { paddingRight: spacerMult(1) } as ViewStyle,
  p1: { padding: spacerMult(1) } as ViewStyle,
  mt1: { marginTop: spacerMult(1) } as ViewStyle,
  mb1: { marginBottom: spacerMult(1) } as ViewStyle,
  ml1: { marginLeft: spacerMult(1) } as ViewStyle,
  mr1: { marginRight: spacerMult(1) } as ViewStyle,
  m1: { margin: spacerMult(1) } as ViewStyle,
  pt4: { paddingTop: spacerMult(4) } as ViewStyle,
  pb4: { paddingBottom: spacerMult(4) } as ViewStyle,
  pl4: { paddingLeft: spacerMult(4) } as ViewStyle,
  pr4: { paddingRight: spacerMult(4) } as ViewStyle,
  p4: { padding: spacerMult(4) } as ViewStyle,
  mt4: { marginTop: spacerMult(4) } as ViewStyle,
  mb4: { marginBottom: spacerMult(4) } as ViewStyle,
  ml4: { marginLeft: spacerMult(4) } as ViewStyle,
  mr4: { marginRight: spacerMult(4) } as ViewStyle,
  m4: { margin: spacerMult(4) } as ViewStyle,
  pt5: { paddingTop: spacerMult(5) } as ViewStyle,
  pb5: { paddingBottom: spacerMult(5) } as ViewStyle,
  pl5: { paddingLeft: spacerMult(5) } as ViewStyle,
  pr5: { paddingRight: spacerMult(5) } as ViewStyle,
  p5: { padding: spacerMult(5) } as ViewStyle,
  mt5: { marginTop: spacerMult(5) } as ViewStyle,
  mb5: { marginBottom: spacerMult(5) } as ViewStyle,
  ml5: { marginLeft: spacerMult(5) } as ViewStyle,
  mr5: { marginRight: spacerMult(5) } as ViewStyle,
  m5: { margin: spacerMult(5) } as ViewStyle,
}

let nativeStyles: any = {}

Object.keys(styles).forEach((k) => {
  nativeStyles[k] = css(styles[k])
})

export let theme = {
  ...variables,
  styles: nativeStyles,
}

type Theme = any

export const ThemeContext = React.createContext([
  theme as Theme,
  (() => {}) as () => void,
])

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const [t, setT] = useState(theme)
  return (
    <ThemeContext.Provider value={[t, setT]}>{children}</ThemeContext.Provider>
  )
}
