import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { ArrowBackIosOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { v4 as uuidv4 } from 'uuid'



import { ChatActionsIcon } from '../../components/MyIcons'
import { UnLikedIcon, PhotoIcon } from '../../components/MyIcons'
import ChatDetails from './details/ChatDetails'
import { db, storage } from '../../firebase/Firebase'
import { sendMessage, deleteMessage, likeMessage, unlikeMessage, } from '../../store/actions/MessengerAction'
import LogoLoader from '../../components/loaders/LogoLoader'
import ChatMessagesBody from './chat_body/ChatBody'




const useStyles = makeStyles((theme) => ({
    xLarge: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },

    tiny: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    xTiny: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}))


const ChatBoard = ({ selectedAccount, closeChatBoard, users, sendMessage, deleteMessage, 
    likeMessage, unlikeMessage, profile, creatingChat, sendingMessage }) => {

    const [messageText, setMessageText] = useState('')
    const [showDetails, setShowDetails] = useState(false)
    const [imageBlob, setImageBlob] = useState(null)
    const [chatMessages, setChatMessages] = useState(null)
    const [fetchingMessages, setFetchingMessages] = useState(true)
    const [sendingImage, setSendingImage] = useState(false)
    const classes = useStyles()



    const handleTextInputChange = e => {
        setMessageText(e.target.value)
    }


    const handleShowDetails = () => {
        setShowDetails(true)
    }


    const handleHideDetails = () => {
        setShowDetails(false)
    }



    const interlocutors = [selectedAccount && selectedAccount.userId, profile && profile.userId]
    const chatId = interlocutors.sort().join(':')



    const handleFileInputChange = e => {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0]
            setImageBlob(URL.createObjectURL(e.target.files[0]))

            setSendingImage(true)
            const fileName = imageFile.name.concat(uuidv4())
            const uploadTask = storage.ref(`chat_images/${fileName}`)

            uploadTask.put(imageFile)
                .then(() => {
                    return storage.ref('chat_images').child(fileName).getDownloadURL()
                })
                .then(url => {
                    const data = {
                        message: url,
                        messageType: 'image',
                        sender: profile.userId,
                        interlocutors: interlocutors,
                        chatId: chatId,
                        messageId: uuidv4(),
                        coUser : selectedAccount.userId
                    }
                    //send message as image.........
                    sendMessage(data)
                    setSendingImage(false)
                })
                .catch(error => {
                    console.log(error)
                    setSendingImage(false)
                })
            
        }
    }


    const handleFetchChatMessages = useCallback(() => {
   
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

    }, [ handleFetchChatMessages])


    const handleSendHeartToChat = () => {
        const data = {
            message: '&hearts',
            messageType: 'heart',
            sender: profile.userId,
            interlocutors: interlocutors,
            chatId: chatId,
            messageId: uuidv4(),
            coUser : selectedAccount.userId
        }

        sendMessage(data)
    }


    const handleSendTextToChat = () => {
        const data = {
            message: messageText,
            messageType: 'text',
            sender: profile.userId,
            interlocutors: interlocutors,
            chatId: chatId,
            messageId: uuidv4(),
            coUser : selectedAccount.userId
        }
        sendMessage(data)
        setMessageText('')
    }



    const handleDeleteMessage = (message) => {
        const data = {
            chatId: chatId,
            messageId: message.messageId,
            interlocutors: interlocutors,
        }

        deleteMessage(data)
    }


    const handleLikeMessage = (message) => {
        const data = {
            chatId: chatId,
            messageId: message.messageId,
            interlocutors: interlocutors,
            userId: profile.userId
        }
        likeMessage(data)
      
    }



    const handleUnlikeMessage = (message) => {
        const data = {
            chatId: chatId,
            messageId: message.messageId,
            interlocutors: interlocutors,
            userId: profile.userId
        }
        unlikeMessage(data)

    }





    if (creatingChat || fetchingMessages) return <LogoLoader />
    if (showDetails) return (
        <ChatDetails 
            handleHideDetails={handleHideDetails} 
            user={selectedAccount}
            profile={profile}
            chatId={chatId}
        />
    )

    return (
        <div className='chat-board-container'>
            <div className='chat-board-nav-container'>

                <section className='left-side-nav-section'>
                    <div className='mobile-icon'>
                        <ArrowBackIosOutlined
                            onClick={closeChatBoard}
                        />
                    </div>

                    <Link to={`/profile/${selectedAccount.userName}/${selectedAccount.userId}`}>
                        <Avatar
                            src={selectedAccount.profilePhoto}
                            className={classes.tiny}
                        />
                    </Link>

                    <Link to={`/profile/${selectedAccount.userName}/${selectedAccount.userId}`}>
                        <p>{selectedAccount.userName}</p>

                    </Link>
                </section>

                <ChatActionsIcon
                    width='24px'
                    height='24px'
                    action={handleShowDetails}
                />

            </div>




            <React.Fragment>
                <ChatMessagesBody
                    chatMessages={chatMessages}
                    chatId={chatId}
                    sendingImage={sendingImage}
                    imageBlob={imageBlob}
                    sendingMessage={sendingMessage}
                    profile={profile && profile}
                    classes={classes}
                    user={selectedAccount}
                    users={users}
                    handleLikeMessage={handleLikeMessage}
                    handleUnlikeMessage={handleUnlikeMessage}
                    handleDeleteMessage={handleDeleteMessage}
                    closeChatBoard={closeChatBoard}
                />
            </React.Fragment>






            <div className='chat-board-input-container'>
                <form>
                    <TextareaAutosize
                        placeholder='Message...'
                        autoCorrect='off'
                        autoComplete='off'
                        maxRows={5}
                        value={messageText}
                        onChange={handleTextInputChange}

                    //ref={inputRef}
                    />

                    {messageText !== '' ?
                        <Button
                            size='small'
                            onClick={handleSendTextToChat}
                        >
                            Send
                    </Button>

                        :

                        <div className='icons-container'>

                            <label>
                                <input
                                    type="file"
                                    onChange={handleFileInputChange}
                                    accept="image/png, .jpeg, .jpg, image/gif"
                                    style={{ display: 'none' }}
                                />
                                <PhotoIcon
                                    width='24px'
                                    height='24px'
                                />
                            </label>

                            <UnLikedIcon
                                width='24px'
                                height='24px'
                                action={handleSendHeartToChat}
                            />
                        </div>}

                </form>
            </div>
        </div>
    )
}



const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
        users: state.firestore.ordered.users,
        selectedAccount: state.messenger.selectedAccount,
        messageError: state.messenger.messageError,
        sendingMessage: state.messenger.sendingMessage,
        deletingMessage: state.messenger.deletingMessage,
        likingMessage: state.messenger.likingMessage,
        creatingChat: state.messenger.creatingChat,
        unlikingMessage: state.messenger.unlikeMessage,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        sendMessage: data => dispatch(sendMessage(data)),
        deleteMessage: data => dispatch(deleteMessage(data)),
        likeMessage: data => dispatch(likeMessage(data)),
        unlikeMessage: data => dispatch(unlikeMessage(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['users'])
)(ChatBoard)
