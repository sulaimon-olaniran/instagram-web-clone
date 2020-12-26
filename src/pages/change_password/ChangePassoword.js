import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { withFormik, Field, Form } from 'formik'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Snackbar from '@material-ui/core/Snackbar'
import ClipLoader from "react-spinners/ClipLoader"



import { changePassword, closePasswordSnackBar } from '../../store/actions/AuthActions'



const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    submitButton: {
        backgroundColor: '#0095f6'
    },

    normalButton: {
        color: '#0095f6',
    }
}));


const ChangePassword = ({ history, auth, authError, status, profile, passwordSnackbar, snackbarText, changingPassword, closePasswordSnackBar }) => {
    const classes = useStyles()

    if (!auth.uid) return <Redirect to='/' />
    return (
        <React.Fragment>
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
                        src={profile && profile.profilePhoto}
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
                    {status && status.error && <small style={{ color: "red" }}>{status && status.error}</small>}

                    <div className='submit-button-container'>
                        <Field as={Button} type='submit' variant='contained' id='button'
                            color='primary'
                            className={classes.submitButton}
                            disabled={changingPassword}
                        >
                            Change Password
                        </Field>

                        {changingPassword && <ClipLoader color='#595858' />}
                    </div>

                   

                    <Link to='/accounts/password/reset'>
                        <Button className={classes.normalButton}>Forgot Password?</Button>
                    </Link>
                </Form>
                {authError && <small style={{ color: "red" }}>{authError}</small>}
            </div>

            <Snackbar
                open={passwordSnackbar}
                message={snackbarText}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                onClose={closePasswordSnackBar}
                autoHideDuration={3000}
            />

        </React.Fragment>
    )
}


const FormikChangePassword = withFormik({
    mapPropsToValues() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    },

    //validationSchema: SignInYupValidation,

    handleSubmit(values, { props, setStatus, resetForm }) {
        //changingpassword
        const { changePassword, profile } = props
        if (values.oldPassword !== profile.password) {
            setStatus({ error: 'The inputed old password is not correct' })
        }
        else if (values.newPassword !== values.confirmPassword) {
            setStatus({ error: 'New password does not match confirm password' })
        }
        else if (values.newPassword.length < 8) {
            setStatus({ error: 'The new password is too weak' })
        }
        else if (values.newPassword && values.confirmPassword === profile.password) {
            setStatus({ error: 'Create a new password that is not your old password' })
        }
        else {
            const data ={
                userId : profile.userId,
                newPassword : values.newPassword
            }
            setStatus({ error: null })
            
            changePassword(data)
            !changePassword && resetForm()
        }
    }
})(ChangePassword)


const mapStateToProps = (state) => {
   // console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        changingPassword : state.auth.changingPassword,
        passwordSnackbar : state.auth.passwordSnackbar,
        snackbarText : state.auth.snackbarText,
        authError : state.auth.authError
    }
}



const mapDispatchToProps = dispatch => {
    return {
        changePassword: data => dispatch(changePassword(data)),
        closePasswordSnackBar : () => dispatch(closePasswordSnackBar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormikChangePassword)