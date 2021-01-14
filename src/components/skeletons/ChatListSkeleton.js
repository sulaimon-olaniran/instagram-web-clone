import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'



//CSS FILE FOUND IN FEED SKELETON SCSS


const ChatListSkeleton = () => {
    return (
        <div className='chat-list-skeleton-container'>
            <Skeleton
                variant='rect'
                animation='wave'
            />
        </div>
    )
}


export default ChatListSkeleton