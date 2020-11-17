import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Field } from 'formik'


import Email from './steps/email/Email'
import Verification from './steps/verification/Verification'
import Names from './steps/names/Names'
import Password from './steps/password/Password'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    stepBody: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonsContainer: {
        width: '100%',
        dispay: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
}));

function getSteps() {
    return ['Email', 'Verification', 'Names', 'password',];
}


const MobileSignUp = ({ setFieldValue, handleBlur, touched, errors, values, verificationCode, handleVerificationCode }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

   
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <Email
                        touched={touched}
                        errors={errors}
                        email={values.email}
                        setActiveStep={setActiveStep}
                        handleVerificationCode={handleVerificationCode}
                    />
                );
            case 1:
                return (
                    <Verification
                        touched={touched}
                        errors={errors}
                        setActiveStep={setActiveStep}
                        verificationCode={verificationCode}
                        handleVerificationCode={handleVerificationCode}
                        email={values.email}
                    />
                );
            case 2:
                return (
                    <Names
                        touched={touched}
                        errors={errors}
                        setActiveStep={setActiveStep}
                        full_name={values.full_name}
                        username={values.username}
                    />
                );
            case 3:
                return (
                    <Password
                        setFieldValue={setFieldValue}
                        handleBlur={handleBlur}
                        error={touched.password && errors.password ? true : false}
                        errorMessage={errors.password}
                        setActiveStep={setActiveStep}
                        password={values.password}
                    />
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <div className='mobile-signup-container'>

            <div className='header-container'>
                <Link to='/'>
                    <ArrowBackIosIcon />
                </Link>
                <p>Register</p>
            </div>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className='step-contents-container'>
                {activeStep === steps.length ? (
                    <div className='signup-step-container'>
                        <p>Click on Sign Up to complete registration</p>

                        <div className='buttons-container'>

                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Go Back
                            </Button>

                            <Field
                                type='submit'
                                as={Button}
                                variant='contained'
                                color='primary'
                                id='button'
                                name='button'
                                disabled={Object.entries(errors).length !== 0 ? true : false}
                            >
                                Sign Up
                        </Field>

                        </div>
                        <small>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</small>
                    </div>
                ) : (
                        <div className='each-content-container'>
                            {getStepContent(activeStep)}
                        </div>
                    )}
            </div>
        </div>
    );
}


export default MobileSignUp

