import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'


import ConfirmDeleteStoryDialog from './ConfirmDialog'


const DeleteStoryDialog = ({ openDialog, handleCloseDialog, storyId }) =>{
    const [confirmDialog, setConfirmDialog] = useState(false)

    const handleOpenConfirmDialog = () =>{
        setConfirmDialog(true)
    }

    const handleCloseConfirmDialog = () =>{
        setConfirmDialog(false)
        handleCloseDialog()
    }

    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='delete-story-dialog-container'>
                <ConfirmDeleteStoryDialog 
                    openDialog={confirmDialog}
                    handleCloseDialog={handleCloseConfirmDialog}
                    storyId={storyId}
                />

                <div className='button-container'>
                    <Button
                        color='secondary'
                        onClick={handleOpenConfirmDialog}
                    >
                        Delete
                    </Button>
                </div>

                <div className='button-container'>
                    <Button
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                </div>
            </div>

        </Dialog>
    )
}



export default DeleteStoryDialog