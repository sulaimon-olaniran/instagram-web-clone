import React from 'react'
import Slide from '@material-ui/core/Slide'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'


import { SuccessIcon } from '../../../../../../components/MyIcons'


const ReportFeedBack = ({ openFeedbackModal, closeFeedbackeModal, closeDialog}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openFeedbackModal}
            onClose={closeFeedbackeModal}
            closeAfterTransition
        >
            <Slide direction="up" in={openFeedbackModal} mountOnEnter unmountOnExit>
                <div className='report-feedback-modal-container'>
                         <SuccessIcon 
                            height='48px'
                            width='48px'
                         />
                        <h4>Thanks for letting us know</h4>
                        <p>Your feedback is important in helping us keep this community safe.</p>
                        <Button
                          color='primary'
                          variant='contained'
                          onClick={closeFeedbackeModal}
                        >
                            Close
                        </Button>
                </div>
            </Slide>

        </Modal>
    )
}


export default ReportFeedBack





export const FeedBackDialog = ({ openDialog, handleCloseDialog}) =>{
    return(
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='report-feedback-dialog-container'>
                         <SuccessIcon 
                            height='48px'
                            width='48px'
                         />
                        <h4>Thanks for letting us know</h4>
                        <p>Your feedback is important in helping us keep this community safe.</p>
                        <Button
                          color='primary'
                          variant='contained'
                          onClick={handleCloseDialog}
                        >
                            Close
                        </Button>
                </div>
        </Dialog>
    )
}
