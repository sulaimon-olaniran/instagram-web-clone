import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'


import { deleteStory } from '../../../store/actions/StoryAction'
import { handleUnviewStory } from '../../../store/actions/AppActions'



const ConfirmDeleteStoryDialog = ({ openDialog, handleCloseDialog, storyId, deleteStory, profile, handleUnviewStory }) =>{


    const handleDeleteStory = () =>{
        const data = {
            storyId : storyId,
            userId : profile.userId
        }

        deleteStory(data)
        handleCloseDialog()
        handleUnviewStory()
    }


    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='confirm-delete-story-dialog-container'>
                <h2>Delete Story ?</h2>
                <p>Are you sure you want to delete this photo from your story?</p>

                <div className='confirm-delete-story-dialog-buttons-container'>

                <div className='button-container'>
                    <Button
                        color='primary'
                        onClick={handleDeleteStory}
                    >
                        Delete
                    </Button>
                </div>

                <div className='button-container'>
                    <Button
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                </div>
                </div>
                
            </div>

        </Dialog>
    )
}


const mapStateToProps = state =>{
    return{
        profile : state.firebase.profile
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        deleteStory : data => dispatch(deleteStory(data)),
        handleUnviewStory : () => dispatch(handleUnviewStory())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteStoryDialog)