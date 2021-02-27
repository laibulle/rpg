import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export type ScreenSize = 1 | 2 | 3 | 4 | 5

export type SizeInfo = {
  width: number
  height: number
  isMobile: boolean
  screenSize: ScreenSize
}

export const getScreenSize = (width: number): ScreenSize => {
  return width > 1920
    ? 5
    : width > 1280
    ? 4
    : width > 1024
    ? 3
    : width > 640
    ? 2
    : 1
}

export default () => {
  const [info, setInfo] = useState<SizeInfo>({
    width: 0,
    height: 0,
    isMobile: false,
    screenSize: 0 as ScreenSize,
  })

  const handler = () => {
    const dimensions = Dimensions.get('window')
    const width = dimensions.width

    setInfo({
      width: dimensions.width,
      height: dimensions.height,
      isMobile: dimensions.width <= 640,
      screenSize: getScreenSize(width),
    })
  }

  useEffect(() => {
    handler()
    window.addEventListener('resize', handler, true)
  }, [])

  return info
}
