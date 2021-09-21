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

const Welcome = () => {
  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer style={{backgroundColor: '#cee6f6'}}>
        <WelcomeImage source={require('./../assets/1200.png')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>Wercia</SubTitle>
          <SubTitle welcome={true}>weronikap91@gmail.com</SubTitle>
          <StyledFormArea>
            <Avatar source={require('./../assets/avatar.png')} />
            <Line />
            <StyledButton onPress={() => {}}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;