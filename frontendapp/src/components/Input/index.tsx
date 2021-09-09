import React from 'react'
import { TextInputProps } from 'react-native'

import { Container, TextInput, Icon } from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={20} color="#999" />
    <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#999"
      {...rest}
    />
  </Container>
)

export default Input
