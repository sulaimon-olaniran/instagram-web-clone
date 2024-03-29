import React, { useState, useCallback, useEffect } from 'react'
import { ArrowBackIosOutlined, CloseSharp } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { v4 as uuidv4 } from 'uuid'



import { openChatBoard, selectUserToChatWith, sendMessage, createChat } from '../../store/actions/MessengerAction'
import { openSharedPostSnackbar } from '../../store/actions/PostsAction'
import SuggestedChat from './suggested_chat/SuggestedChat'




const NewMessageTheme = ({ close, users, openChatBoard, from, selectChatUser, profile, postId, sendMessage, openSnackBar, createChat }) => {
    const [matchedUsers, setMatchedUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    


    const interlocutors = [selectedUser && selectedUser.userId, profile && profile.userId]
    const chatId = interlocutors.sort().join(':')

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value)
    }

    const handleMatchSearchToUsers = useCallback(() => {
        const searchUsers = []
        users && users.forEach(user => {
            if (searchInput !== '' && user.userName.toLowerCase().includes(searchInput.toLowerCase())) {
                searchUsers.push(user)
            }
        })

        setMatchedUsers(searchUsers)

    }, [users, searchInput])



    useEffect(() => {
        handleMatchSearchToUsers()

    }, [handleMatchSearchToUsers])


    const handleSelectUserToChatWith = (user) => {
        setSelectedUser(user)
        setSearchInput('')
    }

    const handleCancelSelectedUser = () => {
        setSelectedUser(null)
    }



    const handleGoToChatBoard = () => {
        const screenWidth = window.matchMedia('(min-width: 600px)')
        const data = {
            createdBy: profile.userId,
            interlocutors: interlocutors,
            chatId: chatId,
            coUser : selectedUser.userId
        }

        if (screenWidth.matches) {
            createChat(data)
            selectChatUser(selectedUser)
            close()
        }
        else {
            createChat(data)
            openChatBoard(selectedUser)
            close()
        }
    }


    const handleSharePostToChat = () =>{
        const data = {
            message: postId,
            messageType: 'post',
            sender: profile.userId,
            interlocutors: interlocutors,
            chatId: chatId,
            messageId: uuidv4(),
            coUser : selectedUser.userId
        }

        let message = async () => {return sendMessage(data)}

        message().then(() =>{
            openSnackBar()
            close()
        })
    }



    return (
        <div className='new-message-container'>

            <div className='fixed-top-contents-container'>

                <div className='new-message-nav-container'>
                    <span className='mobile-icon'>
                        <ArrowBackIosOutlined
                            onClick={close}
                        />
                    </span>

                    <span className='pc-icon'>
                        <CloseSharp
                            onClick={close}
                        />
                    </span>


                    {from !== 'post' ? <p>New Message</p> : <p>Share</p>}

                    {from !== 'post' ?
                    <Button
                        disabled={selectedUser !== null ? false : true}
                        onClick={handleGoToChatBoard}
                    >
                        Next
                    </Button>

                        :

                    <Button
                        disabled={selectedUser !== null ? false : true}
                        onClick={handleSharePostToChat}
                    >
                        Send
                    </Button>}


                </div>

                <div className='search-for-user-chat'>
                    <p>To:</p>
                    {selectedUser !== null ?
                        <Button
                            variant='contained'
                            onClick={handleCancelSelectedUser}
                        >
                            {selectedUser.userName}
                            <span className='x-container'>
                                X
                        </span>
                        </Button>
                        :
                        <div className='input-container'>
                            <input
                                placeholder='Search...'
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    }
                </div>

            </div>

            <div className='suggested-chat-accounts-container'>
                <p>Suggested</p>
                {matchedUsers.length === 0 ?
                    <small>No Account found</small>
                    :
                    <SuggestedChat
                        users={matchedUsers}
                        handleSelectUserToChatWith={handleSelectUserToChatWith}
                    />}
            </div>


        </div>
    )
}


const mapStateToProps = state => {
    //console.log(state)
    return {
        users: state.firestore.ordered.users,
        profile: state.firebase.profile,

    }
}



const mapDispatchToProps = dispatch => () => {
    return {
        openChatBoard: user => dispatch(openChatBoard(user)),
        selectChatUser: user => dispatch(selectUserToChatWith(user)),
        sendMessage: data => dispatch(sendMessage(data)),
        createChat: data => dispatch(createChat(data)),
        openSnackBar : () => dispatch(openSharedPostSnackbar())
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['users'])
)(NewMessageTheme)

