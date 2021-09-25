import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`

export const Title = styled.Text`
  font-size: 32px;
  font-family: 'Urbanist-Medium';
  color: #11e07e;
  margin-top: 48px;
  text-align: center;
`
export const Description = styled.Text`
  font-family: 'Urbanist-Medium';
  text-align: center;
  color: #edf6f9;
  font-size: 18px;
  margin-top: 16px;
`
export const Button = styled.TouchableOpacity`
  background: #11e07e;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`
export const ButtonText = styled.Text`
  font-size: 18px;
  font-family: 'Urbanist-Medium';
  color: #333;
`
