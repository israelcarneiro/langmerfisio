import { FlatList } from 'react-native'

import styled from 'styled-components/native'

import { Patient } from './index'

interface PatientContainerProps {
  selected: boolean
}
interface PatientNameProps {
  selected: boolean
}

interface HourProps {
  selected: boolean
  available: boolean
}

interface HourTextProps {
  selected: boolean
}

export const Container = styled.View`
  flex: 1;
`
export const Content = styled.View`
  height: 112px;
`
export const PatientsList = styled(FlatList as new () => FlatList<Patient>)`
  padding: 32px 24px;
`

export const PatientContainer = styled.TouchableOpacity<PatientContainerProps>`
  background: ${props => (props.selected ? '#11E07E' : '#00575f')};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`

export const PatientAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const PatientName = styled.Text<PatientNameProps>`
  margin-left: 8px;
  font-family: ${props =>
    props.selected ? 'Urbanist-Bold' : 'Urbanist-Medium'};
  color: ${props => (props.selected ? '#333' : '#edf6f9')};
`

export const Calendar = styled.View`
  margin: 0 30px 24px;
`

export const Title = styled.Text`
  font-family: 'Urbanist-Medium';
  color: #edf6f9;
  font-size: 20px;
  padding: 0 0 20px;
`
export const OpenDatePickerButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #11e07e;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
export const OpenDatePickerButtonText = styled.Text`
  font-family: 'Urbanist-Medium';
  color: #333;
  font-size: 16px;
`
export const Schedule = styled.View`
  padding: 24px 0 16px;
`

export const ScheduleTitle = styled.Text`
  font-family: 'Urbanist-Medium';
  color: #edf6f9;
  font-size: 20px;
  padding: 0 24px 20px;
`

export const Section = styled.View`
  margin-bottom: 24px;
`

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #11e07e;
  font-family: 'Urbanist-Medium';
  margin: 0 24px 12px;
`

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``

export const Hour = styled.TouchableOpacity<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#11e07e' : '#00575f')};
  border-radius: 10px;
  margin-right: 8px;
  width: 70px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#333' : '#edf6f9')};
  text-align: center;
  font-family: ${props =>
    props.selected ? 'Urbanist-Bold' : 'Urbanist-Regular'};
  font-size: 16px;
`
export const FormContainer = styled.View`
  margin: 20px 24px 0;
`
export const ObservationTitle = styled.Text`
  margin-bottom: 10px;
  color: #edf6f9;
  font-size: 18px;
  font-family: 'Urbanist-Medium';
`
