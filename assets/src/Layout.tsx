import React from 'react'
import { Image, ImageBackground, ViewProps } from 'react-native'

import { View } from './rickui'

type Props = {
  image?: NodeRequire
  hideTitle?: boolean
  authRequired?: boolean
} & ViewProps

const Layout: React.FC<Props> = ({ children, image, hideTitle }) => {
  return (
    <ImageBackground
      source={image ? image : require('../assets/bg.jpg')}
      style={{ flex: 1 }}
    >
      {hideTitle ? (
        <></>
      ) : (
        <Image
          resizeMode="contain"
          source={require('../assets/title.png')}
          style={{ width: 400, height: 100 }}
        />
      )}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </View>
    </ImageBackground>
  )
}

export default Layout
