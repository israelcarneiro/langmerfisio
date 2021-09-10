import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { useAuth } from '../../../hooks/auth'

const PatientDashboard: React.FC = () => {
  const { signOut } = useAuth()

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <View>
      <Text>Dashboard do Paciente</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          width: '100%',
          backgroundColor: '#fff',
          marginTop: 30,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PatientDashboard
