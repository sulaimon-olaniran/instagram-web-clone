import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { ArrowBackIosOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '@material-ui/core/Button'



import { ChatActionsIcon } from '../../components/MyIcons'
import { UnLikedIcon, PhotoIcon } from '../../components/MyIcons'
import ChatDetails from './details/ChatDetails'




const useStyles = makeStyles((theme) => ({
    xLarge: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },

    tiny: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}))


const ChatBoard = ({ user, closeChatBoard }) => {
    const [messageText, setMessageText] = useState('')
    const [showDetails, setShowDetails] = useState(false)
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

    if (showDetails) return <ChatDetails handleHideDetails={handleHideDetails} user={user} />

    return (
        <div className='chat-board-container'>
            <div className='chat-board-nav-container'>

                <section className='left-side-nav-section'>
                    <ArrowBackIosOutlined
                        onClick={closeChatBoard}
                    />

                    <Link to={`/profile/${user.userName}/${user.userId}`}>
                        <Avatar
                            src={user.profilePhoto}
                            className={classes.tiny}
                        />
                    </Link>

                    <Link to={`/profile/${user.userName}/${user.userId}`}>
                        <p>{user.userName}</p>

                    </Link>
                </section>

                <ChatActionsIcon
                    width='24px'
                    height='24px'
                    action={handleShowDetails}
                />

            </div>




            <div className='chat-board-chat-contents-container'>

            </div>




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
                        >
                            Send
                    </Button>

                        :

                        <div className='icons-container'>

                            <PhotoIcon
                                width='24px'
                                height='24px'
                            />

                            <UnLikedIcon
                                width='24px'
                                height='24px'
                            />
                        </div>}

                </form>
            </div>
        </div>
    )
}



export default ChatBoard