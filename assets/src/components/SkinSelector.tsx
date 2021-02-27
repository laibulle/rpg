import React, { useContext } from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'

import { Text, ThemeContext, View } from '../rickui'
import Arrow from './Arrow'

type Props = { skin: number; onChange: (skin: number) => void }

const SKINS_COUNT = 13

export const getCharacterImage = (number: number) => {
  // Do not dynamic require to avoid webpack issue
  switch (number) {
    case 1:
      return require('../../assets/characters/1.png')
    case 2:
      return require('../../assets/characters/2.png')
    case 3:
      return require('../../assets/characters/3.png')
    case 4:
      return require('../../assets/characters/4.png')
    case 5:
      return require('../../assets/characters/5.png')
    case 6:
      return require('../../assets/characters/6.png')
    case 7:
      return require('../../assets/characters/7.png')
    case 8:
      return require('../../assets/characters/8.png')
    case 9:
      return require('../../assets/characters/9.png')
    case 10:
      return require('../../assets/characters/10.png')
    case 11:
      return require('../../assets/characters/11.png')
    case 12:
      return require('../../assets/characters/12.png')
    case 13:
      return require('../../assets/characters/13.png')
  }
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
})

const SkinSelector: React.FC<Props> = ({ skin, onChange }) => {
  const [theme] = useContext(ThemeContext)

  return (
    <View style={[theme.styles.flexRow, styles.container]}>
      <Arrow
        direction="left"
        onPress={() => onChange(skin === 1 ? SKINS_COUNT : skin - 1)}
      />

      <Image
        resizeMode="contain"
        source={getCharacterImage(skin)}
        style={{ width: 250, height: 300 }}
      />

      <Arrow
        direction="right"
        onPress={() => onChange(skin === SKINS_COUNT ? 1 : skin + 1)}
      />
    </View>
  )
}

export default SkinSelector
