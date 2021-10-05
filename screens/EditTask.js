import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { TaskSchema } from '../components/TaskSchema';
import { url } from '../constants/constants';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormLayout from '../components/Form';
import successAlert from '../components/SuccessAlert';
import { StyledContainer } from '../components/styles';
import { AuthContext } from '../context/auth-context';
import { getEventId } from '../shared/sharedFunctions';
import * as Calendar from 'expo-calendar';
import errorAlert from '../components/ErrorAlert';

export default function TaskForm({ navigation, route }) {
    const { _id, title, category, priority, endDate, notes } = route.params
    const localeDate = endDate.toLocaleString()
    const authContext = useContext(AuthContext)

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
      const response = await axios.patch(path, values);
      const { status } = response;
      if (status === 200) {
        const eventId = await getEventId(authContext, new Date(endDate))
        eventId
        ? await Calendar.updateEventAsync(eventId, {
          title: values.title,
          startDate: values.endDate,
          endDate: values.endDate
        })
        : errorAlert('We could not find an event')
        setSubmitting(false);
        successAlert(navigation, authContext.email, 'Task has just been updated successfuly')
      }
    } catch (error) {
      setSubmitting(false);
      errorAlert(error.response.data);
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
          notes: notes
        }}
        validationSchema={TaskSchema}
        onSubmit={(values, { setSubmitting }) => {
          const newNotes = values.notes || 'none'
          values = { ...values, priority: +values.priority, endDate: date, notes: newNotes};
          handleTaskEditting(values, setSubmitting);
        }}
      >
        {(props) => <FormLayout props={props} setShow={setShow} date={date} buttonText={'Update the task'}/>}
      </Formik>
    </StyledContainer>
  );
}
