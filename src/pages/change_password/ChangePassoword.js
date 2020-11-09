import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { withFormik, Field, Form } from 'formik'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'





const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    submitButton : {
        backgroundColor : '#0095f6'
    },

    normalButton : {
        color : '#0095f6',
    }
}));


const ChangePassword = ({ history }) =>{
    const classes = useStyles()
    return(
        <div className='change-password-container'>
            <div className='change-password-nav-container'>
                <ArrowBackIosIcon 
                    onClick={() => history.goBack()}
                />
                <p>Change Password</p>
            </div>

            <div className='change-password-user-container'>
                <Avatar
                    className={classes.large}
                    src='https://source.unsplash.com/random/600x600/?woman'
                />
                <h1>Sulai_m0n</h1>

            </div>

            <Form>
                <Field 
                    as={TextField} type="password" name="oldPassword" label="Old Password"
                    variant='outlined'
                />

                <Field 
                    as={TextField} type="password" name="newPassword" label="New Password"
                    variant='outlined'
                /> 

                <Field 
                    as={TextField} type="password" name="confirmPassword" label="Confirm New Password"
                    variant='outlined'
                />  

                <Field as={Button} type='submit' variant='contained' id='button'
                    color='primary'
                    className={classes.submitButton}
                >
                    Change Password
                </Field>   

                <Link to='/accounts/password/reset'>
                    <Button className={classes.normalButton}>Forgot Password?</Button>
                </Link>
            </Form>
        </div>
    )
}


const FormikChangePassword = withFormik({
    mapPropsToValues() {
        return {
            oldPassword : '',
            newPassword : '',
            confirmPassword : '',
        }
    },

    //validationSchema: SignInYupValidation,

    handleSubmit(values) {
        console.log(values)
    }
})(ChangePassword)



export default FormikChangePassword