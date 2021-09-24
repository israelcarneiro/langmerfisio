import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ForgotPassword from '../screens/AuthScreens/ForgotPassword'
import RecoveryPassword from '../screens/AuthScreens/RecoveryPassword'
import SignIn from '../screens/AuthScreens/SignIn'
import SignUp from '../screens/AuthScreens/SignUp'

export type RootStackParamList = {
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  RecoveryPassword: undefined
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
    <Auth.Screen name="RecoveryPassword" component={RecoveryPassword} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
  </Auth.Navigator>
)

export default AuthRoutes
