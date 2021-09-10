import React from 'react'
import { View, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import AppProvider from './hooks'
import Routes from './routes'

const App: React.FC = () => (
  <NavigationContainer>
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
