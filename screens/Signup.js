import React, { useState } from 'react';
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
    return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Login App</PageTitle>
        <SubTitle>Account Sign Up</SubTitle>
        <SignUpForm />
      </InnerContainer>
    </StyledContainer>
  );
};

export default SignUp;
