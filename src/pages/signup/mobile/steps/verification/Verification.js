import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
//import { Field } from 'formik'
//import Textfield from '@material-ui/core/TextField'
import ReactCodeInput from 'react-verification-code-input'


const Verification = ({ setActiveStep, verificationCode, handleVerificationCode, email }) =>{
    const [codeNumber, setCodeNumber] = useState(null)


    const goToPrevStep = () =>{
        setActiveStep(prev => prev - 1)
    }

    const goToNextStep = () =>{
        setActiveStep(prev => prev + 1)
    }


    const disableButton = codeNumber - verificationCode === 0 ? false : true

    return(
        <div className='verification-container'>
            <h3>Enter Confirmation Code</h3>
            <p>
                Enter the confirmation code we sent to suzzwayne@gmail.com. 
                <Button 
                    onClick={() => handleVerificationCode(email)}
                    color='primary'
                >
                    Resend Code.
                </Button>
            </p>


            <ReactCodeInput
                type='number'
                onComplete={setCodeNumber}
            />
            
            <div className='step-buttons-container'>
                <Button
                    //className={classes.backButton}
                    onClick={goToPrevStep}
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

            <h3 className='verification-code'>Use {verificationCode} as verification code</h3>

        </div>
    )
}


export default Verification