import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import LoginScreen from './screens/LoginScreen'
import { State } from './reducers'
import HomeScreen from './screens/HomeScreen'
import CharacterScreen from './screens/CharacterScreen'
import LobbiesScreen from './screens/LobbiesScreen'
import LobbyScreen from './screens/LobbyScreen'
import RegisterScreen from './screens/RegisterScreen'
import AutoLobbyScreen from './screens/AutoLobbyScreen'

const Stack = createStackNavigator()

const RootApp = () => {
  const { auth } = useSelector((state: State) => state.auth)

  const linking = {
    prefixes: ['https://rpg.io', 'rpgio://'],
    config: {
      screens: {
        Home: '',
        AutoLobby: 'autolobby',
        NewCharacter: 'character/new',
        EditCharacter: 'character/:id',
        Lobby: 'lobby/:lobby',
        Lobbies: 'lobbies',
        Login: 'login',
        Register: 'register',
      },
    },
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {auth && auth.user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AutoLobby" component={AutoLobbyScreen} />
            <Stack.Screen name="Lobby" component={LobbyScreen} />
            <Stack.Screen name="Lobbies" component={LobbiesScreen} />
            <Stack.Screen name="NewCharacter" component={CharacterScreen} />
            <Stack.Screen name="EditCharacter" component={CharacterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootApp
