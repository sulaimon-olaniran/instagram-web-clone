import React, { useRef, useEffect, useCallback, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader"



import { db } from '../../../firebase/Firebase'
import EachMessage from './EachMessage'
import MessageReactionsDrawer, { MessageReactionsDialog } from './reactions/ReactionsDrawer'



const ChatMessagesBody = ({
    chatMessages, sendingImage, imageBlob, sendingMessage, profile, user, classes, chatId,
    users, handleLikeMessage, handleUnlikeMessage, handleDeleteMessage }) => {

    const [reactionsDrawer, setReactionsDrawer] = useState(false)
    const [reactionsDialog, setReactionsDialog] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(null)
    const scrollRef = useRef(null)
    const bottomRef = useRef(null)


    const handleSetMessagesToSeen = useCallback(() => {
        chatMessages && chatMessages.map((message => {
            return message.sender === user.userId && message.seen === false ?
                db.collection('users').doc(user.userId).collection('chats')
                    .doc(chatId).collection('messages').doc(message.messageId)
                    .update({
                        seen: true,
                    })
                    .then(() => {
                        console.log('seen success')
                    })
                    .catch(error => console.log(error))
                : null
        }))

    }, [chatMessages, user, chatId])


    const scrollToBottom = () =>{
        const chatContainer = scrollRef.current
        chatContainer.scrollTop = chatContainer.scrollHeight

        //for mobiles
        window.scrollTo({
            behavior: "smooth",
            top: bottomRef.current.offsetTop
        })
    }



    useEffect(() => {

        scrollToBottom()
        handleSetMessagesToSeen()
    }, [ handleSetMessagesToSeen])


    const lastMessage = chatMessages && chatMessages.slice(-1).pop()


    const handleOpenReactionsDrawer = (message) => {
        const screenWidth = window.matchMedia('(min-width: 600px)')
        if(screenWidth.matches){
            setSelectedMessage(message)
            setReactionsDialog(true)
        }
        else{  
            setSelectedMessage(message)
            setReactionsDrawer(true)
        }
    }

    const handleCloseReactionsDrawer = () => {
        setReactionsDrawer(false)
        setReactionsDialog(false)
        setSelectedMessage(null)
    }




    return (
        <div className='chat-messages-body-container' ref={scrollRef}>
            <div className='chat-messages-body-contents-container'>
                
                <MessageReactionsDrawer
                    openDrawer={reactionsDrawer}
                    handleCloseDrawer={handleCloseReactionsDrawer}
                    message={selectedMessage}
                    profile={profile}
                    users={users}
                    handleUnlikeMessage={handleUnlikeMessage}
                />


                <MessageReactionsDialog
                    openDialog={reactionsDialog}
                    handleCloseDialog={handleCloseReactionsDrawer}
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
                                handleUnlikeMessage={handleUnlikeMessage}
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
            
            </div>

            <div ref={bottomRef}></div>
        </div>
    )
}



export default ChatMessagesBody