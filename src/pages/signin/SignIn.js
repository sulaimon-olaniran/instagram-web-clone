import React from 'react'
import { Form, withFormik } from 'formik'
import { connect } from 'react-redux'
import { signUserIn } from '../../store/actions/AuthActions'


import { ValidationSchema } from './ValidationSchema'
import MobileSignIn from './mobile/MobileSignIn'
import PcSignIn from './pc/PcSignIn'




const SignIn = ({ setFieldValue, handleBlur, touched, errors, authError }) => {
    //console.log(authError)
    return (
        <Form>
            <div className='mobile-signup' >
                <MobileSignIn
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    authError={authError}
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
        props.signUserIn(values)
        console.log(values)
    }
})(SignIn)


const mapStateToProps = (state) =>{
    return{
        authError : state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUserIn : (creds) => dispatch(signUserIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikSignIn)