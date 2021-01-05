import React, { useState, useCallback, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'



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



const EachChat = ({ user, handleOpenChatBoard }) =>{

    const classes = useStyles()

    const [messages, setMessages] = useState(null)

    return(
        <div 
            className='each-chat-container'
            onClick={() =>{handleOpenChatBoard(user)}}
            to='/direct/t/chat'
        >
            <Avatar src={user.profilePhoto} className={classes.Large} />

            <div className='each-chat-details-container'>
                <p>{user.userName}</p>
                <small>You sent a text · 1h</small>
            </div>

        </div>
    )
}


export default EachChat