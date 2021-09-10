import React from 'react'

import { useAuth } from '../hooks/auth'
import AuthRoutes from './auth.routes'
import AppPatientRoutes from './patient.app.routes'
import AppProviderRoutes from './provider.app.routes'

const Routes: React.FC = () => {
  const { user } = useAuth()

  if (user && user.is_provider === false) {
    return <AppPatientRoutes />
  }
  if (user && user.is_provider === true) {
    return <AppProviderRoutes />
  }

  return <AuthRoutes />
}

export default Routes
