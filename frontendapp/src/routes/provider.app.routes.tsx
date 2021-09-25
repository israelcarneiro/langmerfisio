import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AppointmentCreated from '../screens/ProviderScreens/AppointmentCreated'
import CreateAppointment from '../screens/ProviderScreens/CreateAppointment'
import ProfileProvider from '../screens/ProviderScreens/ProfileProvider'
import ProviderDashboard from '../screens/ProviderScreens/ProviderDashboard'
import SelectPatient from '../screens/ProviderScreens/SelectPatient'

export type RootStackParamList = {
  ProviderDashboard: undefined
  SelectPatient: undefined
  CreateAppointment: {
    userId: string
  }
  AppointmentCreated: {
    date: number
  }
  ProfileProvider: undefined
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
    <AppProvider.Screen
      name="AppointmentCreated"
      component={AppointmentCreated}
    />
    <AppProvider.Screen name="ProfileProvider" component={ProfileProvider} />
  </AppProvider.Navigator>
)

export default AppProviderRoutes
