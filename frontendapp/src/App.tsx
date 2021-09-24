import React from 'react'
import { View, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import AppProvider from './hooks'
import Routes from './routes'

const linking = {
  prefixes: ['langmerfisio://langmerfisio/'],
  config: {
    screens: {
      RecoveryPassword: 'reset-password'
    }
  }
}

const App: React.FC = () => (
  <NavigationContainer linking={linking}>
    <StatusBar
      barStyle="light-content"
      backgroundColor="rgb(0,109,119)"
      translucent
    />
    <AppProvider>
      <View style={{ backgroundColor: 'rgba(0,109,119,0.7)', flex: 1 }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
)

export default App
