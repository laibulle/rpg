import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { Store } from 'redux'
import { Platform } from 'react-native'

import { isDev } from '../helpers'

import { State } from '../reducers'

const getBaseUrl = () => (isDev() ? 'http://localhost:4000' : '')

export const apolloClient = (store: Store<State>) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const headers = store.getState().auth.auth
      ? {
          Authorization: `Bearer ${store.getState().auth.auth?.accessToken}`,
        }
      : {}
    operation.setContext({
      headers,
    })

    return forward(operation)
  })

  const httpLink = new HttpLink({
    uri: `${getBaseUrl()}/graphql`,
  })

  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  })
}
