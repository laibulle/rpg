import { useNavigation } from '@react-navigation/core'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import CharacterOverview from '../components/CharacterOverview'
import Layout from '../Layout'
import { State } from '../reducers'
import { Button, Spacing, TextInput, View, ThemeContext } from '../rickui'

type Props = {}

const LobbiesScreen: React.FC<Props> = () => {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const [t] = useTranslation()

  const [lobby, setLobby] = useState('')
  const [theme] = useContext(ThemeContext)
  const character = useSelector((state: State) => state.game.selectedCharacter!)

  return (
    <Layout>
      <View>
        <Spacing spacings="mb-2" />

        <CharacterOverview character={character} />

        <TextInput
          value={lobby}
          onChangeText={setLobby}
          placeholder={t('lobby.placeholder')}
        />

        <Spacing spacings="mb-2" />

        <Button
          title={t('fight')}
          enabled={lobby.length > 3}
          onPress={() => {
            navigation.navigate('Lobby', { lobby })
          }}
        />

        <Spacing spacings="mb-2" />

        <Button
          title={t('goHome')}
          onPress={() => {
            navigation.navigate('Home', { token: Date.now() })
          }}
        />
      </View>
    </Layout>
  )
}

export default LobbiesScreen
