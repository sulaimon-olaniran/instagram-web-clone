import React, { useRef, useState } from 'react'
import useDoubleClick from 'use-double-click'
import { Avatar } from '@material-ui/core'





import { LikedIcon } from '../../../components/MyIcons'
import UnsendReportDialog from './unsend_report/UnsendReportDialog'





const EachMessage = ({ message, classes, handleLikeMessage, profile, lastMessage, handleOpenReactionsDrawer, user, handleDeleteMessage }) =>{
    const [unsendReport, setUnsendReport] = useState(false) //to manipulate unsend report dialog
    const messageRef= useRef(null)
    const holdTimeRef = useRef(null)
    
    useDoubleClick({
        onDoubleClick: e =>{
            handleLikeMessage(message)
        },
        ref : messageRef,
        latency : 250
    })


    const handleMouseDown = () => {
        holdTimeRef.current = setTimeout(() => {
            setUnsendReport(true)
        }, 1500)
    }

    const handleMouseUp = () => {
        clearTimeout(holdTimeRef.current)
    }


    const handleCloseUnsendReportDialog = () =>{
        setUnsendReport(false)
    }
    
    const messageStyle = message.sender === profile.userId ? 'right-hand-side' : 'left-hand-side'
    const likeStyle = message.sender === profile.userId ? 'right-hand-side-liked' : 'left-hand-side-liked'

    return(
        <div
            className='each-chat-message-container'
        >
            <UnsendReportDialog
                openDialog={unsendReport}
                handleCloseDialog={handleCloseUnsendReportDialog}
                message={message}
                handleDeleteMessage={handleDeleteMessage}
                profile={profile}
            />

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
                        onPointerDown={handleMouseDown}
                        onPointerUp={handleMouseUp}

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
                    <div 
                        ref={messageRef}
                        onPointerDown={handleMouseDown}
                        onPointerUp={handleMouseUp}

                    >
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
                        onPointerDown={handleMouseDown}
                        onPointerUp={handleMouseUp}

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