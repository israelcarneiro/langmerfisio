import { FlatList } from 'react-native'

import styled from 'styled-components/native'

import { Patient } from './index'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  margin: 38px 20px;
`
export const PatientListTitle = styled.Text`
  color: #edf6f9;
  font-size: 24px;
  font-family: 'Urbanist-Medium';
`
export const PatientsList = styled(FlatList as new () => FlatList<Patient>)``

export const PatientContent = styled.TouchableOpacity`
  width: 100%;
  height: 90px;
  border-radius: 10px;
  background: #00575f;
  margin: 20px 0 0;
  padding: 21px 12px;
  flex-direction: row;
  align-items: center;
  elevation: 7;
`
export const PatientAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`
export const PatientName = styled.Text`
  margin-left: 10px;
  color: #edf6f9;
  font-size: 16px;
  font-family: 'Urbanist-Medium';
`
