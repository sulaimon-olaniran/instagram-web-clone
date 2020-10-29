import React from 'react'



const StoryAvatar = ({ src, alt, height, width, action }) => {
    return (
        <div className='story-avatar-container' style={{ minHeight : height, minWidth : width}} onClick={action}>
            <div className='story-image-container'>
                <img src={src} alt={alt} />
            </div>
        </div>
    )
}




export default StoryAvatar