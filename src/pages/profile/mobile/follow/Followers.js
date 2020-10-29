import React from 'react'
import FollowTheme from './follow_ui/FollowTheme'


const Followers = ({ openModal, handleCloseModal }) =>{
    return(
        <FollowTheme 
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            data='Followers'
        />
    )
}


export default Followers