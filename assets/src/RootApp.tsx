import React from 'react'
import LoginScreen from './screens/LoginScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { State } from './reducers'
import HomeScreen from './screens/HomeScreen'
import CharacterScreen from './screens/CharacterScreen'
import LobbiesScreen from './screens/LobbiesScreen'
import LobbyScreen from './screens/LobbyScreen'

const Stack = createStackNavigator()

const RootApp = () => {
  const { auth } = useSelector((state: State) => state.auth)

  const linking = {
    prefixes: ['https://mychat.com', 'mychat://'],
    config: {
      screens: {
        Home: '',
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
            <Stack.Screen name="Lobby" component={LobbyScreen} />
            <Stack.Screen name="Lobbies" component={LobbiesScreen} />
            <Stack.Screen name="NewCharacter" component={CharacterScreen} />
            <Stack.Screen name="EditCharacter" component={CharacterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootApp
