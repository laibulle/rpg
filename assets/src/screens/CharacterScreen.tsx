import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import {
  Spacing,
  ThemeContext,
  View,
  Button,
  Center,
  Bold,
  H2,
} from '../rickui'
import SkillInput from '../components/SkillInput'
import SkinSelector from '../components/SkinSelector'
import Layout from '../Layout'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Character } from '../graphql/__generated__/Character'
import { CHARACTER } from '../graphql/queries'
import { UpsertCharacter } from '../graphql/__generated__/UpsertCharacter'
import { UPSERT_CHARACTER } from '../graphql/mutations'

const styles = StyleSheet.create({
  button: { width: 200 },
})

type Props = {}

type CharacterForm = {
  skin: number
  magik: number
  health: number
  attack: number
  defense: number
  skillPoints: number
}

type Skill = 'magik' | 'health' | 'attack' | 'defense'

const CharacterScreen: React.FC<Props> = () => {
  const [theme] = useContext(ThemeContext)
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const [t] = useTranslation()

  const route = useRoute()

  const [initialCharacter, setInitialCharacter] = useState<CharacterForm>({
    skin: 1,
    magik: 0,
    health: 0,
    attack: 0,
    defense: 0,
    skillPoints: 12,
  })

  const onCompletedFetch = (data: Character) => {
    setInitialCharacter({ ...(data.character! as any) })
    setCharacter({ ...(data.character! as any) })
  }

  const onCompletedUpsert = (data: UpsertCharacter) => {
    navigation.navigate('Home', { token: Date.now() })
  }

  const [fetchCharacter] = useLazyQuery<Character>(CHARACTER, {
    fetchPolicy: 'no-cache',
    onCompleted: onCompletedFetch,
  })

  const [upsertCharacter, { loading }] = useMutation<UpsertCharacter>(
    UPSERT_CHARACTER,
    {
      onCompleted: onCompletedUpsert,
    }
  )

  const [character, setCharacter] = useState<CharacterForm>({
    ...initialCharacter,
  })

  const updateSkill = (skillName: Skill, valueToAdd: number) => {
    const cost =
      skillName == 'health' || character[skillName] <= 0
        ? 1
        : Math.ceil(character[skillName] / 5)

    if (character.skillPoints >= cost) {
      const newCharacter = {
        ...character,
        skillPoints: character.skillPoints - cost,
      }
      newCharacter[skillName] = newCharacter[skillName] + valueToAdd
      setCharacter(newCharacter)
    }
  }

  useEffect(() => {
    const characterId = route.params
      ? (route!.params! as any).characterId!
      : undefined

    if (characterId) {
      fetchCharacter({ variables: { id: characterId } })
    }
    console.log(characterId)
  }, [route])

  return (
    <Layout>
      <View>
        <Center>
          <>
            <H2 style={{ color: theme.primaryColor }}>Rank: {1}</H2>
            <Bold style={{ color: theme.primaryColor }}>
              {character.skillPoints} point(s) available{' '}
            </Bold>
          </>
        </Center>

        <View
          style={[
            theme.styles.flexRow,
            theme.styles.mt2,
            theme.styles.mb2,
            {
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            },
          ]}
        >
          <View style={theme.styles.flexColumn}>
            <SkillInput
              onChange={(value) => updateSkill('health', value)}
              canAdd={character.skillPoints > 0}
              label="health"
              value={character.health}
            />

            <SkillInput
              onChange={(value) => updateSkill('magik', value)}
              canAdd={character.skillPoints > 0}
              label="magik"
              value={character.magik}
            />

            <SkillInput
              onChange={(value) => updateSkill('attack', value)}
              canAdd={character.skillPoints > 0}
              label="attack"
              value={character.attack}
            />

            <SkillInput
              onChange={(value) => updateSkill('defense', value)}
              canAdd={character.skillPoints > 0}
              label="defense"
              value={character.defense}
            />
          </View>

          <Spacing spacings={'ml-2'}>
            <SkinSelector
              onChange={(skin) => setCharacter({ ...character, skin })}
              skin={character.skin}
            />
          </Spacing>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Button
            loading={loading}
            title={t('reset')}
            style={[styles.button, theme.styles.mb2]}
            onPress={() => {
              if (!loading) {
                setCharacter(initialCharacter)
              }
            }}
          />

          <Button
            loading={loading}
            title={t('cancel')}
            style={[styles.button, theme.styles.mb2]}
            onPress={() => {
              if (!loading) {
                navigation.navigate('Home', { token: Date.now() })
              }
            }}
          />

          <Button
            loading={loading}
            title={t('save')}
            style={[styles.button, theme.styles.mb2]}
            onPress={() => {
              if (!loading) {
                upsertCharacter({
                  variables: {
                    input: {
                      ...character,
                      __typename: undefined,
                      rank: undefined,
                    },
                  },
                })
              }
            }}
          />
        </View>
      </View>
    </Layout>
  )
}

export default CharacterScreen
