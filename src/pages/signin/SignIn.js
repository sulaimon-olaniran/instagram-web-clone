import React from 'react'
import { Form, withFormik } from 'formik'


import { ValidationSchema } from './ValidationSchema'
import MobileSignIn from './mobile/MobileSignIn'
import PcSignIn from './pc/PcSignIn'




const SignIn = ({ setFieldValue, handleBlur, touched, errors }) => {
    return (
        <Form>
            <div className='mobile-signup' >
                <MobileSignIn
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                />
            </div>

            <div className='pc-signup'>
                <PcSignIn
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                />
            </div>
        </Form>
    )
}


const FormikSignIn = withFormik({
    mapPropsToValues() {
        return {
            email: "",
            password: ""
        }
    },

    validationSchema: ValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
        console.log(values)
    }
})(SignIn)

export default FormikSignIn