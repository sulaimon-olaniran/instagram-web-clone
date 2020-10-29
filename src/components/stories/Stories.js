import React, { useState } from 'react'
//import { Link } from 'react-router-dom'
import ViewStory from '../../pages/story/ViewStory'

import StoryAvatar from '../avatar/StoryAvatar'
import { storyData } from './Data'



const Stories = () =>{
    const [openModal, setOpenModal] = useState(false)
    const [modalId, setModalId] = useState(null)
    
    const handleOpenModal = (id) =>{
        setOpenModal(true)
        setModalId(id)
        console.log('I got clicked to open story')
    }

    const handleCloseModal = () =>{
        setOpenModal(false)
        setModalId('')
    }


    return(
        <React.Fragment>
            <ViewStory
              storyId={modalId}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
            />
            {
                storyData.map((data, i) =>{
                    return(
                        <React.Fragment key={i}>
                        <StoryAvatar 
                            src={data.dp}
                            alt='Girl'
                            height='74px'
                            width='74px'
                            action={() => handleOpenModal(data.id)}
                        />
                        </React.Fragment>
                    )
                })
            }

        </React.Fragment>
    )
}


export default Stories