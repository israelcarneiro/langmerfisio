import styled from 'styled-components/native'

export const Header = styled.View`
  padding: 24px 24px 12px;
  background: #00575f;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.Text`
  color: #edf6f9;
  font-size: 20px;
  font-family: 'Urbanist-Medium';
`
export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const UserAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 10px;
  margin-left: auto;
`
