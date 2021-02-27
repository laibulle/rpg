import React from 'react'
import { useTranslation } from 'react-i18next'

import { Characters_characters } from '../graphql/__generated__/Characters'
import { Button, H2, Spacing, View } from '../rickui'
import BouncingButton from './BouncingButton'
import CharacterOverview from './CharacterOverview'
import HealthBar from './HealthBar'

export type Characterstatus = {
  character: Characters_characters
  health: number
  user: { id: string; name: string }
  active: boolean
}

type Props = {
  status?: Characterstatus
  winner?: string
  onleave?: () => void
  onAttack?: () => void
  isMe: boolean
}

const CharacterFight: React.FC<Props> = ({
  status,
  winner,
  onleave,
  onAttack,
  isMe,
}) => {
  const [t] = useTranslation()

  return (
    <View style={{ alignItems: 'center' }}>
      <HealthBar
        currentHealth={status?.health || 1}
        maxHealth={status?.health || 1}
      />
      <Spacing spacings="mb-2" />

      <CharacterOverview character={status?.character} />
      <Spacing spacings="mb-2" />

      {isMe ? (
        <>
          <BouncingButton
            display={status?.active || false}
            title={t('attack')}
            onPress={() => {
              if (onAttack) onAttack()
            }}
          />

          {winner && winner === status!.user.id ? (
            <H2>{t('youWin')}</H2>
          ) : (
            <></>
          )}

          {winner && winner !== status!.user.id ? (
            <H2>{t('youLoose')}</H2>
          ) : (
            <></>
          )}

          <Spacing spacings="mb-2" />

          {winner ? (
            <Button
              title={`${winner === status!.user.id ? '🏆' : '😞'} ${t(
                'goHome'
              )}`}
              onPress={() => {
                if (onleave) {
                  onleave()
                }
              }}
            />
          ) : (
            <></>
          )}
          <Spacing spacings="mb-2" />
        </>
      ) : (
        <></>
      )}
    </View>
  )
}

export default CharacterFight
