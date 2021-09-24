import * as yup from 'yup'

export const TaskSchema = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    category: yup
        .string()
        .required('Category is required'),
    priority: yup
        .number()
        .required('Priority is required')
        .moreThan(1, 'Priority needs to be higher than 0')
        .lessThan(5, 'Priority needs to be lower than 6'),
    endDate: yup
        .string()
        .required('Due date is required')
})