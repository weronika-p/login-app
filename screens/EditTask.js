import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { TaskSchema } from '../components/TaskSchema';
import { url } from '../constants/constants';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormLayout from '../components/Form';
import successAlert from '../components/Alert';
import { StyledContainer } from '../components/styles';
import { AuthContext } from '../context/auth-context';

export default function TaskForm({ navigation, route }) {
    const { _id, title, category, priority, endDate } = route.params
    const localeDate = endDate.toLocaleString()
    const authContext = useContext(AuthContext)

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(localeDate));
  const [showAlert, setShowAlert] = useState(false)

  const id = _id.toString()
  const path = `${url}task/${id}`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleTaskEditting = async (values, setSubmitting) => {
    try {
      const response = await axios.patch(path, values);
      const { status } = response;
      if (status === 200) {
        setSubmitting(false);
        successAlert(navigation, authContext.email)
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
          values = { ...values, priority: +values.priority, endDate: date };
          handleTaskEditting(values, setSubmitting);
        }}
      >
        {(props) => <FormLayout props={props} setShow={setShow} date={date} buttonText={'Update the task'}/>}
      </Formik>
    </StyledContainer>
  );
}