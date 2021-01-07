import React, { useRef } from 'react'
import useDoubleClick from 'use-double-click'
import { Avatar } from '@material-ui/core'





import { LikedIcon } from '../../../components/MyIcons'





const EachMessage = ({ message, classes, handleLikeMessage, profile, lastMessage, handleOpenReactionsDrawer, user }) =>{
    const messageRef= useRef(null)
    
    useDoubleClick({
        onDoubleClick: e =>{
            handleLikeMessage(message)
        },
        ref : messageRef,
        latency : 250
    })
    
    const messageStyle = message.sender === profile.userId ? 'right-hand-side' : 'left-hand-side'
    const likeStyle = message.sender === profile.userId ? 'right-hand-side-liked' : 'left-hand-side-liked'

    return(
        <div
            className='each-chat-message-container'>

            { message.messageType === 'text'
                &&
                <div className={`each-chat-message-text-container ${messageStyle}`}>
                    {
                        message.sender !== profile.userId &&
                        <Avatar src={user.profilePhoto} className={classes.xTiny} />
                    }
                    <div 
                        className='text-container'
                        ref={messageRef}
                    >
                        <p>{message.message}</p>
                    </div>
                </div>
            }

            {
                message.messageType === 'heart'
                &&
                <div className={`each-chat-message-heart-container ${messageStyle}`}>
                    {
                        message.sender !== profile.userId &&
                        <Avatar src={user.profilePhoto} className={classes.xTiny} />
                    }
                    <div ref={messageRef}>
                    <LikedIcon
                        width='44px'
                        height='44px'
                    />
                    </div>
                </div>
            }

            {
                message.messageType === 'image'
                &&
                <div className={`each-chat-message-photo-container ${messageStyle}`}>
                    {
                        message.sender !== profile.userId &&
                        <Avatar src={user.profilePhoto} className={classes.xTiny} />
                    }
                    <div 
                        className='image-container'
                        ref={messageRef}
                    >
                        <img src={message.message} alt='file' />

                    </div>
                </div>
            }

            {lastMessage && lastMessage.messageId === message.messageId &&
                lastMessage.sender === profile.userId && lastMessage.seen === true &&
                <div className='message-seen-container'>
                    <small>seen</small>
                </div>
            }

            { message.likes.length > 0 &&
                <span
                    onClick={() => handleOpenReactionsDrawer(message)}
                    className={`like-style-container ${likeStyle}`}
                    role='img'
                    aria-label='xxxx'
                >
                    ❤️
            </span>
            }

        </div>

    )
}



export default EachMessage