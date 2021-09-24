import React, { useCallback, useRef } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import Icon from 'react-native-vector-icons/Feather'
import * as Yup from 'yup'

import logoImg from '../../../assets/logo.png'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import api from '../../../services/api'
import getValidationErrors from '../../../utils/getValidationErrors'
import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

interface RecoveryPasswordFormData {
  password: string
  password_confirmation: string
}

interface RouteParamsProps {
  token: string
}

const RecoveryPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const passwordConfirmationInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()
  const route = useRoute()

  const handleRecoveryPassword = useCallback(
    async (data: RecoveryPasswordFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha obrigatória'
          )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const { token } = route.params as RouteParamsProps
        const { password, password_confirmation } = data

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token
        })

        Alert.alert(
          'A senha foi alterada com sucesso!',
          'Agora você pode fazer o login utilizando a nova senha'
        )

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
        Alert.alert(
          'Erro na atualização da senha',
          'Ocorreu um erro ao redefinir a senha, verifique os campos'
        )
      }
    },
    [navigation, route.params]
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Recuperar Senha</Title>
            </View>

            <Form ref={formRef} onSubmit={handleRecoveryPassword}>
              <Input
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordConfirmationInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar nova senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Alterar senha
              </Button>
            </Form>
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

export default RecoveryPassword
