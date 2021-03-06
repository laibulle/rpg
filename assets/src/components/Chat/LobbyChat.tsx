import React, { useContext, useEffect, useState } from 'react'
//import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Image, ScrollView, View } from 'react-native'
import moment from 'moment'

import ChatInput from './ChatInput'
import { Text, Spacing } from '../../rickui'
import { Channel } from 'phoenix'
import { Characterstatus, ChatMessage } from '../../screens/LobbyScreen'
import { useSelector } from 'react-redux'
import { State } from '../../reducers'

type Props = {
  channel: Channel
  lobby: string
  user?: Characterstatus
  users: Characterstatus[]
  onSendNewMessage: (message: ChatMessage) => void
}

const LobbyChat: React.FC<Props> = ({
  lobby,
  user,
  users,
  onSendNewMessage,
}) => {
  const messages = useSelector((state: State) => state.game.messages)
  if (!user) return <></>

  return (
    <View>
      <ChatInput
        onSend={(value: string) => {
          onSendNewMessage({
            userId: user.user.id,
            body: value,
            createdAt: Date(),
          })
        }}
      />
      <ScrollView style={{ maxHeight: '300px' }}>
        {messages.map((msg, i) => {
          const user = users.find((u) => u.user.id === msg.userId)
          return (
            <Spacing key={`chat-${lobby}-message-${i}`} spacings={['mb-1']}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <Spacing spacings="mr-1">
                      <Text style={{ fontWeight: 'bold' }}>
                        {user ? user!.user.name : 'anonymous'}
                      </Text>
                    </Spacing>
                    <Text style={{ fontWeight: '100' }}>
                      {moment(msg.createdAt).format('h:mm')}
                    </Text>
                  </View>
                  <Text>{msg.body}</Text>
                </View>
              </View>
            </Spacing>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default LobbyChat
