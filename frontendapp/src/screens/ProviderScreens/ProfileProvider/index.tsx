import React, { useRef, useCallback } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import Icon from 'react-native-vector-icons/Feather'
import * as Yup from 'yup'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { useAuth } from '../../../hooks/auth'
import api from '../../../services/api'
import getValidationErrors from '../../../utils/getValidationErrors'
import {
  Container,
  HeaderPerfil,
  Title,
  UserAvatarButton,
  UserAvatar
} from './styles'

interface UpdateProfileData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const ProfileProvider: React.FC = () => {
  const { user, signOut, updateUser } = useAuth()

  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const handleUpdateProfile = useCallback(
    async (data: UpdateProfileData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string()
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const { name, email, old_password, password, password_confirmation } =
          data

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation
              }
            : {})
        }

        const response = await api.put('/profile', formData)

        updateUser(response.data)

        Alert.alert('Perfil atualizado com sucesso!')

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }

        Alert.alert(
          'Erro na atualização',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente'
        )
      }
    },
    [navigation, updateUser]
  )

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            <HeaderPerfil>
              <TouchableOpacity onPress={handleGoBack}>
                <Icon name="chevron-left" size={24} color="#edf6f9" />
              </TouchableOpacity>
              <Title>Meu perfil</Title>
              <TouchableOpacity onPress={handleSignOut}>
                <Icon name="power" size={24} color="#edf6f9" />
              </TouchableOpacity>
            </HeaderPerfil>

            <UserAvatarButton
              onPress={() => {
                Alert.alert('Brother, fica frio ai')
              }}
            >
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View></View>
            <Form
              initialData={user}
              ref={formRef}
              onSubmit={handleUpdateProfile}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name="old_password"
                icon="lock"
                containerStyle={{ marginTop: 16 }}
                placeholder="Senha Atual"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar nova senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Atualizar Perfil
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default ProfileProvider
