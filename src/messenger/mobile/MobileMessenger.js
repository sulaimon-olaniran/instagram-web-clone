import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { ArrowBackIosSharp } from '@material-ui/icons'





import { CreateMessageIcon } from '../../components/MyIcons'
import CreateChatModal from './create_chat/CreateChatModal'




const MobileMessenger = ({ history }) =>{
    const [createChat, setCreateChat] = useState(false)


    const handleOpenCreateChatModal = () =>{
        setCreateChat(true)
    }

    const handleCloseCreateChatModal = () =>{
        setCreateChat(false)
    }


    return(
        <div className='mobile-messenger-container'>
            <CreateChatModal
                openModal={createChat}
                handleCloseModal={handleCloseCreateChatModal}
            />

            <div className='mobile-messenger-nav-container'>
                <ArrowBackIosSharp onClick={() => history.goBack()} />
                <p>Direct</p>
                <CreateMessageIcon
                    height='24px'
                    width='24px'
                    action={handleOpenCreateChatModal}
                />
            </div>


            <div className='no-messages-container'>
                    <h1>No Messages</h1>
                    <Button
                        variant='contained'
                        onClick={handleOpenCreateChatModal}
                    >
                        Start a Message
                    </Button>
            </div>

        </div>
    )
}



export default withRouter(MobileMessenger)