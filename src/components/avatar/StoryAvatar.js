import React from 'react'
import Avatar from '@material-ui/core/Avatar'




const StoryAvatar = ({ src, height, width, action }) => {
    return (
        <div 
            className='story-avatar-container' 
            style={{ height : height, width : width}} 
            onClick={action}
        >
                
        <Avatar src={src} />
           
        </div>
    )
}




export default StoryAvatar