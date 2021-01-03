import React from 'react'
import { Avatar } from '@material-ui/core'





const SuggestedChat = ({ users, handleSelectUserToChatWith }) =>{
    return(
        <div className='suggested-chat-container'>
            {
                users.length > 0 && users.map(user =>{
                    return(
                        <div 
                            key={user.userId}
                            className='each-suggested-chat-user-container'
                        >
                            <div className='user-detail-section'
                                onClick={() => handleSelectUserToChatWith(user)}
                            >
                                <Avatar src={user.profilePhoto} />
                                <div className='user-detail-names'>
                                    <p>{user.userName}</p>
                                    <small>{user.fullName}</small>
                                </div>
                            </div>

                            <span 
                                className='circle' 
                                onClick={() => handleSelectUserToChatWith(user)}
                            />
                        </div>
                    )
                })
            }

        </div>
    )
}


export default SuggestedChat