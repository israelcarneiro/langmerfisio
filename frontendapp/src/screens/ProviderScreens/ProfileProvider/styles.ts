import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px;
  margin: 40px 0 20px;
`
export const HeaderPerfil = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0 0;
`

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'Urbanist-Medium';
  color: #edf6f9;
`
export const UserAvatarButton = styled.TouchableOpacity`
  align-self: center;
`

export const UserAvatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  align-self: center;
  margin: 34px 0 24px;
`
