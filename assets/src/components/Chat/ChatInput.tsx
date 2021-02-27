import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../rickui'
import { useTranslation } from 'react-i18next'

type Props = {
  onSend: (value: string) => void
}

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('')
  const [t] = useTranslation()

  const handleSend = () => {
    if (isValid()) {
      setText('')
      onSend(text)
    }
  }
  const isValid = () => text.length > 0

  return (
    <View
      style={{
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'space-between',
      }}
    >
      <TextInput
        onSubmitEditing={handleSend}
        style={{ width: '100%', padding: 5, color: 'white' }}
        value={text}
        onChangeText={setText}
        placeholder={t('sendMessage')}
      />
      <View
        style={{
          backgroundColor: !isValid() ? 'transparent' : theme.primaryColor,
          padding: 10,
        }}
      >
        <Ionicons
          name="send-outline"
          size={32}
          color={'lightgrey'}
          onPress={handleSend}
        />
      </View>
    </View>
  )
}

export default ChatInput
