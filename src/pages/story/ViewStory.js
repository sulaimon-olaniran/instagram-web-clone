import React, { useEffect, useState } from 'react'
import Stories from 'react-insta-stories'
import Avatar from '@material-ui/core/Avatar'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'


import { storyData } from '../../components/stories/Data'



const ViewStory = ({ storyId, openModal, handleCloseModal }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        storyData.forEach((data) => {
            if (data.id / storyId === 1) {
                setData(data)
            }
        })
    }, [storyId])


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Slide direction="up" in={openModal} mountOnEnter unmountOnExit>
                <div className='story-container'>
                    <div className='top-section-container'>
                        <div className='account-profile'>
                            <Avatar src={data.dp} />
                            <p>blahh_blahh</p>
                            <small>40m</small>
                        </div>
                        <CloseIcon fontSize='large' color='action' onClick={handleCloseModal} />
                    </div>

                    {data.stories &&
                        <Stories
                            stories={data.stories}
                            defaultInterval={3000}
                            width='100%'
                            height='100%'
                            onAllStoriesEnd={handleCloseModal}
                        />}
                </div>
            </Slide>
        </Modal>
    )
}


export default ViewStory