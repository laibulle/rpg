import { useNavigation } from '@react-navigation/core'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import CharacterOverview from '../components/CharacterOverview'
import Layout from '../Layout'
import { State } from '../reducers'

import { Button, Spacing, TextInput, View, ThemeContext } from '../rickui'

type Props = {}

const LobbiesScreen: React.FC<Props> = () => {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })

  const [lobby, setLobby] = useState('')
  const [theme] = useContext(ThemeContext)
  const character = useSelector((state: State) => state.game.selectedCharacter!)

  return (
    <Layout>
      <View>
        <TextInput
          value={lobby}
          onChangeText={setLobby}
          placeholder="Enter lobby name"
        />

        <Spacing spacings="mb-2" />

        <Button
          title="Join lobby"
          enabled={lobby.length > 3}
          onPress={() => {
            navigation.navigate('Lobby', { lobby })
          }}
        />

        <Spacing spacings="mb-2" />

        <Button
          title="Go home"
          onPress={() => {
            navigation.navigate('Home')
          }}
        />

        <CharacterOverview character={character} />
      </View>
    </Layout>
  )
}

export default LobbiesScreen
