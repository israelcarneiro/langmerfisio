import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { useAuth } from '../../../hooks/auth'

const ProviderDashboard: React.FC = () => {
  const { signOut } = useAuth()

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <View>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sair VAAAAAAAAAAAI SE FUDER DEU CERTO PORRARARARARAR</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProviderDashboard
