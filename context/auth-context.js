import React from "react"

export const AuthContext = React.createContext({
    email: '',
    login: () => {},
    logout: () => {}
})