import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Layout from '../Layout'
import { State } from '../reducers'
import { View, Text, Button, H3 } from '../rickui'

type Props = {}

const AutoLobbyScreen: React.FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })

  const fight = useSelector((state: State) => state.game.autoFight!)
  const selectedCharacter = useSelector(
    (state: State) => state.game.selectedCharacter!
  )

  const [t] = useTranslation()

  return (
    <Layout>
      <View>
        <Button
          title={t('goHome')}
          onPress={() => navigation.navigate('Home')}
        />
        <H3>
          {fight.winner == selectedCharacter.id
            ? t('youWin')
            : fight.winner != null
            ? t('draw')
            : t('youLoose')}{' '}
        </H3>
        {fight.rounds.map((round, i) => {
          return (
            <View key={`round-${i}`}>
              <Text>
                {' '}
                {fight.winner == selectedCharacter.id
                  ? t('you')
                  : t('opponent')}{' '}
                {round.damages} point(s)
              </Text>
            </View>
          )
        })}
      </View>
    </Layout>
  )
}

export default AutoLobbyScreen
