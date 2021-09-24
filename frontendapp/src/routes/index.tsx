import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { useAuth } from '../hooks/auth'
import AuthRoutes from './auth.routes'
import AppPatientRoutes from './patient.app.routes'
import AppProviderRoutes from './provider.app.routes'

const Routes: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    )
  }

  if (user && user.is_provider === false) {
    return <AppPatientRoutes />
  }
  if (user && user.is_provider === true) {
    return <AppProviderRoutes />
  }

  return <AuthRoutes />
}

export default Routes
