import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation, useRoute } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import { format } from 'date-fns'
import * as Yup from 'yup'

import Button from '../../../components/Button'
import HeaderScreens from '../../../components/HeaderScreens'
import Input from '../../../components/Input'
import { useAuth } from '../../../hooks/auth'
import { RootStackParamList } from '../../../routes/provider.app.routes'
import api from '../../../services/api'
import {
  Container,
  Content,
  PatientsList,
  PatientContainer,
  PatientAvatar,
  PatientName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  ScheduleTitle,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  FormContainer,
  ObservationTitle
} from './styles'

interface RouteParams {
  userId: string
}

export interface Patient {
  id: string
  name: string
  avatar_url: string
}

interface AvailabilityItem {
  hour: number
  available: boolean
}

type CreateAppointmentScreenProp = NativeStackNavigationProp<RootStackParamList>

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const navigation = useNavigation<CreateAppointmentScreenProp>()
  const route = useRoute()
  const formRef = useRef<FormHandles>(null)
  const { userId: patientId } = route.params as RouteParams

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [patients, setPatients] = useState<Patient[]>([])
  const [availabilityOfDay, setAvailabilityOfDay] = useState<
    AvailabilityItem[]
  >([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [selectedPatients, setSelectedPatients] = useState(patientId)

  useEffect(() => {
    api.get('/patients').then(response => {
      setPatients(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then(response => setAvailabilityOfDay(response.data))
  }, [selectedDate, user.id])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback((event: unknown, date?: Date) => {
    setShowDatePicker(false)

    if (date) {
      setSelectedDate(date)
    }
  }, [])

  const handleSelectPatient = useCallback((id: string) => {
    setSelectedPatients(id)
  }, [])

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [])

  const handleCreateAppointment = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        formRef.current?.setErrors({})

        const { observation } = data

        const date = new Date(selectedDate)

        date.setHours(selectedHour)
        date.setMinutes(0)

        await api.post('appointments', {
          provider_id: user.id,
          user_id: selectedPatients,
          date,
          observation
        })

        navigation.navigate('AppointmentCreated', { date: date.getTime() })
      } catch {
        Alert.alert(
          'Erro ao criar um agendamento',
          'Ocorreu um erro ao tentar criar o agendamento, tente novamente.'
        )
      }
    },
    [selectedDate, selectedHour, selectedPatients, user.id, navigation]
  )

  const morningHourAvailability = useMemo(() => {
    return availabilityOfDay
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        }
      })
  }, [availabilityOfDay])

  const afternoonHourAvailability = useMemo(() => {
    return availabilityOfDay
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        }
      })
  }, [availabilityOfDay])

  return (
    <Container>
      <HeaderScreens previousTitle="Pacientes" />
      <ScrollView>
        <Content>
          <PatientsList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={patients}
            keyExtractor={patient => patient.id}
            renderItem={({ item: patient }) => (
              <PatientContainer
                selected={patient.id === selectedPatients}
                onPress={() => handleSelectPatient(patient.id)}
              >
                <PatientAvatar source={{ uri: patient.avatar_url }} />
                <PatientName selected={patient.id === selectedPatients}>
                  {patient.name}
                </PatientName>
              </PatientContainer>
            )}
          />
        </Content>
        <Calendar>
          <Title>Selecione uma data </Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>Selecionar</OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={handleDateChanged}
            />
          )}
        </Calendar>

        <Schedule>
          <ScheduleTitle>Selecione um horário</ScheduleTitle>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningHourAvailability.map(
                ({ hourFormatted, available, hour }) => (
                  <Hour
                    disabled={!available}
                    selected={selectedHour === hour}
                    available={available}
                    key={hourFormatted}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                )
              )}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonHourAvailability.map(
                ({ hourFormatted, available, hour }) => (
                  <Hour
                    disabled={!available}
                    selected={selectedHour === hour}
                    available={available}
                    key={hourFormatted}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                )
              )}
            </SectionContent>
            <FormContainer>
              <ObservationTitle>Observações</ObservationTitle>
              <Form ref={formRef} onSubmit={handleCreateAppointment}>
                <View
                  style={{
                    maxHeight: 120
                  }}
                >
                  <Input
                    icon="info"
                    name="observation"
                    multiline={true}
                    style={{
                      height: 120,
                      justifyContent: 'flex-start'
                    }}
                    numberOfLines={4}
                    placeholder="Digite alguma observação adicional para essa sessão"
                    returnKeyType="previous"
                    onSubmitEditing={() => formRef.current?.submitForm()}
                  />
                </View>

                <Button onPress={() => formRef.current?.submitForm()}>
                  Agendar
                </Button>
              </Form>
            </FormContainer>
          </Section>
        </Schedule>
      </ScrollView>
    </Container>
  )
}

export default CreateAppointment
