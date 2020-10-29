import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'


const MoreOptions = ({ openDialog, handleCloseDialog }) => {
    return (
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='dialog-contents-container'>
                <div className='content-container'>
                    <Button color='secondary'>Report</Button>
                </div>

                <div className='content-container'>
                    <Button color='secondary'>Unfollow</Button>
                </div>

                <div className='content-container'>
                    <Button >Go to Post</Button>
                </div>

                <div className='content-container'>
                    <Button >Share</Button>
                </div>

                <div className='content-container'>
                    <Button >Copy Link</Button>
                </div>

                <div className='content-container'>
                    <Button onClick={handleCloseDialog}>Cancle</Button>
                </div>

            </div>

        </Dialog>
    )
}


export default MoreOptions