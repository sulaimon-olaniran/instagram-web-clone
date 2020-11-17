import React from 'react'
import { Field } from 'formik'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'





const Names = ({ touched, errors, setActiveStep, full_name, username }) => {

    const goToPrevStep = () =>{
        setActiveStep(prev => prev - 1)
    }

    const goToNextStep = () =>{
        setActiveStep(prev => prev + 1)
    }

    const disableButton = errors.full_name || full_name === "" || errors.username || username === '' ? true : false

    return (
        <div className='names-container'>
            <h3>Enter your name and username</h3>
            <p>Add your names so friends can find you</p>

            <div className='form-container'>
                <Field
                    as={Textfield}
                    name="full_name"
                    label="Full Name"
                    type="text"
                    variant='outlined'
                    error={ touched.full_name && errors.full_name ? true : false}
                    helperText={touched.full_name ? errors.full_name : null}
                />

                <Field
                    as={Textfield}
                    name="username"
                    label="Username"
                    type="text"
                    variant='outlined'
                    error={ touched.username && errors.username ? true : false}
                    helperText={touched.username ? errors.username : null}
                />
            </div>

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

        </div>
    )
}


export default Names