import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'




const ConfirmDialog = ({ openDialog, handleCloseDialog, handleCloseModal }) =>{

    const confirmClosure = () =>{
        handleCloseDialog()
        handleCloseModal()
    }

    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='confirm-dialog-container'>
                <h4>Unsaved Changes</h4>
                <p>You have unsaved changes. Are you sure you want to cancel?</p>

                <div className='confirm-dialog-buttons-container'>
                    <div className='each-confirm-button'>
                        <Button
                            onClick={confirmClosure}
                            color='primary'
                        >
                            Yes
                        </Button>
                    </div>

                    <div className='each-confirm-button'>
                        <Button
                            onClick={handleCloseDialog}
                        >
                            NO
                        </Button>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}



export default ConfirmDialog