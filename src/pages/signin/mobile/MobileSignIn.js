import React from 'react'
import { Link } from 'react-router-dom'
import { Field } from 'formik'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import instagram_text_logo from '../assets/instagram_text_logo.png'
import MyPasswordField from '../../../components/PasswordField'



const MobileSignIn = ({ setFieldValue, handleBlur, touched, errors, authError }) => {
    return (
        <div className="mobile-signin-container">
            <div className="text-logo-image-container">
                <img src={instagram_text_logo} alt="INSTAGRAM" />
            </div>

            <div className='mobile-form-container'>
                <Field
                    as={Textfield}
                    name='email'
                    label='Email'
                    type="email"
                    variant='outlined'
                    error={touched.email && errors.email ? true : false}
                    helperText={touched.email ? errors.email : null}
                />

                <MyPasswordField
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    error={touched.password && errors.password ? true : false}
                    errorMessage={errors && errors.password}
                />

                {authError && !errors.email && !errors.password && 
                    <small >
                        {authError}
                    </small>
                }

                <div className="forgot-password-text">
                    <Button color='primary' id='forgot-password'>Forgot Password?</Button>
                </div>

                <Field
                    type='submit'
                    as={Button}
                    variant='contained'
                    color='primary'
                    id='button'
                    name='button'
                >
                    Log In
                </Field>

            </div>

            <p>Don't have an account ? <Link to='/signup'><Button color='primary' id='go-sign-up'>Sign Up</Button></Link></p>

        </div>
    )
}

export default MobileSignIn