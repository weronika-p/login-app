export const sortArray = (array, newItem) => {
    const newArray = [...array, newItem]
    const sortedArray = newArray.sort((a, b) => {
        return a.priority - b.priority
    })
    return sortedArray
}