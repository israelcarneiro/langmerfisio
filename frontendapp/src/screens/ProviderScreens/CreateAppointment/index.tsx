import React from 'react'
import { View } from 'react-native'

import { useRoute } from '@react-navigation/core'

interface RouteParams {
  userId: string
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()

  const { userId } = route.params as RouteParams

  console.log(userId)

  return <View />
}

export default CreateAppointment
