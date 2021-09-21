import React, { useState } from 'react';
import { Formik } from 'formik';
import { TouchableOpacity, View } from 'react-native';
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

const { grey, primary, contrastAccent } = Colors;

export default function SignUpForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2021, 9, 1));
  const [dateOB, setDateOB] = useState(new Date(2021, 9, 1));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDateOB(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
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
            fullName: '',
            email: '',
            dateOfBirth: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values) => console.log(values)}
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
                  onChangeText={props.handleChange('fullName')}
                  onBlur={props.handleBlur('fullName')}
                  value={props.values.fullName}
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
                  // secureTextEntry={hideConfirmPassword}
                />
                <RighttIcon onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={primary} />
                </RighttIcon>
              </View>
              <MessageBox>...</MessageBox>
              <StyledButton onPress={props.handleSubmit}>
                <ButtonText>Login</ButtonText>
              </StyledButton>
              <Line />
              <ExtraView>
                <ExtraText>Already have an account? </ExtraText>
                <TextLink>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
    </View>
  );
}
