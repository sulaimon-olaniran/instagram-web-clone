import React from 'react'
import FollowTheme from './follow_ui/FollowTheme'


const Following = ({ openModal, handleCloseModal, following, from }) =>{
    //console.log(following)
    return(
        <FollowTheme 
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            header='Following'
            data={following}
            from={from}
        />
    )
}


export default Following