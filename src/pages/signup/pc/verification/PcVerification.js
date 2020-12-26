import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import ReactCodeInput from 'react-verification-code-input'
import { connect } from 'react-redux'



import { signUserUp } from '../../../../store/actions/AuthActions'





const PcVerificationDialog = ({ openDialog, handleCloseDialog, verificationCode, signUserUp, values }) => {
    const [codeNumber, setCodeNumber] = useState(null)

    const disableButton = codeNumber - verificationCode === 0 ? false : true


    const handleSignUserUp = () =>{
        signUserUp(values)
    }

    return (
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='pc-verification-code-dialog-container'>
                <h2>Enter Verification Code</h2>

                <p>Enter the verification code sent to the email you provided to complete your registration</p>

                <ReactCodeInput
                    type='number'
                    onComplete={setCodeNumber}
                />

                <Button
                    variant='contained'
                    color='primary'
                    disabled={disableButton}
                    onClick={handleSignUserUp}
                >
                    Complete Sign Up
                </Button>

                <h3 className='verification-code'>Use {verificationCode} as verification code</h3>


            </div>

        </Dialog>
    )
}


const mapDispatchToProps = (dispatch) =>{
    return{
        signUserUp : (user) => dispatch(signUserUp(user))
    }
}


export default connect(null, mapDispatchToProps)(PcVerificationDialog)