import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { withFormik, Field, Form } from 'formik'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'



import GenderModal from './gender/GenderModal'
import { ValidationSchema } from './ValidationSchema'
import { updateUserDetails } from '../../../../../store/actions/ProfileActions'



const useStyles = makeStyles((theme) => ({
    submitButton : {
        backgroundColor : '#0095f6'
    },

    disableButton : {
        color : '#0095f6',
    }
}));



const ProfileInformation = ({ setFieldValue, values, touched, errors, updateUserDetails, profile }) =>{
    const [genderModal, setGenderModal] = useState(false)
    //const [genderValue, setGenderValue] = useState('Female')
    const classes = useStyles()

    const handleOpenGenderModal = () =>{
        setGenderModal(true)
    }

    const handleCloseGenderModal = () =>{
        setGenderModal(false)
    }


    const toggleGenderValue = (value) =>{
        //setGenderValue(value)
        setGenderModal(false)
        setFieldValue('gender', value)
    }

    return(
        <React.Fragment>
            <GenderModal
              openModal={genderModal}
              handleCloseModal={handleCloseGenderModal}
              defaultValue={values.gender}
              toggleGenderValue={toggleGenderValue}
            />

            <Form className='profile-information-formik-form'>
                <Field 
                    as={TextField} type="text" name="fullName" label="Name"
                    variant='outlined'
                />

                <small>
                    Help people discover your account by using the name
                    you're know by  either your full name, nickname, or business name.
                </small>

                <Field 
                    as={TextField} type="text" name="userName" label="Username"
                    variant='outlined'
                />

                <small>
                    In most cases, you'll be able to change your username back to {profile.userName} for another 14days
                </small>

                <Field 
                    as={TextField} type="text" name="website" label="Website"
                    variant='outlined'
                />

                <Field 
                    as={TextField} type="text" name="bio" label="Bio"
                    multiline
                    rowsMax={3}
                    variant='outlined'
                />

                <div className='personal-information-header'>
                    <p>Personal Information</p>
                    <small>
                        Provide your personal information, even if the account is used
                        for a business, a pet or something else. This won't be part of 
                        your public profile.
                    </small>
                </div>

                <Field 
                    as={TextField} type="email" name="email" label="Email"
                    variant='outlined'
                    error={ touched.email && errors.email}
                    helperText={touched.email ? errors.email : null}
                />

                <Field 
                    as={TextField} type="number" name="phoneNumber" label="Phone Number"
                    variant='outlined'
                />

                <Field 
                    as={TextField} type="text" name="gender" label='Gender'
                    variant='outlined'
                    onClick={handleOpenGenderModal}
                    disabled
                  
                />

                <div className='profile-form-buttons-container'>

                    <Field as={Button} type='submit' variant='contained' id='button'
                        color='primary'
                        className={classes.submitButton}
                    >
                        Submit
                    </Field>

                    <Button
                        className={classes.disableButton}
                    >
                        Temporarily disable my account
                    </Button>
                </div>

            </Form>
        </React.Fragment>
    )
}



const FormikProfileInfromation = withFormik({
    mapPropsToValues({ profile }) {
        return {
            fullName: profile.fullName || "",
            userName: profile.userName || "",
            website : profile.website || "",
            bio : profile.bio || "",
            email : profile.email || "",
            phoneNumber : profile.phoneNumber || "",
            gender : profile.gender || "",
        }
    },

    validationSchema: ValidationSchema,

    handleSubmit(values, { props }) {
        const { profile, updateUserDetails} =  props
        //console.log(values)
        updateUserDetails(values, profile.userId)
    }
})(ProfileInformation)



const mapStateToProps = state =>{
    return{
        profile : state.firebase.profile
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        updateUserDetails : (data, userId) => dispatch(updateUserDetails(data, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormikProfileInfromation)