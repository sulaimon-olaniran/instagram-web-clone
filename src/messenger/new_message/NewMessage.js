import React, { useState, useCallback, useEffect } from 'react'
import { ArrowBackIosOutlined } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SuggestedChat from './suggested_chat/SuggestedChat'



import { openChatBoard } from '../../store/actions/MessengerAction'




const NewMessageTheme = ({ close, users, openChatBoard }) => {
    const [matchedUsers, setMatchedUsers] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)


    const handleSearchInputChange = (event) =>{
        setSearchInput(event.target.value)
    }

    const handleMatchSearchToUsers = useCallback(() =>{
        const searchUsers = []
        users && users.forEach(user =>{
            if(searchInput !== '' && user.userName.toLowerCase().includes(searchInput.toLowerCase())){
                searchUsers.push(user)
            }
        })

        setMatchedUsers(searchUsers)
        
    }, [ users, searchInput])



    useEffect(() =>{
        handleMatchSearchToUsers()

    }, [ handleMatchSearchToUsers ])


    const handleSelectUserToChatWith = (user) =>{
        setSelectedUser(user)
        setSearchInput('')
    }

    const handleCancelSelectedUser = () =>{
        setSelectedUser(null)
    }


    const handleOpenChatBoard = () =>{
        openChatBoard(selectedUser)
        close()
    }

    return (
        <div className='new-message-container'>

            <div className='fixed-top-contents-container'>

                <div className='new-message-nav-container'>
                    <ArrowBackIosOutlined
                        onClick={close}
                    />

                    <p>New Message</p>

                    <Button
                        disabled={selectedUser !== null ? false : true}
                        onClick={handleOpenChatBoard}
                    >
                        Next
                    </Button>
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
                { matchedUsers.length === 0 ?
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
        
     }
 }



const mapDispatchToProps = dispatch => () =>{
    return{
        openChatBoard : user => dispatch(openChatBoard(user))
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['users'])
)(NewMessageTheme)

