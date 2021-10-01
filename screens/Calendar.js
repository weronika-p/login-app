import React, { useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import { ButtonText, StyledButton, StyledContainer, SubTitle } from '../components/styles';
import { AuthContext } from '../context/auth-context';
import { url } from '../constants/constants';
import axios from 'axios';
import successAlert from '../components/Alert';

export default function CalendarView({ navigation, route }) {
    const context = useContext(AuthContext)

    async function getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    const handleCalendar = async calendarId => {
      const path = `${url}calendar/`
      const data = {
        title: 'To Do Calendar',
        creator: context.email,
        calendarId: calendarId
      }
      try {
        const response = await axios.post(path, data)
        const result = response.data
        if(result.status === 200) {
          successAlert(navigation, context.email, 'Calendar has just been created successfuly')
        }
      } catch (error) {
        console.log(error)
      }
    }
      
    async function createCalendar() {
        const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: route.params };
        const newCalendarID = await Calendar.createCalendarAsync({
          title: 'To Do Calendar',
          color: 'blue',
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          source: defaultCalendarSource,
          name: 'internalCalendarName',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
        context.saveCalendarId(newCalendarID)
        handleCalendar(newCalendarID)
    }

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        return await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      }
    })();
  }, []);

  return (
    <StyledContainer>
      <StyledButton onPress={createCalendar} style={{marginTop: 30}}>
        <ButtonText>Create a new calendar</ButtonText>
      </StyledButton>
      <SubTitle>If you already have a calendar don't click above button</SubTitle>
    </StyledContainer>
  );
}
