import React, { useEffect, useContext } from 'react';
import { Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import { StyledContainer } from '../components/styles';
import { AuthContext } from '../context/auth-context';

export default function CalendarView({ navigation, route }) {
    console.log(route.params)
    const context = useContext(AuthContext)
    console.log(context.calendarId, context.email)

    async function getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
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
        console.log(newCalendarID)
        context.saveCalendarId(newCalendarID)
        console.log(context.calendarId)
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
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
      <Button title="Delete calendar" onPress={async() => await Calendar.deleteCalendarAsync('11')} />
    </StyledContainer>
  );
}
