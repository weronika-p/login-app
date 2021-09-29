import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { TaskSchema } from './TaskSchema';
import { url } from '../constants/constants';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sortArray } from '../shared/sharedFunctions';
import FormLayout from './Form';
import * as Calendar from 'expo-calendar';
import { AuthContext } from '../context/auth-context';

export default function TaskForm({ setModalOpen, creator, setListOfTasks }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const path = `${url}task/`;
  const calendarContext = useContext(AuthContext)

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
        setListOfTasks((prevState) => sortArray(prevState, data));
        const newTask = {
          title: data.title,
          startDate: data.endDate,
          endDate: data.endDate,
          alarms: [
            {
              method: Calendar.AlarmMethod.ALARM
            }
          ]
        }
        await Calendar.createEventAsync(calendarContext.calendarId, newTask)
        setSubmitting(false);
        setModalOpen(false);
      }
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
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
          values = { ...values, endDate: date };
          handleTaskSubmission(values, setSubmitting);
        }}
      >
        {(props) => <FormLayout props={props} setShow={setShow} date={date} buttonText={'Add a task'} />}
      </Formik>
    </View>
  );
}
