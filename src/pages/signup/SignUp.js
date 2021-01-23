import React, { useState, useEffect } from 'react'
import { Form, withFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import emailjs from 'emailjs-com'
//import sendmail from 'sendmail'

import PcSignUp from './pc/PcSignUp'
import MobileSignUp from './mobile/MobileSignUp'
import { ValidationSchema } from './ValidationSchema'
import { signUserUp } from '../../store/actions/AuthActions'
import { handleOpenScamWarning } from '../../store/actions/AppActions'
import GradientLoader from '../../components/loaders/gradient/GradientLoader'



const SignUp = ({ setFieldValue, handleBlur, touched, errors, values, auth, authError, showScamWarning, signingUp }) => {
    const [verificationCode, setVerificationCode] = useState(null)

    const handleVerificationCode = (email) =>{
        const sixDigitCodes = (Math.floor(100000 + Math.random() * 900000));
        setVerificationCode(sixDigitCodes)

        //send email to users {email} using email.js
        const templatedId = "template_7f1dk1i"
        const serviceId = "default_service"
        const userId = "user_KHVompyz6Bjkqit10kCMV"

        const values = {
            email : email,
            verificationCode : sixDigitCodes
        }

        emailjs.send( serviceId, templatedId, values, userId)
        .then(res =>{
            console.log(res)
        })
        .catch(error => console.log(error))
    }

    //console.log(authError)

    useEffect(() =>{
        showScamWarning()
        
    }, [ showScamWarning])

    if(auth.uid) return <Redirect to='/' />

    return (
        <Form>
            {signingUp && <GradientLoader />}
            <div className='pc-signup' >
                <PcSignUp
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    values={values}
                    verificationCode={verificationCode}
                    handleVerificationCode={handleVerificationCode}
                    authError={authError}
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
                    authError={authError}
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

    handleSubmit(values, { props }) {
        const { signUserUp } = props
        signUserUp(values)
    }
})(SignUp)


const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth,
        authError : state.auth.authError,
        signingUp : state.auth.signingUp
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUserUp : (user) => dispatch(signUserUp(user)),
        showScamWarning : () => dispatch(handleOpenScamWarning())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikSignUp)