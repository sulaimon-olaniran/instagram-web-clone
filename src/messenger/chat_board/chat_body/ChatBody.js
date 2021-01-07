import React, { useRef, useEffect, useCallback, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader"



import { db } from '../../../firebase/Firebase'
import EachMessage from './EachMessage'
import MessageReactionsDrawer from './reactions/ReactionsDrawer'





const ChatMessagesBody = ({ 
    chatMessages, sendingImage, imageBlob, sendingMessage, profile, user, classes, chatId, 
    users, handleLikeMessage, handleUnlikeMessage, handleDeleteMessage }) => {

    const [reactionsDrawer, setReactionsDrawer] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(null)
    const scrollRef = useRef(null)
    

    const handleSetMessagesToSeen = useCallback(() =>{
        chatMessages && chatMessages.map((message =>{
            return message.sender === user.userId && message.seen === false ?
                db.collection('users').doc(user.userId).collection('chats')
                .doc(chatId).collection('messages').doc(message.messageId)
                .update({
                    seen : true,
                })
                .then(() =>{
                    console.log('seen success')
                })
                .catch(error => console.log(error))
            : null
        }))

    }, [ chatMessages, user, chatId ])


    useEffect(() => {
        if (scrollRef.current && chatMessages !== null && chatMessages.length > 0) {
            window.scrollTo({
                behavior: "smooth",
                top: scrollRef.current.offsetTop
            })
        }

        handleSetMessagesToSeen()
    }, [chatMessages, handleSetMessagesToSeen])


    const lastMessage = chatMessages && chatMessages.slice(-1).pop()

    const handleOpenReactionsDrawer = (message) => {
        setSelectedMessage(message)
        setReactionsDrawer(true)
    }

    const handleCloseReactionsDrawer = () => {
        setReactionsDrawer(false)
        setSelectedMessage(null)
    }


    return (
        <div className='chat-messages-body-container'>
            <MessageReactionsDrawer
                openDrawer={reactionsDrawer}
                handleCloseDrawer={handleCloseReactionsDrawer}
                message={selectedMessage}
                profile={profile}
                users={users}
                handleUnlikeMessage={handleUnlikeMessage}
            />

            {
                chatMessages !== null && chatMessages.map(message => {
                    return (
                        <EachMessage
                            key={message.messageId}
                            message={message}
                            classes={classes}
                            handleLikeMessage={handleLikeMessage}
                            profile={profile}
                            lastMessage={lastMessage}
                            handleOpenReactionsDrawer={handleOpenReactionsDrawer}
                            user={user}
                            handleDeleteMessage={handleDeleteMessage}
                        />
                    )
                })

            }

            {
                sendingImage === true &&
                <div className='each-chat-message-container'>
                    <div className={`each-chat-message-photo-container right-hand-side`}>
                        <div className='image-container'>
                            <img src={imageBlob} alt='file' />
                            <div className='clip-loader'>
                                <ClipLoader />
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div ref={scrollRef} />
        </div>
    )
}



export default ChatMessagesBody