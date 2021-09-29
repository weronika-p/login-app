import axios from "axios"
import { url } from "../constants/constants"

export const sortArray = (array, newItem) => {
    const newArray = [...array, newItem]
    const sortedArray = newArray.sort((a, b) => {
        return a.priority - b.priority
    })
    return sortedArray
}

const deleteItem = (array, deletedId) => {
    const updatedArray = [...array].filter(item => {
        const id = item._id.toString()
        return id !== deletedId
    })
    return updatedArray
}

export const deleteTask = async (itemID, setListOfTasks) => {
    const id = itemID.toString()
    const path = `${url}task/delete/${id}`
   try {
       const response = await axios.delete(path)
       if(response.status === 200) {
           setListOfTasks(prevState => deleteItem(prevState, id))
       }
   } catch (error) {
    console.log(error)
   }
}