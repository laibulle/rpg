import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import { CHARACTERS } from '../graphql/queries'
import { View, Text, Button, ThemeContext } from '../rickui'
import {
  Characters,
  Characters_characters,
} from '../graphql/__generated__/Characters'
import { State } from '../reducers'
import { getCharacterImage } from '../components/SkinSelector'
import { storeSelectedCharacter } from '../actions'
import Layout from '../Layout'
import { useTranslation } from 'react-i18next'

type Props = {}

const styles = StyleSheet.create({
  charactersContainers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { width: 200 },
})

const isCharacterKo = (character: Characters_characters) => {
  return character.reanimateAt == null
    ? false
    : moment().isAfter(character.reanimateAt)
}

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const [theme] = useContext(ThemeContext)

  const dispatch = useDispatch()
  const [t] = useTranslation()

  const auth = useSelector((state: State) => state.auth.auth)
  const selectedCharacter = useSelector(
    (state: State) => state.game.selectedCharacter
  )

  const { data, loading } = useQuery<Characters>(CHARACTERS, {
    fetchPolicy: 'no-cache',
    variables: { user_id: auth?.user.id },
  })

  useEffect(() => {
    if (data && data.characters && data.characters.length > 0) {
      dispatch(storeSelectedCharacter(data!.characters[0]))
    }
  }, [data])

  if (loading) return <Text>Loading...</Text>

  return (
    <Layout>
      <View>
        <View style={[styles.charactersContainers, theme.styles.mb2]}>
          {data!.characters!.map((x) => {
            const ko = isCharacterKo(x)

            return (
              <TouchableOpacity
                style={{
                  opacity: ko ? theme.styles.disabled : theme.styles.enabled,
                }}
                key={`character-${x.id}`}
                onPress={() => dispatch(storeSelectedCharacter(x))}
              >
                <Image
                  resizeMode="contain"
                  source={getCharacterImage(x.skin)}
                  style={
                    selectedCharacter?.id === x.id
                      ? { width: 300, height: 300 }
                      : { width: 100, height: 100 }
                  }
                />
              </TouchableOpacity>
            )
          })}
        </View>

        {selectedCharacter ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Button
              title={`${isCharacterKo(selectedCharacter) ? 'KO' : t('play')}`}
              style={[
                styles.button,
                theme.styles.mb2,
                { opacity: isCharacterKo(selectedCharacter) ? 0.5 : 1 },
              ]}
              onPress={() => {
                if (!isCharacterKo(selectedCharacter)) {
                  navigation.navigate('Lobbies')
                }
              }}
            />

            <Button
              title={t('edit')}
              style={[styles.button, theme.styles.mb2]}
              onPress={() => {
                navigation.navigate('EditCharacter', {
                  characterId: selectedCharacter!.id,
                })
              }}
            />

            <Button
              enabled={data!.characters!.length < 10}
              title={t('newCharacter')}
              style={[styles.button, theme.styles.mb2]}
              onPress={() => {
                navigation.navigate('NewCharacter')
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </Layout>
  )
}

export default LoginScreen
