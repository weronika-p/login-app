import React from "react"

export const AuthContext = React.createContext({
    email: '',
    login: () => {},
    logout: () => {},
    calendarId: '',
    saveCalendarId: () => {},
    name: '',
    listOfTasks: [],
    updateTasks: () => {},
    filteredList: [],
    setFilteredList: () => {},
    selectedFilters: [],
    setSelectedFilters: () => {}
})