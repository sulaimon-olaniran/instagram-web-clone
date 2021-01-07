import React, { useState, useEffect, useCallback } from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import momemt from 'moment'



import { db } from '../../../firebase/Firebase'


const useStyles = makeStyles((theme) => ({
    Large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    tiny: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}))



const EachChat = ({ user, handleOpenChatBoard, profile }) =>{
    const [chatMessages, setChatMessages] = useState(null)
    const [fetchingMessages, setFetchingMessages] = useState(null)
    
    const classes = useStyles()

    const interlocutors = [user && user.userId, profile && profile.userId]
    const chatId = interlocutors.sort().join(':')


    const handleFetchChatMessages = useCallback(() =>{
        setFetchingMessages(true)
        db.collection('users').doc(profile.userId)
        .collection('chats').doc(chatId).collection('messages')
        .orderBy('timeStamp', 'asc').onSnapshot(snapshots =>{
            const messages = []
            snapshots.forEach(snapshot =>{
                messages.push(snapshot.data())
            })

            setChatMessages(messages)
            setFetchingMessages(false)
        })
    }, [ chatId, profile ])


    useEffect(() =>{
        handleFetchChatMessages()

    }, [ handleFetchChatMessages ])

    const lastMessage = chatMessages && chatMessages.slice(-1).pop()



    return(
        <div 
            className='each-chat-container'
            onClick={() =>{handleOpenChatBoard(user)}}
            to='/direct/t/chat'
        >
            <Avatar src={user.profilePhoto} className={classes.Large} />

            <div className='each-chat-details-container'>
                <p>{user.userName}</p>
                {
                    lastMessage && lastMessage.type === 'text' && lastMessage.sender === profile 
                    && profile.userId && <small>You sent a text · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && lastMessage.type === 'text' && lastMessage.sender !== profile 
                    && profile.userId && <small>{lastMessage.message.substring(0, 20)} · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && lastMessage.type === 'photo' && lastMessage.sender === profile 
                    && profile.userId && <small>You sent a photo · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && lastMessage.type === 'text' && lastMessage.sender !== profile 
                    && profile.userId && <small>Sent you a photo · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {/* {
                    lastMessage && lastMessage.type === 'text' && lastMessage.sender === profile 
                    && profile.userId && <small>You sent a text · {momemt(message.timeStamp).fromNow()}</small>
                } */}

            </div>

        </div>
    )
}


export default EachChat