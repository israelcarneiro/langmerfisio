import React from 'react'
import { View, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar
      barStyle="light-content"
      backgroundColor="rgb(0,109,119)"
      translucent
    />
    <View style={{ backgroundColor: 'rgba(0,109,119,0.8)', flex: 1 }}>
      <Routes />
    </View>
  </NavigationContainer>
)

export default App
