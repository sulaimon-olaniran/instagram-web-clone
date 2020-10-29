import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'


import { LikedIcon, UnLikedIcon, CommentIcon, ShareIcon, SavedIcon } from '../../MyIcons'
import MoreOptions from './more_options/MoreOptions'
import SharePost from './share/SharePost'
import MobileComments from '../../../pages/comments/mobile/MobileComments';


const EachPostFeed = ({ post }) => {
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
        <div className='each-post-feed-container'>
            <MobileComments 
              openCommentModal={openComment}
              handleCloseModal={handleCloseComment}
              post={post && post}
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
                        src={post && post.imageUrl}
                    />

                    <Link to={`/profile/${post && post.name}/`}>
                        <p>{post && post.name}</p>
                    </Link>

                    {
                        post && post.following &&
                    <Button 
                       variant='contained'
                       color='primary'
                       size='small'
                    >
                        Follow
                    </Button>}

                </div>

                <MoreHorizIcon onClick={handleOpenDialog} />

            </div>



            <div className='post-media-container'>
                <img src={post && post.image} alt='POST_FILE' />
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
                    <p>{post && post.likes} likes</p>
                </div>

                <div className='caption-container'>
                    <p><span>{post && post.name}</span> {post && post.caption}</p>
                </div>

                <div className='comments-container'>
                    
                    <div className='comments-title'>
                            <p onClick={handleOpenComment}>View all {post && post.comments.length} comments</p>
                    </div>

                    {
                        post && post.comments.map((comment, i) => {
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
                    <p>{post && post.time}</p>
                </div>

            </div>

        </div>
    )
}


export default EachPostFeed