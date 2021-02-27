import React from 'react'
import { Text, View } from '../rickui'
import { StyleSheet } from 'react-native'

const BAR_WIDTH = 200

type Props = {
  maxHealth: number
  currentHealth: number
}

const HealthBar: React.FunctionComponent<Props> = ({
  maxHealth,
  currentHealth,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.health,
          { width: (currentHealth / maxHealth) * BAR_WIDTH },
        ]}
      ></View>
    </View>
  )
}

export default HealthBar

const styles = StyleSheet.create({
  container: {
    width: BAR_WIDTH,
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 15,
  },
  health: { height: 20, backgroundColor: 'green', borderRadius: 15 },
})
