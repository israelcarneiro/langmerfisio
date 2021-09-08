import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

const Auth = createNativeStackNavigator()

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'rgba(0, 109, 119, 0.8)' }
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
)

export default AuthRoutes
