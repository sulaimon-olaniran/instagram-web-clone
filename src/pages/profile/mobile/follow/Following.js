import React from 'react'
import FollowTheme from './follow_ui/FollowTheme'


const Following = ({ openModal, handleCloseModal, following }) =>{
    console.log(following)
    return(
        <FollowTheme 
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            header='Following'
            data={following}
        />
    )
}


export default Following