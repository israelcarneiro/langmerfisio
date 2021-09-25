import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CreateAppointment from '../screens/ProviderScreens/CreateAppointment'
import ProviderDashboard from '../screens/ProviderScreens/ProviderDashboard'
import SelectPatient from '../screens/ProviderScreens/SelectPatient'

export type RootStackParamList = {
  ProviderDashboard: undefined
  SelectPatient: undefined
  CreateAppointment: {
    userId: string
  }
}

const AppProvider = createNativeStackNavigator<RootStackParamList>()

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
    <AppProvider.Screen name="SelectPatient" component={SelectPatient} />
    <AppProvider.Screen
      name="CreateAppointment"
      component={CreateAppointment}
    />
  </AppProvider.Navigator>
)

export default AppProviderRoutes
