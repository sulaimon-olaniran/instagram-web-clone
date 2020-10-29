import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Avatar from '@material-ui/core/Avatar'



import { LikedIcon, UnLikedIcon, CommentIcon, ShareIcon, SavedIcon } from '../../../../../components/MyIcons'
import MoreOptions from './more_options/MoreOptions'
import SharePost from './share/SharePost'
import MobileComments from '../../../../comments/mobile/MobileComments'


const EachPost = ({ post }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [openShareDrawer, setOpenShareDrawer] = useState(false)
    const [openComment, setOpenComment] = useState(false)

    const handleOpenComment = () =>{
        setOpenComment(true)
    }

    const handleCloseComment = () =>{
        setOpenComment(false)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleOpenShareDrawer = () => {
        setOpenShareDrawer(true)
    }

    const handleCloseShareDrawer = () =>{
        setOpenShareDrawer(false)
    }

    return (
        <div className='each-post-container'>
            <MobileComments 
              openCommentModal={openComment}
              handleCloseModal={handleCloseComment}
              post={post}
            />
            <MoreOptions
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
            <SharePost 
                open={openShareDrawer}
                close={handleCloseShareDrawer}
            />
            <div className='top-details-container'>

                <div className='user-container'>
                    <Avatar
                        src={post.imageUrl}
                    />
                    <Link exact to={`/profile/${post.name}/`}>
                    <p>{post.name}</p>
                    </Link>
                </div>

                <MoreHorizIcon onClick={handleOpenDialog} />

            </div>



            <div className='post-media-container'>
                <img src={post.image} alt='POST_FILE' />
            </div>


            <div className='bottom-actions-container'>
                <div className='left-sided'>
                    <LikedIcon
                        width='24px'
                        height='24px'
                    />

                    <CommentIcon
                        width='24px'
                        height='24px'
                    />

                    <ShareIcon
                        width='24px'
                        height='24px'
                        action={handleOpenShareDrawer}
                    />

                </div>

                <SavedIcon
                    width='24px'
                    height='24px'
                />
            </div>



            <div className='post-information-container'>
                <div className='likes-container' >
                    <p>{post.likes} likes</p>
                </div>

                <div className='caption-container'>
                    <p><span>{post.name}</span> {post.caption}</p>
                </div>

                <div className='comments-container'>
                    
                    <div className='comments-title'>
                            <p onClick={handleOpenComment}>View all {post.comments.length} comments</p>
                    </div>

                    {
                        post.comments.map((comment, i) => {
                            return (
                                <div key={i} className='each-comment-container'>
                                    <div className='comment'>
                                        <p><span>{comment.name} </span> {comment.comment}</p>
                                    </div>
                                    <UnLikedIcon
                                        height='12px'
                                        width='12px'
                                    />
                                </div>
                            )
                        })
                    }

                </div>

                <div className='time-container'>
                    <p>{post.time}</p>
                </div>

            </div>

        </div>
    )
}


export default EachPost