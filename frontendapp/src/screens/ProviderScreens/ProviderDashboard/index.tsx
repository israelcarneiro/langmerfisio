import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import { subBusinessDays, addBusinessDays, format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Icon from 'react-native-vector-icons/Feather'

import Button from '../../../components/Button'
import { useAuth } from '../../../hooks/auth'
import api from '../../../services/api'
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  Content,
  Calendar,
  PreviousDay,
  CurrentDay,
  CurrentDayText,
  NextDay,
  Schedule,
  Appointment,
  PatientInfo,
  PatientAvatar,
  PatientName,
  Divison,
  Hour,
  HourText,
  MoreDetails,
  MoreDetailsText,
  MorningSection,
  MorningSectionTitle,
  AfternoonSection,
  AfternoonSectionTitle
} from './styles'

interface Appoinment {
  id: string
  date: string
  hourFormatted: string
  observation: string
  user: {
    name: string
    avatar_url: string
  }
}

const ProviderDashboard: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [appoinments, setAppointments] = useState<Appoinment[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { signOut, user } = useAuth()

  useEffect(() => {
    api
      .get<Appoinment[]>('/appointments/me', {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear()
        }
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appoinment => {
          return {
            ...appoinment,
            hourFormatted: format(parseISO(appoinment.date), 'HH:mm')
          }
        })
        setAppointments(appointmentsFormatted)
      })
  }, [selectedDate])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChange = useCallback((event: unknown, date?: Date) => {
    setShowDatePicker(false)

    if (date) {
      setSelectedDate(date)
    }
  }, [])

  const handlePreviousDay = useCallback(() => {
    const previousDayOfCurrentDay = subBusinessDays(selectedDate, 1)

    setSelectedDate(previousDayOfCurrentDay)
  }, [selectedDate])

  const handleNextDay = useCallback(() => {
    const nextDayOfCurrentDay = addBusinessDays(selectedDate, 1)

    setSelectedDate(nextDayOfCurrentDay)
  }, [selectedDate])

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  const dayOfTheYearInFull = useMemo(() => {
    return format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR
    })
  }, [selectedDate])

  const morningAppointments = useMemo(() => {
    return appoinments.filter(
      appoinment => parseISO(appoinment.date).getHours() < 12
    )
  }, [appoinments])

  const afternoonAppointments = useMemo(() => {
    return appoinments.filter(
      appoinment => parseISO(appoinment.date).getHours() > 12
    )
  }, [appoinments])

  return (
    <Container>
      <Header style={{ elevation: 10 }}>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={handleSignOut}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <Content>
        <Calendar>
          <PreviousDay onPress={handlePreviousDay}>
            <Icon name="arrow-left" size={24} color="#edf6f9" />
          </PreviousDay>
          <CurrentDay onPress={handleToggleDatePicker}>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={selectedDate}
                display="calendar"
                onChange={handleDateChange}
              />
            )}
            <CurrentDayText>{dayOfTheYearInFull}</CurrentDayText>
          </CurrentDay>
          <NextDay onPress={handleNextDay}>
            <Icon name="arrow-right" size={24} color="#edf6f9" />
          </NextDay>
        </Calendar>
        <Schedule>
          <MorningSection>
            <MorningSectionTitle>Agendamentos pela manhã</MorningSectionTitle>
            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <PatientInfo>
                  {console.log(appointment.user.avatar_url)}
                  <PatientAvatar
                    source={{ uri: appointment.user.avatar_url }}
                  />
                  <Divison>
                    <PatientName>{appointment.user.name} </PatientName>
                    <Hour>
                      <Icon name="clock" size={14} color="#11e07e" />
                      <HourText>{appointment.hourFormatted}</HourText>
                    </Hour>
                  </Divison>
                </PatientInfo>
                <TouchableOpacity
                  onPress={() => Alert.alert('JAJA TU VE OS DETALHES')}
                >
                  <MoreDetails>
                    <MoreDetailsText>Ver mais detalhes</MoreDetailsText>

                    <Icon name="arrow-right" size={14} color="#edf6f9" />
                  </MoreDetails>
                </TouchableOpacity>
              </Appointment>
            ))}
          </MorningSection>
          <AfternoonSection>
            <AfternoonSectionTitle>
              Agendamentos pela tarde
            </AfternoonSectionTitle>
            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <PatientInfo>
                  {console.log(appointment.user.avatar_url)}
                  <PatientAvatar
                    source={{ uri: appointment.user.avatar_url }}
                  />
                  <Divison>
                    <PatientName>{appointment.user.name} </PatientName>
                    <Hour>
                      <Icon name="clock" size={14} color="#11e07e" />
                      <HourText>{appointment.hourFormatted}</HourText>
                    </Hour>
                  </Divison>
                </PatientInfo>
                <TouchableOpacity
                  onPress={() => Alert.alert('JAJA TU VE OS DETALHES')}
                >
                  <MoreDetails>
                    <MoreDetailsText>Ver mais detalhes</MoreDetailsText>

                    <Icon name="arrow-right" size={14} color="#edf6f9" />
                  </MoreDetails>
                </TouchableOpacity>
              </Appointment>
            ))}
          </AfternoonSection>
          <Button onPress={() => Alert.alert('VAMO AGENDAR PORRA')}>
            Agendar
          </Button>
        </Schedule>
      </Content>
    </Container>
  )
}

export default ProviderDashboard
