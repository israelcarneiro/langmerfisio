import React from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import logoImg from '../../assets/logo.png'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

const SignUp: React.FC = () => {
  const navigation = useNavigation()

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
              <Title>Cadastre-se</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />

            <Input name="email" icon="mail" placeholder="E-mail" />

            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => Alert.alert('ta clicando cuzao')}>
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#edf6f9" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp
