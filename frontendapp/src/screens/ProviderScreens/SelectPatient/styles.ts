import { FlatList } from 'react-native'

import styled from 'styled-components/native'

import { Patient } from './index'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  background: #006d77;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.Text`
  color: #edf6f9;
  font-size: 24px;
  font-family: 'Urbanist-Medium';
  line-height: 28px;
`
export const BackButton = styled.TouchableOpacity``
export const ProfileButton = styled.TouchableOpacity``
export const UserAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
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
  background: #006d77;
  margin: 20px 0 0;
  padding: 21px 12px;
  flex-direction: row;
  align-items: center;
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
