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

const Login = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo source={require('./../assets/login.png')} />
        <PageTitle>Login App</PageTitle>
        <SubTitle>Account Login</SubTitle>
        <LoginForm />
      </InnerContainer>
    </StyledContainer>
  );
};

export default Login;
