import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'






const DeleteChatDialog = ({ openDialog, handleCloseDialog }) =>{
    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='delete-chat-dialog-container'>
                <h3>Delete Chat?</h3>
                <p>Deleting removes the chat from your inbox, but no one else's inbox.</p>

                <div className='delete-chat-buttons-container'>
                    <div>
                        <Button
                            color='secondary'
                        >
                            Delete
                        </Button>
                    </div>

                    
                    <div>
                        <Button
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



export default DeleteChatDialog