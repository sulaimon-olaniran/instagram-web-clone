import React from 'react'
import { Field } from 'formik'
import Textfield from '@material-ui/core/TextField'

const Names = ({ touched, errors }) => {
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

        </div>
    )
}


export default Names