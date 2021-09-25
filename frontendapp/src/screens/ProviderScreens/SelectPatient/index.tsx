import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../../hooks/auth'
import { RootStackParamList } from '../../../routes/provider.app.routes'
import api from '../../../services/api'
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  ProfileButton,
  UserAvatar,
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
  const { user } = useAuth()
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
      <Header style={{ elevation: 10 }}>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#edf6f9" />
        </BackButton>
        <HeaderTitle> Agendamento </HeaderTitle>
        <ProfileButton onPress={() => Alert.alert('segura')}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

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
