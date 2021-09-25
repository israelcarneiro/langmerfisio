import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import { Header, HeaderTitle, BackButton, UserAvatar } from './styles'

interface HeaderScreenProps {
  previousTitle: string
}

const HeaderScreens: React.FC<HeaderScreenProps> = ({ previousTitle }) => {
  const { goBack } = useNavigation()
  const { user } = useAuth()

  const navigateBack = useCallback(() => goBack(), [goBack])

  return (
    <>
      <Header style={{ elevation: 10 }}>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#edf6f9" />
          <HeaderTitle> {previousTitle} </HeaderTitle>
        </BackButton>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </>
  )
}

export default HeaderScreens
