import React from 'react'

import { View } from 'react-native'

import Text from './Text'
import Circle from './Circle'
import Center from './Center'
import Spacing from './Spacing'

export type Step = { name: string }

type Props = { steps: Step[]; step: number }

const Stepper: React.FC<Props> = ({ steps, step }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {steps.map((x, i) => {
        return (
          <View>
            <View
              key={x.name}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Center>
                <>
                  <Circle
                    text={(i + 1).toString()}
                    color={i >= step ? 'lightgrey' : undefined}
                  />
                  <Spacing spacings="mb-1" />
                </>
              </Center>
            </View>
            <Text>{x.name}</Text>
          </View>
        )
      })}
    </View>
  )
}

export default Stepper
