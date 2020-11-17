import React, { useState } from 'react'
import { Form, withFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
//import sendmail from 'sendmail'

import PcSignUp from './pc/PcSignUp'
import MobileSignUp from './mobile/MobileSignUp'
import { ValidationSchema } from './ValidationSchema'
import { signUserUp } from '../../store/actions/AuthActions'



const SignUp = ({ setFieldValue, handleBlur, touched, errors, values, auth, authError }) => {
    const [verificationCode, setVerificationCode] = useState(null)

    const handleVerificationCode = (email) =>{
        const sixDigitCodes = (Math.floor(100000 + Math.random() * 900000));
        setVerificationCode(sixDigitCodes)

        //send email to users {email} using email.js
    }

    console.log(authError)

    if(auth.uid) return <Redirect to='/' />

    return (
        <Form>
            <div className='pc-signup' >
                <PcSignUp
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    values={values}
                    verificationCode={verificationCode}
                    handleVerificationCode={handleVerificationCode}
                />
            </div>

            <div className='mobile-signup'>
                <MobileSignUp
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    values={values}
                    verificationCode={verificationCode}
                    handleVerificationCode={handleVerificationCode}
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
            password: "",
        }
    },

    validationSchema: ValidationSchema,

    handleSubmit(values, { props, setStatus, setSubmitting }) {
       // console.log(values)
        const { signUserUp } = props
        signUserUp(values)
    }
})(SignUp)


const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth,
        authError : state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUserUp : (user) => dispatch(signUserUp(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikSignUp)