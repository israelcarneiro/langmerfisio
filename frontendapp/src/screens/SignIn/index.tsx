import React from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView
} from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

import logoImg from '../../assets/logo.png'
import Button from '../../components/Button'
import Input from '../../components/Input'
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles'

const SignIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Seja bem-vindo!</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />

            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => Alert.alert('ta clicando cuzao')}>
              Entrar
            </Button>
            <ForgotPassword
              onPress={() => Alert.alert('burrao esqueceu a senha!!!')}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => Alert.alert('jaja tu cria relaxa')}>
        <CreateAccountButtonText>Criar uma nova conta</CreateAccountButtonText>
        <Icon name="log-in" size={20} color="#11E07E" />
      </CreateAccountButton>
    </>
  )
}

export default SignIn
