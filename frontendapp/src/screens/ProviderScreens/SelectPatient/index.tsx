import React, { useCallback, useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import HeaderScreens from '../../../components/HeaderScreens'
import { RootStackParamList } from '../../../routes/provider.app.routes'
import api from '../../../services/api'
import {
  Container,
  Content,
  PatientListTitle,
  PatientsList,
  PatientContent,
  PatientAvatar,
  PatientName
} from './styles'

export interface Patient {
  id: string
  name: string
  avatar_url: string
}

type ProviderDashboardScreenProp = NativeStackNavigationProp<RootStackParamList>

const SelectPatient: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const navigation = useNavigation<ProviderDashboardScreenProp>()

  useEffect(() => {
    api.get<Patient[]>('/patients').then(response => {
      setPatients(response.data)
    })
  }, [])

  const navigateToCreateAppointment = useCallback(
    (userId: string) => {
      navigation.navigate('CreateAppointment', { userId })
    },
    [navigation]
  )

  return (
    <Container>
      <HeaderScreens previousTitle="Homepage" />

      <Content>
        <PatientsList
          ListHeaderComponent={<PatientListTitle>Pacientes</PatientListTitle>}
          data={patients}
          keyExtractor={patient => patient.id}
          renderItem={({ item: patient }) => (
            <PatientContent
              onPress={() => navigateToCreateAppointment(patient.id)}
              style={{ elevation: 4 }}
            >
              <PatientAvatar source={{ uri: patient.avatar_url }} />
              <PatientName>{patient.name}</PatientName>
            </PatientContent>
          )}
        />
      </Content>
    </Container>
  )
}

export default SelectPatient
