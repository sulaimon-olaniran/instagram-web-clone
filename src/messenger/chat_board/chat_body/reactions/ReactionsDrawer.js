import React, { useState, useEffect, useCallback } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { Avatar } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import { CloseOutlined } from '@material-ui/icons'







const MessageReactions = ({ message, profile, users, unLikeMessage, text }) => {
    const [reactedUser, setReactedUser] = useState([])

    const handleGetReactedUserProfile = useCallback(() => {
        const gottenUser = []

        message && users && users.map(user => {
            return message.likes.includes(user.userId) ?
                gottenUser.push(user)
                : null
        })

        setReactedUser(gottenUser)

    }, [users, message])


    useEffect(() => {
        handleGetReactedUserProfile()
    }, [handleGetReactedUserProfile])


    return (
        <React.Fragment>
            {
                reactedUser.length > 0 && reactedUser.map(user => {
                    return (
                        <div className='each-reacted-user-container' key={user.userId}>
                            <div className='each-reacted-user-profile'>
                                <Avatar src={user.profilePhoto} />

                                <div
                                    className='each-reacted-user-name'
                                    onClick={user.userId === profile.userId ?
                                        unLikeMessage : null
                                    }
                                >
                                    <p>{user.userName}</p>
                                    {user.userId === profile.userId && <small>{text}</small>}
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

        </React.Fragment>
    )

}




const MessageReactionsDrawer = ({ openDrawer, handleCloseDrawer, message, profile, users, handleUnlikeMessage }) => {


    const unLikeMessage = () => {
        handleUnlikeMessage(message)
        handleCloseDrawer()
    }


    const text = 'Tap to remove'


    return (
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

                <MessageReactions
                    message={message}
                    profile={profile}
                    users={users}
                    unLikeMessage={unLikeMessage}
                    text={text}
                />
            </div>

        </Drawer>

    )
}



export default MessageReactionsDrawer




export const MessageReactionsDialog = ({ openDialog, handleCloseDialog, message, profile, users, handleUnlikeMessage }) => {

    const unLikeMessage = () => {
        handleUnlikeMessage(message)
        handleCloseDialog()
    }

    const text = 'Select to remove'
    return (

        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='reactions-dialog-container'>
                <div className='message-reactions-dialog-top-section'>
                    <p>Reactions</p>

                    <CloseOutlined
                        onClick={handleCloseDialog}
                    />
                </div>

                <MessageReactions
                    message={message}
                    profile={profile}
                    users={users}
                    unLikeMessage={unLikeMessage}
                    text={text}
                />
            </div>

        </Dialog>
    )
}