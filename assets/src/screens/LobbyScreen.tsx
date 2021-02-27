import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Channel } from 'phoenix'
import { useTranslation } from 'react-i18next'

import CharacterOverview from '../components/CharacterOverview'
import { SocketContext } from '../providers/SockerProvider'
import { State } from '../reducers'
import { Button, H2, Spacing, Text, ThemeContext, View } from '../rickui'
import HealthBar from '../components/HealthBar'
import { Characters_characters } from '../graphql/__generated__/Characters'
import Layout from '../Layout'
import Waiting from '../components/Waiting'
import LobbyChat from '../components/Chat/LobbyChat'

type Props = {}

export type Characterstatus = {
  character: Characters_characters
  health: number
  user: { id: string; name: string }
  active: boolean
}

export type ChatMessage = {
  userId: string
  body: string
  createdAt: string
}

export const NEW_MESSAGE = 'new_msg'

const arenas = [
  require('../../assets/arenas/1.jpg'),
  require('../../assets/arenas/2.jpg'),
  require('../../assets/arenas/3.jpg'),
  require('../../assets/arenas/4.jpg'),
  require('../../assets/arenas/5.jpg'),
]

const LobbyScreen: React.FC<Props> = () => {
  const route = useRoute()
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const auth = useSelector((state: State) => state.auth)
  const [t] = useTranslation()

  const socket = useContext(SocketContext)
  const { character, token, currentUser } = useSelector((state: State) => ({
    character: state.game.selectedCharacter!,
    token: state.auth.auth?.accessToken,
    currentUser: state.auth.auth?.user,
  }))

  const [arena, setArena] = useState(Math.floor(Math.random() * arenas.length))

  const [winner, setWinner] = useState<string | undefined>()

  const [me, setMe] = useState<Characterstatus | undefined>()

  const [opponent, setOpponent] = useState<Characterstatus | undefined>()
  const { lobby }: { lobby: string } = route.params! as any
  const [theme] = useContext(ThemeContext)
  const [channel, setChannel] = useState<Channel | undefined>()

  const sendMessage = async (message: ChatMessage) => {
    channel!.push(NEW_MESSAGE, message)
  }

  useEffect(() => {
    const process = async () => {
      initConn(lobby)
    }
    process()
  }, [])

  const initConn = async (lobby: string) => {
    socket.connect()

    const channel = socket.channel(`lobby:${lobby}`, {
      characterId: character.id,
      token,
    })

    channel
      .join()
      .receive('ok', (resp) => {
        setChannel(channel)
        channel.on('new_player', ({ user, character, health, active }) => {
          if (user.id != currentUser!.id) {
            setOpponent({ user, character, health, active })
          } else {
            setMe({ user, character, health, active })
          }
        })

        channel.on('update_player', ({ user, character, health, active }) => {
          if (user.id != currentUser!.id) {
            setOpponent({ user, character, health, active })
          } else {
            setMe({ user, character, health, active })
          }
        })

        channel.on(NEW_MESSAGE, (message) => {
          setMessages([...messages, message])
        })

        channel.on('damages', ({ defenderId, damages }) => {
          console.log(damages)
        })

        channel.on('user_left', () => {
          //leave()
        })

        channel.on('finished', ({ winner }) => {
          setWinner(winner)
          channel.leave()
          setChannel(undefined)
        })

        channel.on('ready', ({}) => {
          console.log('ready')
        })

        console.log('Joined successfully', resp)
      })
      .receive('error', (resp) => {
        console.log('Unable to join', resp)
      })

    return () => {
      console.log('cleaning lobby screen')
      channel.leave()
    }
  }

  const leave = () => {
    channel?.leave()
    navigation.navigate('Home')
  }

  if (!opponent) return <Waiting lobby={lobby} />

  return (
    <Layout hideTitle={true} image={arenas[arena]}>
      <View
        style={[
          theme.styles.flexRow,
          { flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <View style={{ alignItems: 'center' }}>
          <HealthBar
            currentHealth={me?.health || character.health}
            maxHealth={character.health}
          />
          <Spacing spacings="mb-2" />

          <CharacterOverview character={character} />
          <Spacing spacings="mb-2" />

          {me && me.active && !winner ? (
            <Button
              title={t('attack')}
              onPress={() => {
                setMe({ ...me, active: false })
                channel!.push('attack', {})
              }}
            />
          ) : (
            <></>
          )}

          {winner && winner === me!.user.id ? <H2>{t('youWin')}</H2> : <></>}

          {winner && winner !== me!.user.id ? <H2>{t('youLoose')}</H2> : <></>}

          <Spacing spacings="mb-2" />

          {winner ? (
            <Button
              title={`${winner === me!.user.id ? '🏆' : '😞'} ${t('goHome')}`}
              onPress={leave}
            />
          ) : (
            <></>
          )}
          <Spacing spacings="mb-2" />
        </View>
        <View>
          <View style={{ alignItems: 'center' }}>
            <HealthBar
              maxHealth={opponent.character.health}
              currentHealth={opponent.health}
            />

            <Spacing spacings="mb-2" />

            <CharacterOverview character={opponent.character} />
          </View>
        </View>
      </View>

      {channel ? (
        <LobbyChat
          messages={messages}
          channel={channel}
          user={me}
          onSendNewMessage={sendMessage}
          users={[
            me
              ? me
              : ({
                  user: { id: '', name: '' },
                  active: false,
                  health: 0,
                } as any),
            opponent,
          ]}
          lobby={lobby}
        />
      ) : (
        <></>
      )}
    </Layout>
  )
}

export default LobbyScreen
