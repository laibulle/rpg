import React, { ReactElement, useState } from 'react'
import { Animated } from 'react-native'
import PageCenter from './PageCenter'

type Props = { loading: boolean; render: () => ReactElement }

const LoadingPageStatic: React.FC<Props> = ({ render, loading }) => {
  if (!loading) return <>{render()}</>

  return (
    <PageCenter>
      <img
        alt=""
        src="/img/undraw/undraw_loading_frh4.svg"
        style={{ height: 500 }}
      />
    </PageCenter>
  )
}

export default LoadingPageStatic
