import * as yup from 'yup'


export const ValidationSchema = yup.object().shape({
    email: yup.string()
    .email('Invalid email')
    .required('Email is Required') ,

    password: yup.string()
    .required("Password is required")
    .min(8, "Min of 8 characters"),

    full_name: yup.string()
    .required('Name is a required field')
    .min(2, 'Min of 2 Letters')
    .test('alphabets', 'Name must only contain alphabets', (value) => {
        return /^[a-zA-Z\s]+$/.test(value)}),

    username : yup.string()
    .required("Username is Required")
    .min(4, 'Min of 4 letters')
    .test('spaces', 'No spaces allowed in username', (value) => {
        return /^\S*$/.test(value)})
    .strict(true)
})