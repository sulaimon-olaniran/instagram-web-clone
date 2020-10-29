import React from 'react'
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


const MobileSignUp = ({ setFieldValue, handleBlur, touched, errors }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

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
                    />
                );
            case 1:
                return (
                    <Verification
                        touched={touched}
                        errors={errors}
                    />
                );
            case 2:
                return (
                    <Names
                        touched={touched}
                        errors={errors}
                    />
                );
            case 3:
                return (
                    <Password
                        setFieldValue={setFieldValue}
                        handleBlur={handleBlur}
                        error={touched.password && errors.password ? true : false}
                        errorMessage={errors.password}
                    />
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <div className='mobile-signup-container'>

            <div className='header-container'>
                <Link exact to='/'>
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
                            <div className='step-buttons-container'>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}


export default MobileSignUp





/**
 *
 * return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                        <div className={classes.stepBody}>
                            {getStepContent(activeStep)}
                            <div className={classes.buttonsContainer}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
 */