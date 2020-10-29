import React from 'react'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import lock_image from './assets/lock_image.png'
import instagram_text_logo from '../assets/instagram_text_logo.png'


const ResetPassword = () => {
    return (
        <div className='reset-password-container'>

            <div className='header-container'>
                  <div className='header-image-container'>
                      <img src={instagram_text_logo} alt="IG-LOGO" />
                  </div>
            </div>

            <div className='contents-container'>
                <div className='lock-image-container'>
                    <img src={lock_image} alt="Padlock" />
                </div>

                <h3>Trouble Logging In?</h3>

                <p>
                    Enter your email account and we'll send you a link to
                    get back into your account.
                </p>

                <div className='input-field-container'>
                    <Textfield
                        type='email'
                        name='email'
                        label='Email'
                        variant='outlined'
                    />
                    <Button
                      variant='contained'
                      color='primary'
                    >
                        Send Login Link
                    </Button>
                </div>

                <div className='create-account-text-container'>
                    <div className='text-design'>
                       <span /> <p>OR</p>  <span />
                    </div>

                    <Button >
                        Create New Account
                    </Button>
                </div>

                <div className='login-text-container'>
                    <Button>Back To Login</Button>
                </div>

            </div>
        </div>
    )
}


export default ResetPassword