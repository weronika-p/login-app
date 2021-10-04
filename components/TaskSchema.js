import * as yup from 'yup'

export const TaskSchema = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    category: yup
        .string()
        .required('Category is required'),
    priority: yup
        .string()
        .required('Priority is required')
        .matches(/^[1-5]{1}$/, 'Priority needs to be a number from 1 to 5'),
    endDate: yup
        .string(),
    notes: yup
        .string()
})