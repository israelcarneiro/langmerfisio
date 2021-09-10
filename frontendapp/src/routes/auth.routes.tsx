import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../screens/AuthScreens/SignIn'
import SignUp from '../screens/AuthScreens/SignUp'

export type RootStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

const Auth = createNativeStackNavigator<RootStackParamList>()

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
