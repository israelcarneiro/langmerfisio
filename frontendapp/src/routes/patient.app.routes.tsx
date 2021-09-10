import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PatientDashboard from '../screens/PatientScreens/PatientDashboard'

const AppPatient = createNativeStackNavigator()

const AppPatientRoutes: React.FC = () => (
  <AppPatient.Navigator
    screenOptions={{
      // headerShown: false,
      contentStyle: { backgroundColor: 'rgba(0, 109, 119, 0.8)' }
    }}
  >
    <AppPatient.Screen name="PatientDashboard" component={PatientDashboard} />
  </AppPatient.Navigator>
)

export default AppPatientRoutes
