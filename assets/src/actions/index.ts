import { Characters_characters } from '../graphql/__generated__/Characters'
import { Login_auth } from '../graphql/__generated__/Login'
import { State } from '../reducers'
import { ChatMessage } from '../screens/LobbyScreen'

export type Action =
  | { type: 'STORE_AUTH'; auth: Login_auth }
  | {
      type: 'STORE_SELECTED_CHARACTER'
      selectedCharacter: Characters_characters
    }
  | { type: 'STORE_STATE'; state: State }
  | { type: 'RESET_MESSAGES' }
  | { type: 'STORE_MESSAGE'; message: ChatMessage }
  | { type: 'RESET' }

export const storeAuth = (auth: Login_auth): Action => ({
  type: 'STORE_AUTH',
  auth,
})

export const storeState = (state: State): Action => ({
  type: 'STORE_STATE',
  state,
})

export const resetMessages = (): Action => ({ type: 'RESET_MESSAGES' })
export const storeMessage = (message: ChatMessage): Action => ({
  type: 'STORE_MESSAGE',
  message,
})

export const storeSelectedCharacter = (
  selectedCharacter: Characters_characters
): Action => ({
  type: 'STORE_SELECTED_CHARACTER',
  selectedCharacter,
})
