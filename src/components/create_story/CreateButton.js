import React from 'react'
import { connect } from 'react-redux'



import CreateStoryModal from './CreateStory'
import { openCreateStoryModal, closeCreateStoryModal } from '../../store/actions/StoryAction'



const CreateButton = ({ component, openCreateStoryModal, closeCreateStoryModal, createStoryModal }) => {

    const handleInputChange = e => {
        if (e.target.files[0]) {
            const data = {
                fileUrl : e.target.files[0],
                filePreviewUrl : URL.createObjectURL(e.target.files[0])
            }
            openCreateStoryModal(data) 
        }
    }


    const handleCloseModal = () =>{
        closeCreateStoryModal()
    }



    return (
        <React.Fragment>
            <label>
                <input
                    type="file"
                    onChange={handleInputChange}
                    accept="image/png, .jpeg, .jpg, image/gif"
                    style={{ display: 'none' }}
                />
                {component}
            </label>
            
            <CreateStoryModal 
               openModal={createStoryModal}
               handleCloseModal={handleCloseModal}
            />
        </React.Fragment>
    )
}

const mapStateToProps = state =>{
    return{
        createStoryModal : state.story.createStoryModal,
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        openCreateStoryModal : data => dispatch(openCreateStoryModal(data)), 
        closeCreateStoryModal : () => dispatch(closeCreateStoryModal()), 
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateButton)