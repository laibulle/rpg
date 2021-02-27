import React, { useContext } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Text, ThemeContext, View } from '../rickui'

type Props = {
  label: string
  value: number
  canAdd: boolean
  onChange: (value: number) => void
}

const styles = StyleSheet.create({
  image: { height: 25, width: 25 },
  value: { width: 100, justifyContent: 'center' },
})

const SkillInput: React.FC<Props> = ({ value, onChange, label, canAdd }) => {
  const [theme] = useContext(ThemeContext)

  return (
    <View style={theme.styles.flexRow}>
      <View style={[theme.styles.flexRow, styles.value]}>
        <Text>{label}: </Text>
        <Text>{value}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (canAdd) onChange(1)
        }}
      >
        <Image style={styles.image} source={require('../../assets/add.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default SkillInput
