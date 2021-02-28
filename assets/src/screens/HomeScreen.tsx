import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import { CHARACTERS } from '../graphql/queries'
import { View, Text, Button, ThemeContext } from '../rickui'
import { Characters } from '../graphql/__generated__/Characters'
import { State } from '../reducers'
import { storeSelectedCharacter } from '../actions'
import Layout from '../Layout'
import CharacterHome, { isCharacterKo } from '../components/CharacterHome'
import moment from 'moment'

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

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const [theme] = useContext(ThemeContext)
  const route = useRoute()
  const [timeRemaining, setTimeRemaining] = useState('')
  const [interval, storeInterval] = useState(setInterval(() => {}, 1000))

  const dispatch = useDispatch()
  const [t] = useTranslation()

  const auth = useSelector((state: State) => state.auth.auth)
  const selectedCharacter = useSelector(
    (state: State) => state.game.selectedCharacter
  )

  const { data, loading, refetch } = useQuery<Characters>(CHARACTERS, {
    fetchPolicy: 'network-only',
    variables: { user_id: auth?.user.id },
  })

  useEffect(() => {
    console.log('appear')
    refetch()
  }, [route.params])

  useEffect(() => {
    if (data && data.characters && data.characters.length > 0) {
      dispatch(storeSelectedCharacter(data!.characters[0]))
    }
  }, [data])

  useEffect(() => {
    if (selectedCharacter && isCharacterKo(selectedCharacter)) {
      clearInterval(interval)
      storeInterval(
        setInterval(() => {
          const diff = moment.duration(
            moment(selectedCharacter.reanimateAt).diff(moment())
          )
          setTimeRemaining(
            diff.minutes() +
              ':' +
              (diff.seconds() < 10 ? '0' : '') +
              diff.seconds()
          )
        }, 1000)
      )
    }
  }, [selectedCharacter])

  if (loading) return <Text>Loading...</Text>

  return (
    <Layout>
      <View>
        <View style={[styles.charactersContainers, theme.styles.mb2]}>
          {data!.characters!.map((x) => (
            <CharacterHome key={`character-${x.id}`} character={x} />
          ))}
        </View>

        {selectedCharacter ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Button
              title={`${
                isCharacterKo(selectedCharacter) ? timeRemaining : t('play')
              }`}
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
