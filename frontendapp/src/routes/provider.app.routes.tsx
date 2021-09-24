import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ProviderDashboard from '../screens/ProviderScreens/ProviderDashboard'

const AppProvider = createNativeStackNavigator()

const AppProviderRoutes: React.FC = () => (
  <AppProvider.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'rgba(0, 109, 119, 0.8)' }
    }}
  >
    <AppProvider.Screen
      name="ProviderDashboard"
      component={ProviderDashboard}
    />
  </AppProvider.Navigator>
)

export default AppProviderRoutes
