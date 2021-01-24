import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import EachChat from './each_chat/EachChat'




import { openChatBoard, selectUserToChatWith } from '../../store/actions/MessengerAction'


const ChatList = ({ userChats, users, profile, openChatBoard, selectChatUser }) =>{
    

    const handleOpenChatBoard = (user) =>{
        openChatBoard(user)
    }


    return(
        <div className='chat-lists-container'>
            {
                userChats && userChats.map(chat =>{
                    return(
                        <EachChat
                            chat={chat}
                            key={chat.chatId}
                            handleOpenChatBoard={handleOpenChatBoard}
                            selectChatUser={selectChatUser}
                            profile={profile}
                            users={users}
                        />
                    )
                })
            }
        </div>
    )
}


const mapDispatchToProps = dispatch =>{
    return{
        openChatBoard : user => dispatch(openChatBoard(user)),
        selectChatUser : user => dispatch(selectUserToChatWith(user))
    }
}


const mapStateToProps = state =>{
    return{
        users: state.firestore.ordered.users,
        profile: state.firebase.profile,
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['users'])
)(ChatList)

