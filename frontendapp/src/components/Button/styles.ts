import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #11e07e;
  border-radius: 10px;
  margin-top: 10px;

  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-family: 'Urbanist-Bold';
  color: #333;
  font-size: 18px;
`
