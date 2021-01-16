import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'




const ConfirmUnsendMessageDialog = ({ openDialog, handleCloseDialog, unSendMessage, message }) => {

    const handleDeleteMessage = () => {
        unSendMessage(message)
        handleCloseDialog()
    }

    return (
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='confirm-unsend-message-dialog-container'>
                <h2>Unsend Message?</h2>
                <p>Unsending will remove the message for everyone. People may have seen it already.</p>
                

                <div className='confirm-unsend-message-buttons-container'>
                    <div>
                        <Button
                            size='small'
                            color='secondary'
                            onClick={handleDeleteMessage}
                        >
                            Unsend
                    </Button>
                    </div>

                    <div>
                        <Button
                            size='small'
                            onClick={handleCloseDialog}
                        >
                            Cancel
                    </Button>

                    </div>

                </div>


            </div>

        </Dialog>

    )
}


export default ConfirmUnsendMessageDialog