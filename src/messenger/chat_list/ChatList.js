import React, { useState, useCallback, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import EachChat from './each_chat/EachChat'




import { openChatBoard } from '../../store/actions/MessengerAction'


const ChatList = ({ userChats, users, profile, openChatBoard }) =>{
    //console.log(userChats)
    const [usersDetail, setUsersDetail] = useState(null)

    const handleUserChatsUserDetails = useCallback(() =>{
        const details = []
        const promises = users && users.map(user =>{
            return userChats.map(chat =>{
                return user.userId !== profile.userId && user.userId === chat.coUser ?
                details.push(user) : null
            })
            
        })

        Promise.all([promises])
        .then(() =>{
            setUsersDetail(details)
            
        })
    }, [ userChats, profile, users ])


    useEffect(() =>{
        handleUserChatsUserDetails()

    }, [ handleUserChatsUserDetails ])

    //console.log(usersDetail)


    const handleOpenChatBoard = (user) =>{
        openChatBoard(user)
    }

    return(
        <div className='chat-lists-container'>
            {
                usersDetail && usersDetail.map(user =>{
                    return(
                        <EachChat
                            user={user}
                            key={user.userId}
                            handleOpenChatBoard={handleOpenChatBoard}
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

