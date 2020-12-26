import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Field } from 'formik'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase from '../../../firebase/Firebase'
import ClipLoader from "react-spinners/ClipLoader"



import instagram_text_logo from '../assets/instagram_text_logo.png'
import MyPasswordField from '../../../components/PasswordField'
import PcVerificationDialog from './verification/PcVerification'





const PcSignUp = ({ setFieldValue, handleBlur, touched, errors, values, handleVerificationCode, verificationCode }) => {
    const [verificationDialog, setVerificationDialog] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [checkingEmail, setCheckingEmail] = useState(false)

    const handleOpenVerificationDialog = () =>{
        setVerificationDialog(true)
    }

    const handleCloseVerificationDialog = () =>{
        setVerificationDialog(false)
    }

    const handleVerificationMessage = () =>{
        setCheckingEmail(true)
        const checkIfEmailExists = firebase.functions().httpsCallable('checkIfEmailExists')

        checkIfEmailExists({email : values.email})
        .then(res =>{
           console.log(res.data)
           const isEmailExist = res.data
            if(isEmailExist){
                setEmailExist(true)
                setCheckingEmail(false)
            }
            else{
                setEmailExist(false) 
                handleVerificationCode(values.email)   
                handleOpenVerificationDialog()
                setCheckingEmail(false)
            }
        })
        .catch(error => console.log(error))
    }


    return (
        <div className="pc-signup-container">
            <div className='pc-form-container'>

                <div className='pc-form-header'>

                    <div className="text-logo-image-container">
                        <img src={instagram_text_logo} alt="INSTAGRAM" />
                    </div>
                    <p>Sign up to see photos and videos from your friends.</p>

                </div>

                <div className='pc-form-fields'>

                    <Field
                        as={Textfield}
                        name='email'
                        label='Email'
                        type="email"
                        variant='outlined'
                        error={touched.email && errors.email ? true : false}
                        helperText={touched.email ? errors.email : null}
                    />

                    <Field
                        as={Textfield}
                        name='full_name'
                        label='Full Name'
                        type='text'
                        variant='outlined'
                        error={touched.full_name && errors.full_name ? true : false}
                        helperText={touched.full_name ? errors.full_name : null}
                    />

                    <Field
                        as={Textfield}
                        name='username'
                        label='Username'
                        type='text'
                        variant='outlined'
                        error={touched.username && errors.username ? true : false}
                        helperText={touched.username ? errors.username : null}
                    />

                    <MyPasswordField
                        setFieldValue={setFieldValue}
                        handleBlur={handleBlur}
                        error={touched.password && errors.password ? true : false}
                        errorMessage={errors.password}
                    />

                    
                    <Button
                        variant='contained'
                        color='primary'
                        id='button'
                        name='button'
                        onClick={handleVerificationMessage}
                        disabled={values.email === '' || values.password === '' || values.userName === '' || values.password === ''}
                    >
                        Sign Up
                    </Button>

                    { checkingEmail && <ClipLoader />}

                    { emailExist && <small style={{color : 'red'}}>the email you provided has been used by another user</small>}

                    <small>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</small>
                </div>

            </div>

            <div className='form-bottom-text'>
                <p>Have an account ?<Link to='/'><Button color='primary' id='login_button'>Log In</Button></Link></p>
            </div>

            <PcVerificationDialog 
                openDialog={verificationDialog}
                handleCloseDialog={handleCloseVerificationDialog}
                verificationCode={verificationCode}
                values={values}
            />

        </div>
    )
}

export default PcSignUp