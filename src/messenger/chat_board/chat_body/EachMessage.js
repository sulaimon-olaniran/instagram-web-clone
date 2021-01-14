import React, { useRef, useState } from 'react'
import useDoubleClick from 'use-double-click'
import { Avatar, Button } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'




import { LikedIcon } from '../../../components/MyIcons'
import UnsendReportDialog from './unsend_report/UnsendReportDialog'
import UnsendReportPopper from './unsend_report/UnsendReportPopper'
import ViewChatImageModal from './view_image/ViewChatImage'
import ChatSharedPost from './shared_post/ChatSharedPost'





const EachMessage = ({ message, classes, handleLikeMessage, profile, lastMessage, handleOpenReactionsDrawer, user, handleDeleteMessage, handleUnlikeMessage }) => {
    const [unsendReport, setUnsendReport] = useState(false) //to manipulate unsend report dialog
    const [reportPopper, setReportPopper] = useState(null)
    const [imageModal, setImageModal] = useState(false)
    const [imageSource, setImageSource] = useState(null)
    const messageRef = useRef(null) //ref for double clicking to like image
    const holdTimeRef = useRef(null) //ref for hold long press on message for mobiles

    useDoubleClick({
        onDoubleClick: e => {
            handleLikeMessage(message)
        },
        ref: messageRef,
        latency: 250
    })


    const handleMouseDown = () => {
        holdTimeRef.current = setTimeout(() => {
            setUnsendReport(true)
        }, 1500)
    }

    const handleMouseUp = () => {
        clearTimeout(holdTimeRef.current)
    }


    const handleCloseUnsendReportDialog = () => {
        setUnsendReport(false)
    }


    const handleOpenReportPopper = (event) => {
        setReportPopper(event.currentTarget)
        //console.log(event.currentTarget)
    }

    const handleCloseReportPopper = () => {
        setReportPopper(null)
    }


    const handleOpenviewImageModal = source => {
        setImageSource(source)
        setImageModal(true)
    }



    const handleCloseViewImageModal = () => {
        setImageModal(false)
        setImageSource(null)
    }

    const messageStyle = message.sender === profile.userId ? 'right-hand-side' : 'left-hand-side'
    const likeStyle = message.sender === profile.userId ? 'right-hand-side-liked' : 'left-hand-side-liked'



    return (
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

            <UnsendReportPopper
                anchorEl={reportPopper}
                handleClose={handleCloseReportPopper}
                message={message}
                profile={profile}
                handleDeleteMessage={handleDeleteMessage}
                handleLikeMessage={handleLikeMessage}
                handleUnlikeMessage={handleUnlikeMessage}
            />

            <ViewChatImageModal
                openModal={imageModal}
                handleCloseModal={handleCloseViewImageModal}
                imageSrc={imageSource}
            />

            { message.messageType === 'text'
                &&
                <div className={`each-chat-message-text-container ${messageStyle}`}>
                    {
                        message.sender !== profile.userId &&
                        <Avatar src={user.profilePhoto} className={classes.xTiny} />
                    }

                    {
                        message.sender === profile.userId &&
                        <div className='more-options'>
                            <Button onClick={handleOpenReportPopper}>
                                <MoreHorizIcon />
                            </Button>
                        </div>
                    }
                    <div
                        className='text-container'
                        ref={messageRef}
                        onPointerDown={handleMouseDown}
                        onPointerUp={handleMouseUp}

                    >
                        <p>{message.message}</p>
                    </div>

                    {
                        message.sender !== profile.userId &&
                        <div className='more-options'>
                            <Button onClick={handleOpenReportPopper}>
                                <MoreHorizIcon />
                            </Button>
                        </div>
                    }
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

                    {
                        message.sender === profile.userId &&
                        <div className='more-options'>
                            <Button onClick={handleOpenReportPopper}>
                                <MoreHorizIcon />
                            </Button>
                        </div>
                    }
                    <div
                        ref={messageRef}
                        onPointerDown={handleMouseDown}
                        onPointerUp={handleMouseUp}
                        className='heart-text-container'

                    >
                        <LikedIcon
                            width='44px'
                            height='44px'
                        />

                        {
                            message.sender !== profile.userId &&
                            <div className='more-options'>
                                <Button onClick={handleOpenReportPopper}>
                                    <MoreHorizIcon />
                                </Button>
                            </div>
                        }
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
                    {
                        message.sender === profile.userId &&
                        <div className='more-options'>
                            <Button onClick={handleOpenReportPopper}>
                                <MoreHorizIcon />
                            </Button>
                        </div>
                    }
                    <div
                        className='image-container'
                        ref={messageRef}
                        onPointerDown={handleMouseDown}
                        onPointerUp={handleMouseUp}
                        onClick={() => handleOpenviewImageModal(message.message)}

                    >
                        <img src={message.message} alt='file' />

                    </div>

                    {
                        message.sender !== profile.userId &&
                        <div className='more-options'>
                            <Button onClick={handleOpenReportPopper}>
                                <MoreHorizIcon />
                            </Button>
                        </div>
                    }
                </div>
            }

            {
                message.messageType === 'post'
                &&
                <div className={`each-chat-message-post-container ${messageStyle}`}>
                    {
                        message.sender !== profile.userId &&
                        <Avatar src={user.profilePhoto} className={classes.xTiny} />
                    }

                    {
                        message.sender === profile.userId &&
                        <div className='more-options'>
                            <Button onClick={handleOpenReportPopper}>
                                <MoreHorizIcon />
                            </Button>
                        </div>
                    }

                    <div
                        className='chat-post-container'
                        ref={messageRef}
                        onPointerDown={handleMouseDown}
                        onPointerUp={handleMouseUp}

                    >
                        <ChatSharedPost
                            postId={message.message}
                        />

                    </div>

                    {
                        message.sender !== profile.userId &&
                        <div className='more-options'>
                            <Button onClick={handleOpenReportPopper}>
                                <MoreHorizIcon />
                            </Button>
                        </div>
                    }
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