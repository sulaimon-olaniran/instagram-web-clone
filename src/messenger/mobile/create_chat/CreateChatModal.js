import React from 'react'
import Modal from '@material-ui/core/Modal'
import NewMessageTheme from '../../new_message/NewMessage'







const CreateChatModal = ({handleCloseModal, openModal}) =>{
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='create-chat-modal-container'>
                <NewMessageTheme 
                    close={handleCloseModal}
                />
            </div>

        </Modal>
    )
}


export default CreateChatModal