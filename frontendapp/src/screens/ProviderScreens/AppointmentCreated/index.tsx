import React, { useCallback, useMemo } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Icon from 'react-native-vector-icons/Feather'

import { RootStackParamList } from '../../../routes/provider.app.routes'
import { Container, Title, Description, Button, ButtonText } from './styles'

type AppointmentCreatedScreenProp =
  NativeStackNavigationProp<RootStackParamList>

interface RouteParams {
  date: number
}

const AppointmentCreated: React.FC = () => {
  const navigation = useNavigation<AppointmentCreatedScreenProp>()
  const { params } = useRoute()

  const { date } = params as RouteParams

  const formattedDate = useMemo(() => {
    return format(date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR
    })
  }, [date])

  const handleBackToDashboard = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'ProviderDashboard' }],
      index: 0
    })
  }, [navigation])

  return (
    <Container>
      <Icon name="check" size={80} color="#11e07e" />
      <Title>Agendamento realizado!</Title>
      <Description>{formattedDate}</Description>
      <Button onPress={handleBackToDashboard}>
        <ButtonText>Voltar a tela inicial</ButtonText>
      </Button>
    </Container>
  )
}

export default AppointmentCreated
