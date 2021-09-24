import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  margin-top: 40px;
`

export const Title = styled.Text`
  display: flex;
  font-size: 20px;
  font-family: 'Urbanist-Bold';
  text-align: left;
  color: #edf6f9;
  margin: 33px 0 20px;
  margin-left: -4px;
`

export const BackToSignIn = styled.TouchableOpacity`
  position: relative;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #edf6f9;
  padding: 16px 0;

  background: rgb(0, 109, 119);
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
export const BackToSignInText = styled.Text`
  color: #edf6f9;
  font-size: 16px;
  padding: 0 103px;
  font-family: 'Urbanist-Medium';
`
