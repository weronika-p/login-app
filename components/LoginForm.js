import React, { useState } from 'react';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
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
import axios from 'axios';

const { grey, primary, contrastAccent } = Colors;

export default function LoginForm({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null)
    const url = 'http://localhost:3000/user/signin'

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data
        const { message, status, data } = result

        if(status !== 'SUCCESS') {
          handleMessage(message, status)
        } else {
          navigation.navigate('Welcome', {...data[0]})
        }
        setSubmitting(false)
      })
      .catch(err => {
        console.log(err.json())
        setSubmitting(false)
        handleMessage('An error occurred. Check your network and trya gain')
    })
  }

  const handleMessage = (message, type = '') => {
    setMessage(message)
    setMessageType(type)
  }

  return (
    <View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, {setSubmitting}) => {
          if (values.email == '' || values.password == '') {
            handleMessage('Please fulfill all the fields')
            setSubmitting(false)
          } else {
            handleLogin(values, setSubmitting)
          }
        }}
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
              <MessageBox type={messageType}>{message}</MessageBox>
              {!props.isSubmitting && <StyledButton onPress={props.handleSubmit}>
                  <ButtonText>
                      Login
                  </ButtonText>
              </StyledButton>}
              {props.isSubmitting && <StyledButton disabled={true}>
                  <ActivityIndicator size='large' color={primary} />
              </StyledButton>}
              <Line />
              <StyledButton google={true} onPress={props.handleSubmit}>
                  <Ionicons name='logo-google' size={25} color={contrastAccent}/>
                  <ButtonText>
                      Sign in with Google Account
                  </ButtonText>
              </StyledButton>
              <ExtraView>
                  <ExtraText>Don't have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('SignUp')}>
                      <TextLinkContent>Sign up</TextLinkContent>
                  </TextLink>
              </ExtraView>
          </StyledFormArea>
        )}
      </Formik>
    </View>
  );
}
