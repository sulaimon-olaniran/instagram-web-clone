import React from 'react'
import FollowTheme from './follow_ui/FollowTheme'


const Following = ({ openModal, handleCloseModal }) =>{
    return(
        <FollowTheme 
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            data='Following'
        />
    )
}


export default Following