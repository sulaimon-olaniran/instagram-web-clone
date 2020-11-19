import React from 'react'
import FollowTheme from './follow_ui/FollowTheme'


const Followers = ({ openModal, handleCloseModal, followers, from }) =>{
    console.log(followers)
    return(
        <FollowTheme 
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            header='Followers'
            data={followers}
            from={from}
        />
    )
}


export default Followers