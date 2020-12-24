import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Slide from '@material-ui/core/Slide'
import ReportFeedBack, { FeedBackDialog } from './feedback/FeedBack'



const ReportModal = ({ openModal, handleCloseModal, closeDialog }) =>{
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

    const handleOpenFeedbackModal = () =>{
        setOpenFeedbackModal(true)
    }

    const handleCloseFeedbackModal = () =>{
        setOpenFeedbackModal(false)
        handleCloseModal()
        closeDialog()
    }

    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
        <Slide direction="up" in={openModal} mountOnEnter unmountOnExit>
            <div className='report-modal-container'>
                <ReportFeedBack 
                   openFeedbackModal={openFeedbackModal}
                   closeFeedbackeModal={handleCloseFeedbackModal}
                />
                <div className='report-modal-nav-container'>
                      <p>Report</p>
                      <CloseIcon onClick={handleCloseModal} />
                </div>

                <div className='report-modal-header-container'>
                      <p>Why are you reporting this account?</p>
                </div>

                <div className='report-modal-button-container'>
                     <Button onClick={handleOpenFeedbackModal}>It's a spam</Button>
                     <ArrowForwardIosIcon fontSize='small' />
                </div>

                <div className='report-modal-button-container'>
                     <Button onClick={handleOpenFeedbackModal}>it's inappropriate</Button>
                     <ArrowForwardIosIcon fontSize='small' />
                </div>

            </div>
        </Slide>

        </Modal>
    )
}


export default ReportModal






export const ReportDialog = ({ handleCloseDialog, openDialog}) =>{
    const [feedBackDialog, setFeedBackDialog] = useState(false)
    const handleOpenFeedBackDialog = () =>{
        setFeedBackDialog(true)
    }

    const handleCloseFeedBackDialog = () =>{
        setFeedBackDialog(false)
        handleCloseDialog()
    }

    return(
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='report-dialog-container'>
                
                <FeedBackDialog
                    openDialog={feedBackDialog}
                    handleCloseDialog={handleCloseFeedBackDialog}
                />

                <div className='report-dialog-nav-container'>
                      <p>Report</p>
                      <CloseIcon onClick={handleCloseDialog} />
                </div>

                <div className='report-dialog-header-container'>
                      <p>Why are you reporting this account?</p>
                </div>

                <div className='report-dialog-button-container'>
                     <Button onClick={handleOpenFeedBackDialog}>It's a spam</Button>
                     <ArrowForwardIosIcon fontSize='small' />
                </div>

                <div className='report-dialog-button-container'>
                     <Button onClick={handleOpenFeedBackDialog}>it's inappropriate</Button>
                     <ArrowForwardIosIcon fontSize='small' />
                </div>

            </div>
        </Dialog>
    )
}