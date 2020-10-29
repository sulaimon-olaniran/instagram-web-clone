import React from 'react'
import Avatar from '@material-ui/core/Avatar'

import { UnLikedIcon } from '../../../../components/MyIcons'

const EachComment = ({ comment }) => {
    return (
        <div className='every-comment-container'>
            <Avatar />

            <div className='comment-details'>
                <div className='comment-text'>
                    <p><span>{comment.name}</span> {comment.comment}</p>
                    <UnLikedIcon height='12px' width='12px' />
                </div>

                <div className='comment-time-likes'>
                    <small>{comment.time}</small>
                    <small>{comment.likes} likes</small>
                    <small>Reply</small>
                </div>
            </div>

        </div>
    )
}


export default EachComment