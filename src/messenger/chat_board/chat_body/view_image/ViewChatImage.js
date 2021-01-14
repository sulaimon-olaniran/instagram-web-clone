import React from 'react'
import Modal from '@material-ui/core/Modal'
import { CloseOutlined } from '@material-ui/icons'





const ViewChatImageModal = ({ openModal, handleCloseModal, imageSrc }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='view-chat-image-container' onClick={handleCloseModal}>
                <img src={imageSrc} alt='file' />
                <div className='close-chat-view-image-modal'>
                    <CloseOutlined
                        onClick={handleCloseModal}
                    />
                </div>
            </div>

        </Modal>
    )

}



export default ViewChatImageModal