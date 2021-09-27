import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { TaskSchema } from '../components/TaskSchema';
import { url } from '../constants/constants';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormLayout from '../components/Form';
import SuccessAlert from '../components/Alert';
import { StyledContainer } from '../components/styles';

export default function TaskForm({ navigation, route }) {
    const { _id, title, category, priority, endDate } = route.params
    const localeDate = endDate.toLocaleString()
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(localeDate));

  const id = _id.toString()
  const path = `${url}task/${id}`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleTaskEditting = async (values, setSubmitting) => {
    try {
      const response = await axios.post(path, values);
      const { status } = response;
      if (status === 200) {
        setSubmitting(false);
        <SuccessAlert navigation={navigation} />
      }
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <StyledContainer>
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
          title: title,
          category: category,
          priority: priority,
          endDate: date.toLocaleString(),
        }}
        validationSchema={TaskSchema}
        onSubmit={(values, { setSubmitting }) => {
          values = { ...values, endDate: date };
          handleTaskEditting(values, setSubmitting);
        }}
      >
        {(props) => <FormLayout props={props} setShow={setShow} date={date} buttonText={'Update the task'}/>}
      </Formik>
    </StyledContainer>
  );
}
