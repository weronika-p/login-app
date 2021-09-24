import React from 'react';
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle
} from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import LoginForm from '../components/LoginForm';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = ({ navigation }) => {
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo source={require('./../assets/login.png')} />
          <PageTitle>Mikellino's App</PageTitle>
          <SubTitle>Account Login</SubTitle>
          <LoginForm navigation={navigation} />
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
