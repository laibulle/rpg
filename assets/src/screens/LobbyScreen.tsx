import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Channel } from 'phoenix'
import { useTranslation } from 'react-i18next'
import { Audio } from 'expo-av'

import { SocketContext } from '../providers/SockerProvider'
import { State } from '../reducers'
import { ThemeContext, View } from '../rickui'
import Layout from '../Layout'
import Waiting from '../components/Waiting'
import LobbyChat from '../components/Chat/LobbyChat'
import { resetMessages, storeMessage } from '../actions'
import CharacterFight, { Characterstatus } from '../components/CharacterFight'
import Damages from '../components/Damages'
import { Sound } from 'expo-av/build/Audio'

type Props = {}

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
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const [winSound, setWinSound] = useState<Sound | undefined>()
  const [looseSound, setLooseSound] = useState<Sound | undefined>()
  const [failSound, setFailSound] = useState<Sound | undefined>()
  const [damageSound, setDamageSound] = useState<Sound | undefined>()
  const [fightSound, setFightSound] = useState<Sound | undefined>()

  const socket = useContext(SocketContext)
  const { character, token, currentUser } = useSelector((state: State) => ({
    character: state.game.selectedCharacter!,
    token: state.auth.auth?.accessToken,
    currentUser: state.auth.auth?.user,
  }))

  const [arena] = useState(Math.floor(Math.random() * arenas.length))

  const [winner, setWinner] = useState<string | undefined>()

  const [me, setMe] = useState<Characterstatus | undefined>()

  const [opponent, setOpponent] = useState<Characterstatus | undefined>()
  const { lobby }: { lobby: string } = route.params! as any
  const [theme] = useContext(ThemeContext)
  const [channel, setChannel] = useState<Channel | undefined>()
  const [damages, setDamages] = useState<string | undefined>()

  const sendMessage = async (message: ChatMessage) => {
    channel!.push(NEW_MESSAGE, message)
  }

  useEffect(() => {
    return () => {
      failSound?.unloadAsync()
      damageSound?.unloadAsync()
      looseSound?.unloadAsync()
      winSound?.unloadAsync()
      fightSound?.stopAsync()
      fightSound?.unloadAsync()
    }
  }, [])

  useEffect(() => {
    const process = async () => {
      initConn(lobby)

      if (!fightSound) {
        const { sound: fs } = await Audio.Sound.createAsync(
          require('./../../assets/sounds/fight_music.mp3')
        )
        setFightSound(fs)
      }

      if (!winSound) {
        const { sound: ws } = await Audio.Sound.createAsync(
          require('./../../assets/sounds/win.mp3')
        )
        setWinSound(ws)
      }

      if (!looseSound) {
        const { sound: ls } = await Audio.Sound.createAsync(
          require('./../../assets/sounds/loose.mp3')
        )

        setLooseSound(ls)
      }

      if (!damageSound) {
        const { sound: ds } = await Audio.Sound.createAsync(
          require('./../../assets/sounds/damages.mp3')
        )

        setDamageSound(ds)
      }

      if (!failSound) {
        const { sound: fas } = await Audio.Sound.createAsync(
          require('./../../assets/sounds/failed.mp3')
        )

        setFailSound(fas)
      }
    }

    process()
  }, [winSound, damageSound, looseSound, failSound, fightSound])

  const playback = () => {
    if (fightSound) {
      fightSound.setIsLoopingAsync(true)
      fightSound.playAsync().then((value) => {})
    }
  }

  const initConn = async (lobby: string) => {
    socket.connect()

    const channel = socket.channel(`lobby:${lobby}`, {
      characterId: character.id,
      token,
    })

    channel
      .join()
      .receive('ok', (resp) => {
        dispatch(resetMessages())
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
          dispatch(storeMessage(message))
        })

        channel.on('damages', ({ defenderId, damages }) => {
          setDamages(damages === 0 ? 'Failed' : damages)
          if (damages === 0) {
            if (failSound) failSound.playAsync()
          } else {
            if (damageSound) damageSound.playAsync()
          }
        })

        channel.on('user_left', () => {
          //leave()
        })

        channel.on('finished', ({ winner }) => {
          if (winner == me?.user.id) {
            winSound?.playAsync()
          } else {
            looseSound?.playAsync()
          }
          setWinner(winner)
          channel.leave()
          setChannel(undefined)
        })

        channel.on('ready', ({}) => {
          playback()
          setDamages('Fight')
        })
      })
      .receive('error', (resp) => {
        console.error('Unable to join', resp)
      })

    return () => {
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
        <Damages value={damages ? `${damages}` : undefined} />
        <CharacterFight
          isMe={true}
          status={me}
          winner={winner}
          onleave={() => {
            leave()
          }}
          onAttack={() => {
            setMe({ ...me!, active: false })
            channel!.push('attack', {})
          }}
        />

        <CharacterFight isMe={false} status={opponent} winner={winner} />
      </View>

      {channel ? (
        <LobbyChat
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
