import React from 'react'
import Modal from '@material-ui/core/Modal'



import StoryBody from './story_body/StoryBody'




const CreateStoryModal = ({ openModal, handleCloseModal, filePreviewUrl, fileUrl }) => {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='create-story-modal-container'>
                <StoryBody
                    handleCloseModal={handleCloseModal}
                />
            </div>
        </Modal>
    )
}


export default CreateStoryModal