import React from 'react'
import MyPasswordField from '../../../../../components/PasswordField'



const Password = ({ setFieldValue, handleBlur, error, errorMessage }) =>{
    return(
        <div className='password-container'>

           <h3>Enter your account password</h3>
           <p>Enter a strong secured password</p>

           <MyPasswordField 
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              error={error}
              errorMessage={errorMessage}
           />

        </div>
    )
}


export default Password