import axios from "axios"
import { url } from "../constants/constants"
import * as Calendar from 'expo-calendar';
import { Audio } from 'expo-av'
import errorAlert from "../components/ErrorAlert";

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
        errorAlert(error.response.data)
    }
}

export const getEventId = async (calendarContext, date) => {
    const calendarId = calendarContext.calendarId
      ? calendarContext.calendarId
      : await fetchCalendarId(calendarContext.email, calendarContext.saveCalendarId);
    const events = await Calendar.getEventsAsync([calendarId], date, date);
    const eventId = events[0].id;
    return eventId
};

export const deleteItem = (array, deletedId) => {
    const updatedArray = [...array].filter(item => {
        const id = item._id.toString()
        return id !== deletedId
    })
    return updatedArray
}

async function playSound() {
    try {
        const { sound } = await Audio.Sound.createAsync(require('../assets/swish.mp3'))
        await sound.playAsync()    
    } catch (error) {
        errorAlert('Error occured during loading the sound')
    }   
}

export const deleteTask = async (itemID, context, date, setUpdate) => {
    const id = itemID.toString()
    const path = `${url}task/delete/${id}`
   try {
       const response = await axios.delete(path)
       if(response.status === 200) {
           const eventId = await getEventId(context, date)
           if (eventId) {
           await Calendar.deleteEventAsync(eventId)
           } else {
            errorAlert('We could not find a task')
           }
           playSound()
           context.updateTasks(prevState => deleteItem(prevState, id))
           setUpdate(true)
       }
   } catch (error) {
    errorAlert(error.response.data)
   }
}
