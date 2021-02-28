import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { storeSelectedCharacter } from '../actions'
import { Characters_characters } from '../graphql/__generated__/Characters'
import { State } from '../reducers'
import { ThemeContext } from '../rickui'
import { getCharacterImage } from './CharacterOverview'

export const isCharacterKo = (character: Characters_characters) => {
  return character.reanimateAt == null
    ? false
    : moment().isBefore(moment(character.reanimateAt))
}

type Props = {
  character: Characters_characters
}

const CharacterHome: React.FC<Props> = ({ character }) => {
  const [theme] = useContext(ThemeContext)
  const ko = isCharacterKo(character)
  const dispatch = useDispatch()
  const selectedCharacter = useSelector(
    (state: State) => state.game.selectedCharacter
  )

  return (
    <TouchableOpacity
      style={{
        opacity: ko ? theme.styles.disabled : theme.styles.enabled,
      }}
      key={`character-${character.id}`}
      onPress={() => dispatch(storeSelectedCharacter(character))}
    >
      <Image
        resizeMode="contain"
        source={getCharacterImage(character.skin)}
        style={
          selectedCharacter?.id === character.id
            ? { width: 300, height: 300 }
            : { width: 100, height: 100 }
        }
      />
    </TouchableOpacity>
  )
}

export default CharacterHome
