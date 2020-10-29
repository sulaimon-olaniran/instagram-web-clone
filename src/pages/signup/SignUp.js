import React from 'react'
import { Form, withFormik } from 'formik'

import PcSignUp from './pc/PcSignUp'
import MobileSignUp from './mobile/MobileSignUp'
import { ValidationSchema } from './ValidationSchema'




const SignUp = ({ setFieldValue, handleBlur, touched, errors }) => {
    return (
        <Form>
            <div className='pc-signup' >
                <PcSignUp
             setFieldValue={setFieldValue}
             handleBlur={handleBlur}
             touched={touched}
             errors={errors}
           />
            </div>

            <div className='mobile-signup'>
                <MobileSignUp
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                />
            </div>
        </Form>
    )
}


const FormikSignUp = withFormik({
    mapPropsToValues() {
        return {
            full_name: "",
            username: "",
            email: "",
            password: ""
        }
    },

    validationSchema: ValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
        console.log(values)
    }
})(SignUp)

export default FormikSignUp