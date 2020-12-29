import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'



const BlockDialogFeedback = ({ open, close, userProfile}) =>{
    return(
        <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={open}>
                 <div className='block-dialog-feedback-container'>
                          <h3>Blocked {userProfile.userName}.</h3>
                          <p>You can unblock them anytime from their profile</p>
                          <div>
                              <Button onClick={close}>Dismiss</Button>
                          </div>
                 </div>
        </Dialog>
    )
}


const BlockDialog = ({ handleCloseDialog, openDialog, userProfile }) =>{
    const [openFeedback, setOpenFeedback] = useState(false)

    const handleOpenFeedback = () =>{
        setOpenFeedback(true)
    }
    
    const handleCloseFeedback = () =>{
        setOpenFeedback(false)
        handleCloseDialog()
    }

    return(
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='block-dialog-container'>
                <h3>Block {userProfile.userName} ?</h3>
                <p>They won't be able to find your profile, posts or story on instagram. Instagram won't let them know you blocked them.</p>

                <div className='block-dialog-buttons-container'>
                         <div>
                             <Button color='primary' onClick={handleOpenFeedback}>Block</Button>
                         </div>
                         <div>
                             <Button onClick={handleCloseDialog}>Cancel</Button>
                         </div>
                </div>
                <BlockDialogFeedback 
                   open={openFeedback}
                   close={handleCloseFeedback}
                   userProfile={userProfile}
                />
            </div>
        </Dialog>
    )
}


export default BlockDialog