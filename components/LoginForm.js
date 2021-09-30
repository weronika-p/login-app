import React, { useState, useContext } from 'react';
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
import * as Google from 'expo-google-app-auth'
import { url } from '../constants/constants';
import { AuthContext } from '../context/auth-context';

const { grey, primary, contrastAccent } = Colors;

export default function LoginForm({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()
  const [googleSubmitting, setGoogleSubmitting] = useState(false)
  
  const authContext = useContext(AuthContext)

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null)
    const path = `${url}user/signin`

    axios
      .post(path, credentials)
      .then((response) => {
        const result = response.data
        const { message, status, data } = result

        if(status !== 'SUCCESS') {
          handleMessage(message, status)
        } else {
          authContext.login(credentials.email, data[0].name)
          navigation.navigate('Welcome', {...data[0]})
        }
        setSubmitting(false)
      })
      .catch(err => {
        setSubmitting(false)
        handleMessage('An error occurred. Check your network and try again')
        console.log(err.toJSON())
    })
  }

  const handleGoogleSignIn = () => {
    setGoogleSubmitting(true)
    const config = {
      iosClientId: '99711018903-d1h8ql2f2lona7suob60615hnmd2oh18.apps.googleusercontent.com',
      androidClientId: '99711018903-snrtbk0q8282l7ckdldktaet557sll42.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    }

    Google
      .logInAsync(config)
      .then((result) => {
        const { type, user } = result
        if (type == 'success') {
          const { email, name, photoUrl } = user
          handleMessage('Google sigin successful', 'SUCCESS')
          setTimeout(() => navigation.navigate('Welcome', {email, name, photoUrl}))
        } else {
          handleMessage('Google signin was cancelled')
        }
        setGoogleSubmitting(false)
      })
      .catch(error => {
        console.log(error)
        handleMessage('An error occured. Check your network and try again')
        setGoogleSubmitting(false)
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
                  <ActivityIndicator size='large' color={contrastAccent} />
              </StyledButton>}
              <Line />
              {!googleSubmitting && 
                <StyledButton google={true} onPress={handleGoogleSignIn}>
                  <Ionicons name='logo-google' size={25} color={contrastAccent}/>
                  <ButtonText>
                      Sign in with Google Account
                  </ButtonText>
                </StyledButton>
              }
              {googleSubmitting && 
                <StyledButton google={true} disabled={true}>
                  <ActivityIndicator size='large' color={contrastAccent} />
                </StyledButton>
              }
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
