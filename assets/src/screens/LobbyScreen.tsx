import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import CharacterOverview from '../components/CharacterOverview'
import { SocketContext } from '../providers/SockerProvider'
import { State } from '../reducers'
import { Button, Text, ThemeContext, View } from '../rickui'
import { Channel } from 'phoenix'
import HealthBar from '../components/HealthBar'
import { Characters_characters } from '../graphql/__generated__/Characters'
import Layout from '../Layout'
import Waiting from '../components/Waiting'

type Props = {}

type Characterstatus = {
  character: Characters_characters
  health: number
  user: { id: string; name: string }
  active: boolean
}

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
      <View style={[theme.styles.flexRow, {}]}>
        <View style={{ alignItems: 'center' }}>
          <HealthBar
            currentHealth={me?.health || character.health}
            maxHealth={character.health}
          />
          <CharacterOverview character={character} />
          {me && me.active && !winner ? (
            <Button
              title="Attack"
              onPress={() => {
                setMe({ ...me, active: false })
                channel!.push('attack', {})
              }}
            />
          ) : (
            <></>
          )}

          {winner && winner === me!.user.id ? <Text>Winner</Text> : <></>}

          {winner && winner !== me!.user.id ? <Text>Looser</Text> : <></>}

          {winner ? <Button title="Back to home" onPress={leave} /> : <></>}
        </View>
        <View>
          {opponent ? (
            <View style={{ alignItems: 'center' }}>
              <HealthBar
                maxHealth={opponent.character.health}
                currentHealth={opponent.health}
              />
              <CharacterOverview character={opponent.character} />
            </View>
          ) : (
            <Text>Waiting for opponent</Text>
          )}
        </View>
      </View>
    </Layout>
  )
}

export default LobbyScreen
