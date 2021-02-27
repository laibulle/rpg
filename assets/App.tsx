import { ApolloProvider } from '@apollo/client'
import { useFonts } from 'expo-font'

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from './src/rickui'
import store, { initStore } from './src/reducers'
import { apolloClient } from './src/graphql'
import RootApp from './src/RootApp'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeState } from './src/actions'
import Layout from './src/Layout'

export default () => {
  const [fontsLoaded] = useFonts({
    poppins: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    nunito: require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
  })

  useEffect(() => {
    const process = async () => {
      store.subscribe(() => {
        AsyncStorage.setItem('store', JSON.stringify(store.getState()))
      })

      store.dispatch(storeState(await initStore()))
    }

    process()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <ApolloProvider client={apolloClient(store)}>
            <RootApp />
          </ApolloProvider>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
