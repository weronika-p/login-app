import React, { useState } from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import {
  LeftIcon,
  RighttIcon,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  MessageBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent
} from './styles';
import { Colors } from './styles';
import { Ionicons } from '@expo/vector-icons';

const { grey, primary, contrastAccent } = Colors;

export default function LoginForm() {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        {(props) => (
          <StyledFormArea>
            <View>
              <LeftIcon>
                <Ionicons name="mail" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Email</StyledInputLabel>
              <StyledTextInput
                placeholder="eg. jkowalski@gmail.com"
                placeholderTextColor={grey}
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
                keyboardType="email-address"
              />
            </View>
            <View>
              <LeftIcon>
                <Ionicons name="lock-closed" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Password</StyledInputLabel>
              <StyledTextInput
                placeholder="********"
                placeholderTextColor={grey}
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                secureTextEntry={hidePassword}
              />
              <RighttIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={primary} />
              </RighttIcon>
            </View>
              <MessageBox>...</MessageBox>
              <StyledButton onPress={props.handleSubmit}>
                  <ButtonText>
                      Login
                  </ButtonText>
              </StyledButton>
              <Line />
              <StyledButton google={true} onPress={props.handleSubmit}>
                  <Ionicons name='logo-google' size={25} color={contrastAccent}/>
                  <ButtonText>
                      Sign in with Google Account
                  </ButtonText>
              </StyledButton>
              <ExtraView>
                  <ExtraText>Don't have an account? </ExtraText>
                  <TextLink>
                      <TextLinkContent>Sign up</TextLinkContent>
                  </TextLink>
              </ExtraView>
          </StyledFormArea>
        )}
      </Formik>
    </View>
  );
}
