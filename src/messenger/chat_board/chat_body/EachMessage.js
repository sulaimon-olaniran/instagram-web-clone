import React, { useRef, useState, useEffect, useCallback } from 'react'
import useDoubleClick from 'use-double-click'
import { Avatar, Button } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
//import ClickNHold from 'react-click-n-hold'




import { LikedIcon } from '../../../components/MyIcons'
import UnsendReportDialog from './unsend_report/UnsendReportDialog'
import UnsendReportPopper from './unsend_report/UnsendReportPopper'
import ViewChatImageModal from './view_image/ViewChatImage'
import ChatSharedPost from './shared_post/ChatSharedPost'
import { db } from '../../../firebase/Firebase'
import ConfirmUnsendMessageDialog from './unsend_report/confirm_unsend/ConfirmUnsendDialog'





const EachMessage = ({ message, classes, handleLikeMessage, profile, lastMessage, user,
    handleOpenReactionsDrawer, handleDeleteMessage, handleUnlikeMessage, closeChatBoard, timeStamps }) => {

    const [unsendReport, setUnsendReport] = useState(false) //to manipulate unsend report dialog
    const [reportPopper, setReportPopper] = useState(null)
    const [imageModal, setImageModal] = useState(false)
    const [imageSource, setImageSource] = useState(null)
    const [time, setTime] = useState(null)
    const [confirmUnsend, setConfirmUnsend] = useState(false)
    const messageRef = useRef(null) //ref for double clicking to like image
    const holdTimeRef = useRef(null) //ref for hold long press on message for mobiles




    const handleSetMessageToSeen = useCallback(() => {
        const ids = [profile && profile.userId, user && user.userId]
        const chatId = ids.sort().join(':')

        message && !message.seen && user && 
        db.collection('users').doc(user.userId).collection('chats')
            .doc(chatId).collection('messages').doc(message.messageId)
            .update({
                seen: true,
            })
            .then(() => {
                //console.log('seen success')
            })
            .catch(error => console.log(error))

    }, [profile, user, message])



    const handleSetMessageToRead = useCallback(() => {
        const ids = [profile && profile.userId, user && user.userId]
        const chatId = ids.sort().join(':')

        message && !message.seen && profile && 
        db.collection('users').doc(profile.userId).collection('chats')
            .doc(chatId).collection('messages').doc(message.messageId)
            .update({
                read: true,
            })
            .then(() => {
                //console.log('read success')
            })
            .catch(error => console.log(error))

    }, [profile, user, message])




    useEffect(() => {
        handleSetMessageToSeen()
        handleSetMessageToRead()

    }, [handleSetMessageToSeen, handleSetMessageToRead])




    useDoubleClick({
        onDoubleClick: e => {
            handleLikeMessage(message)
        },
        ref: messageRef,
        latency: 250
    })




    const handleMouseDown = () => {
        const screenWidth = window.matchMedia('(max-width: 1200px)')
        if (screenWidth.matches) {
            holdTimeRef.current = setTimeout(() => {
                setUnsendReport(true)
            }, 1500)
        }
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


    const handleOpenConfirmUnSendDialog = () => {
        setConfirmUnsend(true)
        setUnsendReport(false)
        setReportPopper(null)
    }


    const handleCloseConfirmUnsendDialog = () => {
        setConfirmUnsend(false)
    }



    const messageStyle = message.sender === profile.userId ? 'right-hand-side' : 'left-hand-side'
    const likeStyle = message.sender === profile.userId ? 'right-hand-side-liked' : 'left-hand-side-liked'




    if (!timeStamps.includes(moment(message.timeStamp).format("MMM Do YY"))) {
        timeStamps.push(moment(message.timeStamp).format("MMM Do YY"))
        setTime(moment(message.timeStamp).calendar())
    }


    // const clickStart = () =>{
    //     console.log("click start")
    // }

    // const clickHold = () =>{
    //     console.log('click held')
    // }

    // const clickStop = () =>{
    //     console.log("click stop")
    // }

    return (
        <div
            className='each-chat-message-container'
        >
            <UnsendReportDialog
                openDialog={unsendReport}
                handleCloseDialog={handleCloseUnsendReportDialog}
                message={message}
                handleDeleteMessage={handleOpenConfirmUnSendDialog}
                profile={profile}
            />

            <UnsendReportPopper
                anchorEl={reportPopper}
                handleClose={handleCloseReportPopper}
                message={message}
                profile={profile}
                handleDeleteMessage={handleOpenConfirmUnSendDialog}
                handleLikeMessage={handleLikeMessage}
                handleUnlikeMessage={handleUnlikeMessage}
            />

            <ConfirmUnsendMessageDialog
                openDialog={confirmUnsend}
                handleCloseDialog={handleCloseConfirmUnsendDialog}
                unSendMessage={handleDeleteMessage}
                message={message}
            />

            <ViewChatImageModal
                openModal={imageModal}
                handleCloseModal={handleCloseViewImageModal}
                imageSrc={imageSource}
            />

            { time !== null &&
                <div className='each-chat-message-time-container'>
                    <p>{time}</p>
                </div>
            }

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
                        onPointerMove={handleMouseUp}
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
                        onPointerMove={handleMouseUp}
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
                        onPointerMove={handleMouseUp}
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
                        onPointerMove={handleMouseUp}
                    >
                        <ChatSharedPost
                            postId={message.message}
                            closeChatBoard={closeChatBoard}
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