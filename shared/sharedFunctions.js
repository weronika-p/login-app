import axios from "axios"
import { url } from "../constants/constants"
import * as Calendar from 'expo-calendar';

export const sortArray = (array, newItem) => {
    const newArray = [...array, newItem]
    const sortedArray = newArray.sort((a, b) => {
        return a.priority - b.priority
    })
    return sortedArray
}

export const fetchCalendarId = async (email, saveCalendarId) => {
    const pathId = `${url}calendar/id`
    try {
        const response = await axios.get(pathId, { params: {
            creator: email
        }})
        const { data, status } = response
        if(status === 200) {
            const fetchedId = data[0].calendarId
            saveCalendarId(fetchedId)
            return fetchedId
        }
    } catch (error) {
        console.log(error)
    }
}

export const getEventId = async (calendarContext, date) => {
    const calendarId = calendarContext.calendarId
      ? calendarContext.calendarId
      : await fetchCalendarId(calendarContext.email, calendarContext.saveCalendarId);
    console.log(calendarId)
    const events = await Calendar.getEventsAsync([calendarId], date, date);
    console.log(date, events, typeof date)
    const eventId = events[0].id;
    return eventId
};

const deleteItem = (array, deletedId) => {
    const updatedArray = [...array].filter(item => {
        const id = item._id.toString()
        return id !== deletedId
    })
    return updatedArray
}

export const deleteTask = async (itemID, setListOfTasks, calendarContext, date) => {
    const id = itemID.toString()
    const path = `${url}task/delete/${id}`
   try {
       const response = await axios.delete(path)
       if(response.status === 200) {
           const eventId = await getEventId(calendarContext, date)
           if (eventId) {
            console.log(eventId)
           await Calendar.deleteEventAsync(eventId)
           } else {
            console.log('We could not find a task')
           }
           setListOfTasks(prevState => deleteItem(prevState, id))
       }
   } catch (error) {
    console.log(error)
   }
}
