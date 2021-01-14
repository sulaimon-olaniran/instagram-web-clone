import React from 'react'
import Dialog from '@material-ui/core/Dialog'


import NewMessage from '../../new_message/NewMessage'



const CreateChatDialog = ({ openDialog, handleCloseDialog, from, postId }) =>{
    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='create-chat-dialog-container'>
                <NewMessage
                    close={handleCloseDialog}
                    from={from}
                    postId={postId}
                />
            </div>

        </Dialog>

    )
}




export default CreateChatDialog