import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootStack from './navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from './context/auth-context';

export default function App() {
  const [email, setEmail] = useState('');
  const [calendarId, setCalendarId] = useState('1');

  const login = (email) => {
    setEmail(email);
  };

  const logout = () => {
    setEmail('');
  };

  const saveCalendarId = id => {
    setCalendarId(id);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider
        value={{ email: email, login: login, logout: logout, calendarId: calendarId, saveCalendarId: saveCalendarId }}
      >
        <RootStack />
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
