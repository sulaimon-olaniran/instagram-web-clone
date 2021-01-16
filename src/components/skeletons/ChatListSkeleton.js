import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'



//CSS FILE FOUND IN FEED SKELETON SCSS


const ChatListSkeleton = () => {
    return (
        <div className='chat-list-skeleton-container'>
            <Skeleton
                height={64}
                width={64}
                variant='circle'
                animation='wave'
            />

            <div className='chat-list-inner-container'>
                
                <Skeleton
                    variant='rect'
                    animation='wave'
                    height={20}
                />

                
                <Skeleton
                    variant='rect'
                    animation='wave'
                    height={15}
                />
            </div>
        </div>
    )
}


export default ChatListSkeleton