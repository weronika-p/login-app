import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { TaskSchema } from './TaskSchema';
import { url } from '../constants/constants';
import axios from 'axios';
import {
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  MessageBox,
  StyledButton,
  ButtonText,
  Line
} from './styles';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sortArray } from '../shared/sharedFunctions';

const { grey, primary, contrastAccent } = Colors

export default function TaskForm({ setModalOpen, creator, setListOfTasks }) {
    const dayjs = require('dayjs')
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date())

  const path = `${url}task/`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleTaskSubmission = async (values, setSubmitting) => {
    const req = { ...values, creator: creator };
    try {
      const response = await axios.post(path, req);
      const { status, data } = response;
      if (status === 200) {
        setListOfTasks(prevState => sortArray(prevState, data));
        setSubmitting(false);
        setModalOpen(false);
      }
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
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
          title: '',
          category: '',
          priority: '',
          endDate: '',
        }}
        validationSchema={TaskSchema}
        onSubmit={(values, { setSubmitting }) => {
          values = {...values, endDate: date}
          handleTaskSubmission(values, setSubmitting)
        }}
      >
        {props => (
          <StyledFormArea style={{width: '100%'}}>
            <View>
              <LeftIcon>
                <FontAwesome5 name="tasks" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Title of a task</StyledInputLabel>
              <StyledTextInput
                placeholder="eg. Study"
                placeholderTextColor={grey}
                onChangeText={props.handleChange('title')}
                onBlur={props.handleBlur('title')}
                value={props.values.title}
              />
              {(props.touched.title && Boolean(props.errors.title)) && 
                <MessageBox>{props.errors.title}</MessageBox>
            }
            </View>
            <View>
              <LeftIcon>
                <MaterialIcons name="category" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Category</StyledInputLabel>
              <StyledTextInput
                placeholder="eg. work"
                placeholderTextColor={grey}
                onChangeText={props.handleChange('category')}
                onBlur={props.handleBlur('category')}
                value={props.values.category}
              />
              {(props.touched.category && Boolean(props.errors.category)) && 
                <MessageBox>{props.errors.category}</MessageBox>
            }
            </View>
            <View>
              <LeftIcon>
                <MaterialIcons name="priority-high" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Priority (from 1 - 5)</StyledInputLabel>
              <StyledTextInput
                placeholder="eg. 1"
                placeholderTextColor={grey}
                onChangeText={props.handleChange('priority')}
                onBlur={props.handleBlur('priority')}
                value={props.values.priority}
                keyboardType="numeric"
              />
              {(props.touched.priority && Boolean(props.errors.priority)) && 
                <MessageBox>{props.errors.priority}</MessageBox>
            }
            </View>
            <View>
              <LeftIcon>
                <Ionicons name="calendar" size={30} color={primary} />
              </LeftIcon>
              <StyledInputLabel>Due date</StyledInputLabel>
              <TouchableOpacity onPress={() => setShow(true)}>
                <StyledTextInput
                  placeholder="DD - MM -YYYY"
                  placeholderTextColor={grey}
                  onChangeText={props.handleChange('endDate')}
                  onBlur={props.handleBlur('endDate')}
                  value={date.toLocaleDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {(props.touched.endDate && Boolean(props.errors.endDate)) && 
                <MessageBox>{props.errors.endDate}</MessageBox>
            }
            </View>
            {!props.isSubmitting && (
              <StyledButton onPress={props.handleSubmit}>
                <ButtonText>Add a new task</ButtonText>
              </StyledButton>
            )}
            {props.isSubmitting && (
              <StyledButton disabled={true}>
                <ActivityIndicator size="large" color={contrastAccent} />
              </StyledButton>
            )}
          </StyledFormArea>
        )}
      </Formik>
    </View>
  );
}
