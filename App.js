import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootStack from './navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from './context/auth-context';

export default function App() {
  const [email, setEmail] = useState('');
  const [calendarId, setCalendarId] = useState('');
  const [name, setName] = useState('');
  const [listOfTasks, setListOfTasks] = useState([]);
  const [filteredList, setFilters] = useState([])
  const [selectedFilters, setChosenFilters] = useState([])

  const login = (email, name) => {
    setEmail(email);
    setName(name);
  };

  const logout = () => {
    setEmail('');
    setName('');
  };

  const saveCalendarId = (id) => {
    setCalendarId(id);
  };

  const updateTasks = (listOfTasks) => {
    setListOfTasks(listOfTasks);
  };

  const setFilteredList =(filteredList) => {
    setFilters(filteredList)
  }

  const setSelectedFilters = selectedFilters => {
    setChosenFilters(selectedFilters)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider
        value={{
          email: email,
          login: login,
          logout: logout,
          calendarId: calendarId,
          saveCalendarId: saveCalendarId,
          name: name,
          listOfTasks: listOfTasks,
          updateTasks: updateTasks,
          filteredList: filteredList,
          setFilteredList: setFilteredList,
          selectedFilters: selectedFilters,
          setSelectedFilters: setSelectedFilters
        }}
      >
        <RootStack />
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
