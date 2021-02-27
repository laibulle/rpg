import React, { useContext } from 'react'
import { Image } from 'react-native'
import { Characters_characters } from '../graphql/__generated__/Characters'

import { ThemeContext } from '../rickui'

type Props = { character?: Characters_characters }

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

const SkinSelector: React.FC<Props> = ({ character }) => {
  const [theme] = useContext(ThemeContext)

  return (
    <Image
      resizeMode="contain"
      source={getCharacterImage(character?.skin || 1)}
      style={{ width: 300, height: 300 }}
    />
  )
}

export default SkinSelector
