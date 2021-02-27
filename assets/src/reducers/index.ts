import { combineReducers, createStore } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Action } from '../actions'
import { Login_auth } from '../graphql/__generated__/Login'
import { Characters_characters } from '../graphql/__generated__/Characters'

export type State = {
  auth: AuthState
  game: GameState
}

type AuthState = {
  auth?: Login_auth
}

const auth = (state: AuthState = {}, action: Action): AuthState => {
  switch (action.type) {
    case 'STORE_AUTH':
      return { ...state, auth: action.auth as Login_auth }
    case 'STORE_STATE':
      return { ...state, auth: action.state.auth.auth }
    case 'RESET':
      return {}
    default:
      return state
  }
}

type GameState = { selectedCharacter?: Characters_characters }

const game = (state: GameState = {}, action: Action): GameState => {
  switch (action.type) {
    case 'STORE_SELECTED_CHARACTER':
      return { ...state, selectedCharacter: action.selectedCharacter }
    case 'STORE_STATE':
      return { ...action.state.game }
    case 'RESET':
      return {}
    default:
      return state
  }
}

const initGame: GameState = {}
const initAuth: AuthState = {}

const initData = (): State => ({
  auth: initAuth,
  game: initGame,
})

export const initStore = async () => {
  const data = await AsyncStorage.getItem('store')
  if (data) {
    return JSON.parse(data)
  }

  return initData()
}

export default createStore(combineReducers({ auth, game }))
