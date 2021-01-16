import React, { useState, useEffect, useCallback } from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import momemt from 'moment'



import { db } from '../../../firebase/Firebase'
import ChatListSkeleton from '../../../components/skeletons/ChatListSkeleton'


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



const EachChat = ({ user, handleOpenChatBoard, profile, selectChatUser }) => {
    const [chatMessages, setChatMessages] = useState(null)
    const [fetchingMessages, setFetchingMessages] = useState(null)

    //console.log(fetchingMessages)

    const classes = useStyles()

    const interlocutors = [user && user.userId, profile && profile.userId]
    const chatId = interlocutors.sort().join(':')


    const handleFetchChatMessages = useCallback(() => {
        setFetchingMessages(true)
        db.collection('users').doc(profile.userId)
            .collection('chats').doc(chatId).collection('messages')
            .orderBy('timeStamp', 'asc').onSnapshot(snapshots => {
                const messages = []
                snapshots.forEach(snapshot => {
                    messages.push(snapshot.data())
                })

                setChatMessages(messages)
                setFetchingMessages(false)
            })
    }, [chatId, profile])


    useEffect(() => {
        handleFetchChatMessages()

    }, [handleFetchChatMessages])

    const lastMessage = chatMessages && chatMessages.slice(-1).pop()


    const goToChatBoard = () => {
        const screenWidth = window.matchMedia('(min-width: 600px)')
        if (screenWidth.matches) {
            selectChatUser(user)
        }
        else {
            handleOpenChatBoard(user)
        }
    }

    if(fetchingMessages) return <ChatListSkeleton />
    return (
        <div
            className='each-chat-container'
            onClick={goToChatBoard}
        >
            <Avatar src={user.profilePhoto} className={classes.Large} />

            <div className='each-chat-details-container'>
                <p>{user.userName}</p>
                {
                    lastMessage && profile && lastMessage.messageType === 'text' && lastMessage.sender ===
                    profile.userId && <small>You sent a text · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && profile && lastMessage.messageType === 'text' && lastMessage.sender !== profile.userId &&
                    <small>{lastMessage.message.substring(0, 20)} · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && profile && lastMessage.messageType === 'image' && lastMessage.sender === profile.userId
                    && <small>You sent a photo · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && profile && lastMessage.messageType === 'image' && lastMessage.sender !== profile.userId
                    && <small>Sent you a photo · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && lastMessage.messageType === 'heart' &&
                    <small><span role='img' aria-label='xxxx'>❤️</span> · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && profile && lastMessage.messageType === 'post' && lastMessage.sender !== profile.userId
                    && <small>Shared a post · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

                {
                    lastMessage && profile && lastMessage.messageType === 'post' && lastMessage.sender === profile.userId
                    && <small>You shared a post · {momemt(lastMessage.timeStamp).fromNow()}</small>
                }

            </div>

            {lastMessage && lastMessage.sender !== profile.userId && lastMessage.read === false && <div className='unread-message-sign' />}


        </div>

    )
}


export default EachChat