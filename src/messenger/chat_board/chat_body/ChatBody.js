import { Avatar } from '@material-ui/core'
import React from 'react'




import { LikedIcon } from '../../../components/MyIcons'




const ChatMessagesBody = ({ chatMessages, sendingImage, imageBlob, sendingMessage, profile, user, classes }) =>{
    
    return(
        <div className='chat-messages-body-container'>
            {
                chatMessages !== null && chatMessages.map(message =>{

                    const messageStyle = message.sender === profile.userId ? 'right-hand-side' : 'left-hand-side'
                    return(
                        <div key={message.messageId} className='each-chat-message-container'>
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
                                    <img src={message.message} alt='file' />
                                </div>
                            }

                        </div>
                        
                    )
                })

            }

            {
                sendingImage && sendingMessage &&
                <div className={`each-chat-message-photo-container right-hand-side`}>
                    <img src={imageBlob} alt='file' />
                </div>
            }
        </div>
    )
}



export default ChatMessagesBody