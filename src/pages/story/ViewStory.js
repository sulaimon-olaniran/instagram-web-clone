import React, { useEffect, useState, useRef } from 'react'
import Stories from 'react-insta-stories'
//import Avatar from '@material-ui/core/Avatar'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import moment from 'moment'



//import { storyData } from '../../components/stories/Data'
import { handleUnviewStory } from '../../store/actions/AppActions'
import DeleteStoryDialog from './delete_story/DeleteStory'



const ViewStory = ({ handleCloseStory, stories, viewStory, storyUser, auth }) => {
    const [data, setData] = useState([])
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedStory, setSelectedStory] = useState(null) //selected story to be deleted
    const indexRef = useRef(null)
    //console.log(auth.uid, storyUser && storyUser.userId)

    useEffect(() => {
        const userStories = []
        stories && stories.forEach((story) => {
            if (storyUser && storyUser.stories.includes(story.storyId)) {
                userStories.push(story)
            }
        })

        setData(userStories)
        //console.log(userStories)

    }, [storyUser, stories])
    //console.log(data)
    const storiesData = data && data.map(data =>{
        return {
            url : data.fileUrl,
            duration : 5000,
            storyId : data.storyId,
            header : {
                heading : storyUser && storyUser.userName,
                subheading : moment(data.time).fromNow(),
                profileImage : storyUser && storyUser.profilePhoto
            }
        }
    })

    const getCurrentStoryId = index =>{
        indexRef.current = index
    }

    const handleOpenDeleteDialog = (id) =>{
        setSelectedStory(id)
        setDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () =>{
        setSelectedStory(null)
        setDeleteDialog(false)
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={viewStory}
            onClose={handleCloseStory}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Slide direction="up" in={viewStory} mountOnEnter unmountOnExit>
                <div className='story-container'>
                    <DeleteStoryDialog 
                        openDialog={deleteDialog}
                        handleCloseDialog={handleCloseDeleteDialog}
                        storyId={selectedStory}
                    />

                    <div className='top-section-container'>
                        <CloseIcon fontSize='large' color='action' onClick={handleCloseStory} />
                    </div>

                    { storyUser && storyUser.userId === auth.uid &&
                    <div className='bottom-more-button-container'>
                        <MoreHorizIcon
                            fontSize='large'
                            onClick={() => handleOpenDeleteDialog(indexRef.current)}
                        />
                    </div>
                    }

                    {data &&
                        <Stories
                            stories={storiesData}
                            defaultInterval={5000}
                            width='100%'
                            height='100%'
                            onStoryStart={index => getCurrentStoryId(storiesData[index].storyId)}
                            onAllStoriesEnd={handleCloseStory}
                        />}
                </div>
            </Slide>
        </Modal>
    )
}



const mapStateToProps = state =>{
    return{
        stories: state.firestore.ordered.stories,
        viewStory : state.application.viewStory,
        storyUser : state.application.storyUser,
        auth : state.firebase.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        handleCloseStory : () => dispatch(handleUnviewStory())
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['stories'])
)(ViewStory)