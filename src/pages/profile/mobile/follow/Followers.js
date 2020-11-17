import React from 'react'
import FollowTheme from './follow_ui/FollowTheme'


const Followers = ({ openModal, handleCloseModal, followers }) =>{
    console.log(followers)
    return(
        <FollowTheme 
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            header='Followers'
            data={followers}
        />
    )
}


export default Followers