import React from 'react'
import Modal from '@material-ui/core/Modal'



import StoryBody from './story_body/StoryBody'




const CreateStoryModal = ({ openModal, handleCloseModal, filePreviewUrl, fileUrl }) => {

    //console.log(filePreviewUrl)
    //console.log(fileUrl)

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='create-story-modal-container'>
                <StoryBody
                    //filePreviewUrl={filePreviewUrl}
                    handleCloseModal={handleCloseModal}
                    //fileUrl={fileUrl}
                />
            </div>
        </Modal>
    )
}


export default CreateStoryModal