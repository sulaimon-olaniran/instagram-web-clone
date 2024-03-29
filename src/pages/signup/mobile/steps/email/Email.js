import React, { useState } from 'react'
import { Field } from 'formik'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import firebase from '../../../../../firebase/Firebase'
import { ClipLoader } from 'react-spinners'



const Email = ({ touched, errors, setActiveStep, email, handleVerificationCode }) => {
    const [emailExist, setEmailExist] = useState(false)
    const [checkingEmail, setCheckingEmail] = useState(false)
    
    const goToNextStep = () =>{
        //verify if email has not been used for another account before proceeding........
        setCheckingEmail(true)
        const checkIfEmailExists = firebase.functions().httpsCallable('checkIfEmailExists')
     
        checkIfEmailExists({email : email})
        .then(res =>{
           const isEmailExist = res.data
            if(isEmailExist){
                setEmailExist(true)
                setCheckingEmail(false)
            }
            else{
                setEmailExist(false)   
                setCheckingEmail(false) 
                setActiveStep(prev => prev + 1)
                handleVerificationCode(email)
            }
        })
        .catch(error => console.log(error))
    }

    const disableButton = errors.email || email === "" ? true : false

    return (
        <div className='email-container'>
            <p>Please enter a valid email address as you'd be required to verify the email address.</p>
            <Field
                name='email'
                type='email'
                label='Email'
                as={Textfield}
                variant='outlined'
                error={ touched.email && errors.email ? true : false}
                helperText={touched.email ? errors.email : null}
            />
            { emailExist && <small>the email you provided has been used by another user</small>}

            <div className='step-buttons-container'>
                <Button
                    disabled={true}
                >
                    Back
                </Button>

                <Button 
                    disabled={disableButton}
                    variant="contained" 
                    color="primary" 
                    onClick={goToNextStep}
                >
                    Next
                </Button>
            </div>
            {checkingEmail && <ClipLoader />}
        </div>
    )
}


export default Email