import React from 'react'

import {
  RectButtonProperties,
  GestureHandlerRootView
} from 'react-native-gesture-handler'

import { Container, ButtonText } from './styles'

interface ButtonProps extends RectButtonProperties {
  children: string
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <GestureHandlerRootView style={{ maxWidth: '100%' }}>
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  </GestureHandlerRootView>
)

export default Button
