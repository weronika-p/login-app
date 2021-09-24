import React, { useState } from 'react';
import { Formik } from 'formik';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
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
  TextLinkContent,
} from './styles';
import { Colors } from './styles';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { url } from '../constants/constants';

const { grey, primary, contrastAccent } = Colors;

export default function SignUpForm({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2021, 9, 1));
  const [dateOB, setDateOB] = useState(new Date(2021, 9, 1));
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDateOB(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const path = `${url}user/signup`;

    axios
      .post(path, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          navigation.navigate('Welcome', { ...data });
        }
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
        console.log(err.toJSON())
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Formik
        initialValues={{
          name: '',
          email: '',
          dateOfBirth: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          values = {...values, dateOfBirth: dateOB}
          if (
            values.email == '' ||
            values.password == '' ||
            values.name == '' ||
            values.dateOfBirth == '' ||
            values.confirmPassword == ''
          ) {
            handleMessage('Please fulfill all the fields');
            setSubmitting(false);
          } else if (values. password !== values.confirmPassword) {
            handleMessage('Passwords do not match');
            setSubmitting(false);
          } else {
            handleSignup(values, setSubmitting);
          }
        }}
      >
        {(props) => (
          <StyledFormArea>
            <View>
              <LeftIcon>
                <Ionicons name="person" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Full name</StyledInputLabel>
              <StyledTextInput
                placeholder="eg. Jan Kowalski"
                placeholderTextColor={grey}
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')}
                value={props.values.name}
              />
            </View>
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
                <Ionicons name="calendar" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Date of birth</StyledInputLabel>
              <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput
                  placeholder="DD - MM -YYYY"
                  placeholderTextColor={grey}
                  onChangeText={props.handleChange('dateOfBirth')}
                  onBlur={props.handleBlur('dateOfBirth')}
                  value={dateOB ? dateOB.toLocaleDateString() : ''}
                  editable={false}
                />
              </TouchableOpacity>
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
            <View>
              <LeftIcon>
                <Ionicons name="lock-closed" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Confirm Password</StyledInputLabel>
              <StyledTextInput
                placeholder="********"
                placeholderTextColor={grey}
                onChangeText={props.handleChange('confirmPassword')}
                onBlur={props.handleBlur('confirmPassword')}
                value={props.values.confirmPassword}
                secureTextEntry={hidePassword}
              />
              <RighttIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={primary} />
              </RighttIcon>
            </View>
            <MessageBox type={messageType}>{message}</MessageBox>
            {!props.isSubmitting && <StyledButton onPress={props.handleSubmit}>
                  <ButtonText>
                      Sign Up
                  </ButtonText>
              </StyledButton>}
              {props.isSubmitting && <StyledButton disabled={true}>
                  <ActivityIndicator size='large' color={contrastAccent} />
              </StyledButton>}
            <Line />
            <ExtraView>
              <ExtraText>Already have an account? </ExtraText>
              <TextLink onPress={() => navigation.navigate('Login')}>
                <TextLinkContent>Login</TextLinkContent>
              </TextLink>
            </ExtraView>
          </StyledFormArea>
        )}
      </Formik>
    </View>
  );
}
