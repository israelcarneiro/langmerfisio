import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

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
  font-family: 'Urbanist-Regular';
  line-height: 28px;
`

export const UserName = styled.Text`
  color: #00b4c4;
  font-size: 24px;
  font-family: 'Urbanist-Medium';
`

export const ProfileButton = styled.TouchableOpacity``
export const UserAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 10px;
`

export const Content = styled.ScrollView`
  margin-bottom: 20px;
`

export const Calendar = styled.View`
  margin-top: 40px;
  padding: 0 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const PreviousDay = styled.TouchableOpacity``

export const NextDay = styled.TouchableOpacity``

export const CurrentDay = styled.TouchableOpacity``

export const CurrentDayText = styled.Text`
  color: #edf6f9;
  font-size: 20px;
  font-family: 'Urbanist-Medium';
`

export const Schedule = styled.View`
  margin-top: 20px;
  padding: 0 20px;
`

export const Appointment = styled.View`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  background: #00575f;
  margin-bottom: 20px;
  elevation: 7;
`

export const MorningSection = styled.View``
export const MorningSectionTitle = styled.Text`
  color: #edf6f9;
  font-size: 18px;
  font-family: 'Urbanist-Medium';
  border-bottom-width: 2px;
  border-bottom-color: #edf6f9;
  padding-bottom: 16px;
  margin-bottom: 16px;
`
export const AfternoonSection = styled.View``
export const AfternoonSectionTitle = styled.Text`
  color: #edf6f9;
  font-size: 18px;
  font-family: 'Urbanist-Medium';
  border-bottom-width: 2px;
  border-bottom-color: #edf6f9;
  padding-bottom: 16px;
  margin-bottom: 16px;
  margin-top: 20px;
`
export const PatientInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 10px 0;
`
export const PatientAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-color: #006d77;
  border-radius: 28px;
`
export const Divison = styled.View`
  flex-direction: column;
  margin-left: 10px;
  padding: 3px;
`

export const PatientName = styled.Text`
  font-size: 18px;
  font-family: 'Urbanist-Medium';
  color: #edf6f9;
  padding-bottom: 5px;
`

export const Hour = styled.View`
  flex-direction: row;
  align-items: center;
`

export const HourText = styled.Text`
  margin-left: 5px;
  font-family: 'Urbanist-Regular';
  color: #edf6f9;
`

export const MoreDetails = styled.View`
  margin-top: 15px;
  padding: 8px 10px;
  border-top-width: 2px;
  border-top-color: #edf6f9;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const MoreDetailsText = styled.Text`
  color: #edf6f9;
  font-size: 14px;
  font-family: 'Urbanist-Medium';
`
