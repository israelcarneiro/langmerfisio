import FeatherIcon from 'react-native-vector-icons/Feather'
import styled, { css } from 'styled-components/native'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fdfdfd;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #fdfdfd;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #11e07e;
    `}
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
