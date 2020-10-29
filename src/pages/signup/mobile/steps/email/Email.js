import React from 'react'
import { Field } from 'formik'
import Textfield from '@material-ui/core/TextField'
//import Button from '@material-ui/core/Button'


const Email = ({ touched, errors }) => {
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
        </div>
    )
}


export default Email