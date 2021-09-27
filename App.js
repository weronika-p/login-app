import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootStack from './navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from './context/auth-context';

export default function App() {
  const [email, setEmail] = useState('')

  const login = email => {
    setEmail(email)
  }

  const logout = () => {
    setEmail('')
  }
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthContext.Provider value={{email: email, login: login, logout: logout}}>
        <RootStack />
      </AuthContext.Provider>
    </GestureHandlerRootView>
  )
}
