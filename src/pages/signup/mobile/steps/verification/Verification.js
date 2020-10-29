import React from 'react'
import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import Textfield from '@material-ui/core/TextField'


const Verification = () =>{
    return(
        <div className='verification-container'>
            <h3>Enter Confirmation Code</h3>
            <p>
                Enter the confirmation code we sent to suzzwayne@gmail.com. 
                <Button color='primary'>Resend Code.</Button>
            </p>

            <Field
               as={Textfield}
               name='verification'
               label='Confirmation Code'
               type='number'
               variant='outlined'
            />

        </div>
    )
}


export default Verification