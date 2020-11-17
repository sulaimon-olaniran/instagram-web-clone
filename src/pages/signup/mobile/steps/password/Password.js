import React from 'react'
import Button from '@material-ui/core/Button'


import MyPasswordField from '../../../../../components/PasswordField'



const Password = ({ setFieldValue, handleBlur, error, errorMessage, setActiveStep, password }) =>{

    const goToPrevStep = () =>{
        setActiveStep(prev => prev - 1)
    }

    const goToNextStep = () =>{
        setActiveStep(prev => prev + 1)
    }


    const disableButton = errorMessage || password === "" ? true : false

    return(
        <div className='password-container'>

           <h3>Enter your account password</h3>
           <p>Enter a strong secured password</p>

           <MyPasswordField 
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              error={error}
              errorMessage={errorMessage}
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
                    Finish
                </Button>
            </div>

        </div>
    )
}


export default Password