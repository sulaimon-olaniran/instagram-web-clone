import { Avatar } from '@material-ui/core'
import React, { useRef, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"




import { LikedIcon } from '../../../components/MyIcons'




const ChatMessagesBody = ({ chatMessages, sendingImage, imageBlob, sendingMessage, profile, user, classes }) =>{

    const scrollRef = useRef(null)


    useEffect(() =>{
        if(scrollRef.current && chatMessages !== null && chatMessages.length > 0){
            window.scrollTo({
                behavior: "smooth",
                top: scrollRef.current.offsetTop
            })
        }
    }, [ chatMessages])

    
    return(
        <div className='chat-messages-body-container'>
            
            {
                chatMessages !== null && chatMessages.map(message =>{

                    const messageStyle = message.sender === profile.userId ? 'right-hand-side' : 'left-hand-side'
                    return(
                        <div 
                            key={message.messageId} 
                            className='each-chat-message-container'>

                            { message.messageType === 'text' 
                                &&
                                <div className={`each-chat-message-text-container ${messageStyle}`}>
                                    {
                                        message.sender !== profile.userId &&
                                        <Avatar src={user.profilePhoto} className={classes.xTiny} />
                                    }
                                    <div className='text-container'>
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
                                    <LikedIcon
                                        width='44px'
                                        height='44px'
                                    />
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
                                    <div className='image-container'>
                                     <img src={message.message} alt='file' />

                                    </div>
                                </div>
                            }

                        </div>
                        
                    )
                })

            }

            {
                sendingImage === true  && 
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