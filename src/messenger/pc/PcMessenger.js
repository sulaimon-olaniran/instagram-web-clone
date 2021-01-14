import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'




import ChatList from '../chat_list/ChatList'
import { CreateMessageIcon, MyDirectIcon } from '../../components/MyIcons'
import CreateChatDialog from './create_chat/CreateChatDialog'
import ChatBoard from '../chat_board/ChatBoard'




const PcMessenger = ({ userChats, profile, selectedAccount }) =>{
    const [createChatDialog, setCreateChatDialog] = useState(false)

    const handleOpenCreateChatDialog = () =>{
        setCreateChatDialog(true)
    }


    const handleCloseCreateChatDialog = () =>{
        setCreateChatDialog(false)
    }

    return(
        <div className='pc-messenger-container'>
            <CreateChatDialog
                openDialog={createChatDialog}
                handleCloseDialog={handleCloseCreateChatDialog}
                from='chat'
            />

            <div className='pc-chatlist-container'>

                <div className='pc-chatlist-nav-container'>
                    <p>{profile && profile.userName}</p>
                    <CreateMessageIcon
                        height='24px'
                        width='24px'
                        action={handleOpenCreateChatDialog}
                    />
                </div>

                <ChatList
                    userChats={userChats}
                />

            </div>

            <div className='pc-chatboard-container'>

                { selectedAccount === null ?
                    <div className='pc-no-chat-selected-container'>
                        <div className='pc-messenger-direct-icon-container'>
                            <MyDirectIcon
                                height='48px'
                                width='48px'
                            />
                        </div>

                        <h2>Your Messages</h2>
                        <p>Send private photos and messages to a friend</p>

                        <Button
                            variant='contained'
                            onClick={handleOpenCreateChatDialog}
                        >
                            Send Message
                        </Button>

                    </div>

                        :

                    <ChatBoard />
                }

            </div>

        </div>
    )
}


const mapStateToProps = state =>{
    return{
        selectedAccount: state.messenger.selectedAccount,
    }
}


export default connect(mapStateToProps)(PcMessenger)