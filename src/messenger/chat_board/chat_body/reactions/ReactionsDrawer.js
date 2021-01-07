import React, { useState, useEffect, useCallback } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { Avatar } from '@material-ui/core'






const MessageReactionsDrawer = ({ openDrawer, handleCloseDrawer, message, profile, users, handleUnlikeMessage }) =>{
    const [reactedUser, setReactedUser] = useState([])

    const handleGetReactedUserProfile = useCallback(() =>{
        const gottenUser = []

        message && users && users.map(user =>{
            return message.likes.includes(user.userId) ?
            gottenUser.push(user)
            : null
        })

        setReactedUser(gottenUser)

    }, [ users, message])


    useEffect(() =>{
        handleGetReactedUserProfile()
    }, [ handleGetReactedUserProfile ])


    return(
        <Drawer
            anchor='bottom'
            open={openDrawer}
            onClose={handleCloseDrawer}
        >
            <div className='message-reactions-drawer-container'>

                <div className='message-reactions-top-section'>
                        <span className='message-reactions-span' />
                        <p>Reactions</p>
                </div>

                {
                    reactedUser.length > 0 && reactedUser.map(user =>{
                        return(
                            <div className='each-reacted-user-container' key={user.userId}>
                                <div className='each-reacted-user-profile'>
                                    <Avatar src={user.profilePhoto} />

                                    <div 
                                        className='each-reacted-user-name'
                                        onClick={ user.userId === profile.userId ?
                                            () => handleUnlikeMessage(message) : null
                                        }
                                    >
                                        <p>{user.userName}</p>
                                        {user.userId === profile.userId && <small>Tap to remove</small>}
                                    </div>
                                </div>

                                <span 
                                    className='dark-reaction-icon'
                                    role='img'
                                    aria-label='xxxx'
                                >
                                    ❤️
                                </span>
                            </div>
                        )
                    })
                }

            </div>

        </Drawer>

    )
}



export default MessageReactionsDrawer