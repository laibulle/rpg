import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/core'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { storeAutofight } from '../actions'

import CharacterOverview from '../components/CharacterOverview'
import { FIGHT } from '../graphql/mutations'
import { Fight } from '../graphql/__generated__/Fight'
import Layout from '../Layout'
import { State } from '../reducers'
import { Button, Spacing, TextInput, View, ThemeContext } from '../rickui'

type Props = {}

const LobbiesScreen: React.FC<Props> = () => {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const [t] = useTranslation()
  const dispatch = useDispatch()

  const [lobby, setLobby] = useState('')
  const selectedCharacter = useSelector(
    (state: State) => state.game.selectedCharacter
  )
  const character = useSelector((state: State) => state.game.selectedCharacter!)

  const onCompleted = (data: Fight) => {
    dispatch(storeAutofight(data.fight!))
    navigation.navigate('AutoLobby')
  }

  const [autofight, { loading: autofightLoading }] = useMutation<Fight>(FIGHT, {
    onCompleted,
  })

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
          title={t('fightFriend')}
          enabled={lobby.length > 3}
          onPress={() => {
            navigation.navigate('Lobby', { lobby })
          }}
        />

        <Spacing spacings="mb-2" />

        <Button
          loading={autofightLoading}
          title={t('autoFight')}
          onPress={() => {
            autofight({ variables: { character_id: selectedCharacter?.id } })
          }}
        />

        <Spacing spacings="mb-2" />

        <Button
          title={t('goHome')}
          onPress={() => {
            navigation.navigate('Home', { token: Date.now() })
          }}
        />
        <Spacing spacings="mb-2" />
      </View>
    </Layout>
  )
}

export default LobbiesScreen
