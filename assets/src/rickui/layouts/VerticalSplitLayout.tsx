import React from 'react'
import { PageWrapper, View } from '..'

import useDimensions from '../hooks/useDimensions'

type Props = {
  left: React.ReactNode
  right: React.ReactNode
}

const VerticalSplitLayout: React.FC<Props> = ({ left, right }) => {
  const dimensions = useDimensions()
  return (
    <PageWrapper style={{ display: 'flex', flexDirection: 'row' }}>
      <View
        style={{
          flex: 1,
          display: dimensions.screenSize > 1 ? 'flex' : 'none',
        }}
      >
        {left}
      </View>
      <View
        style={{
          width: dimensions.screenSize > 1 ? '450px' : '100%',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {right}
      </View>
    </PageWrapper>
  )
}

export default VerticalSplitLayout
