import * as yup from 'yup'


export const ValidationSchema = yup.object().shape({
    email: yup.string()
    .email('Invalid email')
    .required('Email is Required') ,

    password: yup.string()
    .required("Password is required")
    .min(8, "Min of 8 characters"),

})