import FeatherIcon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fdfdfd;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #333;
  font-size: 18px;
  font-family: 'Urbanist-Regular';
`

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
`
