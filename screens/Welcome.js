import React, { useContext } from 'react';
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  WelcomeContainer,
  StyledButton,
  ButtonText,
  Line,
  WelcomeImage,
  Avatar,
  StyledFormArea
} from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../context/auth-context';

const Welcome = ({ navigation, route }) => {
  const authContext = useContext(AuthContext)
  const { photoUrl } = route.params
  const AvatarImg = photoUrl ? {url: photoUrl} : require('./../assets/avatar.png')
  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer style={{backgroundColor: '#cee6f6'}}>
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>{authContext.name || 'Mikello'}</SubTitle>
          <StyledFormArea>
            <Avatar source={AvatarImg} />
            <Line />
            <StyledButton onPress={() => navigation.navigate('ListOfTask', authContext.email)}>
              <ButtonText>Tasks List</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate('Calendar', authContext.name)}>
              <ButtonText>Calendar</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => {
              authContext.logout()
              navigation.navigate('Login')
            }}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate('AboutMe')}>
              <ButtonText>About Me</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;