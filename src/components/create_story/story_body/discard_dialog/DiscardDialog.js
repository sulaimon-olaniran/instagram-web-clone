import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'



const DiscardDialog = ({ openDialog, handleCloseDialog, handleCloseModal }) => {
    return (
        <Dialog
            onClose={handleCloseDialog}
            aria-labelledby="simple-dialog-title"
            open={openDialog}
        >
            <div className='discard-dialog-container'>
                <h4>Discard Photo?</h4>
                <p>If you go back now, you will lose your photo</p>

                <div className='discard-dialog-buttons-container'>

                    <div className='each-dialog-button-container'>
                        <Button
                            color='primary'
                            onClick={handleCloseDialog}
                        >
                            Keep
                    </Button>
                    </div>

                    <div className='each-dialog-button-container'>
                        <Button
                            color='secondary'
                            onClick={handleCloseModal}
                        >
                            Discard
                    </Button>
                    </div>
                </div>

            </div>
        </Dialog>
    )
}



export default DiscardDialog