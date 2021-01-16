import React, { useRef, useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader"



import EachMessage from './EachMessage'
import MessageReactionsDrawer, { MessageReactionsDialog } from './reactions/ReactionsDrawer'



const ChatMessagesBody = ({
    chatMessages, sendingImage, imageBlob, sendingMessage, profile, user, classes, chatId,
    users, handleLikeMessage, handleUnlikeMessage, handleDeleteMessage, closeChatBoard }) => {

    const [reactionsDrawer, setReactionsDrawer] = useState(false)
    const [reactionsDialog, setReactionsDialog] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(null)
    //const [timeStamps, setTimeStamps] = useState([])
    const scrollRef = useRef(null)
    const bottomRef = useRef(null)




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
        
    }, [ chatMessages ])


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



    const timeStamps = []



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
                                closeChatBoard={closeChatBoard}
                                timeStamps={timeStamps}

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