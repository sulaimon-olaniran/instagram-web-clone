import React from 'react'
import Avatar from '@material-ui/core/Avatar'

import { UnLikedIcon } from '../../../../components/MyIcons'

const EachComment = ({ comment }) => {
    return (
        <div className='every-comment-container'>
            <Avatar />

            <div className='comment-details'>
                <div className='comment-text'>
                    <p><span>{comment.userName}</span> {comment.comment}</p>
                    <UnLikedIcon height='12px' width='12px' />
                </div>

                <div className='comment-time-likes'>
                    <small>{comment.time}</small>
                   {comment.likes.length > 0 && <small>{comment.likes.length} likes</small>}
                    <small>Reply</small>
                </div>
            </div>

        </div>
    )
}


export default EachComment