import { TinyColor } from '@ctrl/tinycolor'
import { Dimensions, StyleSheet } from 'react-native'

export const isLight = (color: string): boolean =>
  new TinyColor(color).getBrightness() > 170

export const getSuitableTextColor = (color: string) =>
  isLight(color) ? 'black' : 'white'

const styles = StyleSheet.create({
  lightColor: { color: 'black' },
  darkColor: { color: 'white' },
})

export const getSuitableTextColorStyle = (color: string) =>
  isLight(color) ? styles.lightColor : styles.darkColor

export const getBrightness = (imageSrc: string): Promise<number> => {
  return new Promise((resolve) => {
    const img = document.createElement('img')
    img.src = imageSrc
    img.crossOrigin = 'anonymous'
    img.style.display = 'none'
    document.body.appendChild(img)
    let colorSum = 0

    img.onload = function () {
      const canvas = document.createElement('canvas')
      // @ts-ignore
      canvas.width = this.width

      // @ts-ignore
      canvas.height = this.height
      const ctx = canvas.getContext('2d')
      // @ts-ignore
      ctx!.drawImage(this, 0, 0)

      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      let r, g, b, avg

      for (let x = 0, len = data.length; x < len; x += 4) {
        r = data[x]
        g = data[x + 1]
        b = data[x + 2]
        avg = Math.floor((r + g + b) / 3)
        colorSum += avg
      }

      // @ts-ignore
      const brightness = Math.floor(colorSum / (this.width * this.height))

      resolve(brightness)
    }
  })
}
