import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Slide from '@material-ui/core/Slide'
import ReportFeedBack from './feedback/FeedBack'



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