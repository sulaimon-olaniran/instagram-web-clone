import React, { useEffect } from 'react'
import { Form, withFormik } from 'formik'
import { connect } from 'react-redux'
import { signUserIn } from '../../store/actions/AuthActions'


import { ValidationSchema } from './ValidationSchema'
import MobileSignIn from './mobile/MobileSignIn'
import PcSignIn from './pc/PcSignIn'
import { handleOpenScamWarning } from '../../store/actions/AppActions'




const SignIn = ({ setFieldValue, handleBlur, touched, errors, authError, showScamWarning }) => {
    
    useEffect(() =>{
        showScamWarning()
        
    }, [ showScamWarning])


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

    handleSubmit(values, { props, }) {
        props.signUserIn(values)
        //console.log(values)
    }
})(SignIn)


const mapStateToProps = (state) =>{
    return{
        authError : state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUserIn : (creds) => dispatch(signUserIn(creds)),
        showScamWarning : () => dispatch(handleOpenScamWarning())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikSignIn)