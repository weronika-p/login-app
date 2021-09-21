import React from 'react';
import { StyledContainer, InnerContainer, PageTitle, SubTitle } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import SignUpForm from '../components/SignUpForm';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const SignUp = ({ navigation }) => {
    return (
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Login App</PageTitle>
            <SubTitle>Account Sign Up</SubTitle>
            <SignUpForm navigation={navigation} />
          </InnerContainer>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
  );
};

export default SignUp;
