import React from 'react';
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

const Welcome = ({ navigation, route }) => {
  const { name, email, photoUrl } = route.params
  const AvatarImg = photoUrl ? {url: photoUrl} : require('./../assets/avatar.png')
  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer style={{backgroundColor: '#cee6f6'}}>
        <WelcomeImage source={require('./../assets/1200.png')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>{name || 'Mikello'}</SubTitle>
          <StyledFormArea>
            <Avatar source={AvatarImg} />
            <Line />
            <StyledButton onPress={() => navigation.navigate('TasksList', email)}>
              <ButtonText>Tasks List</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate('Calendar', email)}>
              <ButtonText>Calendar</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate('Login')}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;