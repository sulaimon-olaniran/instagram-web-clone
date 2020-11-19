import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import useDoubleClick from 'use-double-click'
import { connect } from 'react-redux'


import { LikedIcon, UnLikedIcon, CommentIcon, ShareIcon, SavedIcon, UnSavedIcon } from '../../MyIcons'
import MoreOptions from './more_options/MoreOptions'
import SharePost from './share/SharePost'
import MobileComments from '../../../pages/comments/mobile/MobileComments'
import { db } from '../../../firebase/Firebase'
import { followUser } from '../../../store/actions/ProfileActions'
import {  likePost, unLikePost } from '../../../store/actions/PostsAction'


const EachPostFeed = ({ post, profile, followUser, likePost, unLikePost }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [openShareDrawer, setOpenShareDrawer] = useState(false)
    const [openComment, setOpenComment] = useState(false)
    const [posterProfile, setPosterProfile] = useState({})
    //const [isFollowing, setIsFollowing] = useState(null)
    const buttonRef = useRef(null)

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

    const getPosterProfile = useCallback( () =>{
        db.collection('users').doc(post && post.userId)
        .onSnapshot(snapshot =>{
            setPosterProfile(snapshot.data())
        })
    }, [post])
    

    useEffect(() =>{
        getPosterProfile()
    }, [ getPosterProfile ])

    useDoubleClick({
        onSingleClick: e => {
          console.log(e, 'single click');
        },
        onDoubleClick: e => {
            profile && profile.likedPosts.includes(post && post.postId) ?
            handleUnLikePost() : handleLikePost()
        },
        ref: buttonRef,
        latency: 250
      });


    const handleFollowUser = () =>{
        const data = {
            accountId : posterProfile.userId,
            userId : profile.userId
        }
        followUser(data)
    }

    const handleLikePost = () =>{
        const data = {
            accountId : posterProfile.userId,
            userId : profile.userId,
            postId : post.postId,
            posterId : post.userId,
        }

        likePost(data)
    }

    const handleUnLikePost = () =>{
        const data ={
            accountId : posterProfile.userId,
            userId : profile.userId,
            postId : post.postId,
            posterId : post.userId,
        }

        unLikePost(data)
    }

    return (
        <div className='each-post-feed-container'>
            <MobileComments 
              openCommentModal={openComment}
              handleCloseModal={handleCloseComment}
              post={post && post}
              posterProfile={posterProfile && posterProfile}
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
                        src={posterProfile && posterProfile.profilePhoto}
                    />

                    <Link 
                        to={`/${posterProfile && posterProfile.userName}/${posterProfile && posterProfile.userId}`}
                    >
                        <p>{posterProfile && posterProfile.userName}</p>
                    </Link>

                    { profile && !profile.following.includes(posterProfile && posterProfile.userId) &&
                        <Button 
                            variant='contained'
                            color='primary'
                            size='small'
                            onClick={handleFollowUser}
                        >
                            Follow
                        </Button>
                    }

                </div>

                <MoreHorizIcon onClick={handleOpenDialog} />

            </div>



            <div className='post-media-container'>
                <img 
                    ref={buttonRef}
                    src={post && post.fileUrl} alt='POST_FILE' 
                />
            </div>


            <div className='bottom-actions-container'>
                <div className='left-sided'>
                {profile && profile.likedPosts.includes(post && post.postId) ?
                    <LikedIcon
                        width='24px'
                        height='24px'
                        action={handleUnLikePost}
                    />
                    :

                    <UnLikedIcon
                        width='24px'
                        height='24px'
                        action={handleLikePost}
                    />
                
                }

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

            {profile && profile.savedPosts.includes(post && post.postId) ?
                <SavedIcon
                    width='24px'
                    height='24px'
                />
                :
                <UnSavedIcon
                    width='24px'
                    height='24px'
                />
            }
            </div>



            <div className='post-information-container'>
                <div className='likes-container' >
                    <p>{post && post.likes.length} likes</p>
                </div>

                <div className='caption-container'>
                    <p><span>{posterProfile && posterProfile.userName}</span> {post && post.caption}</p>
                </div>

                <div className='comments-container'>
                    
                    { post && post.comments.length > 0 &&
                        <div className='comments-title'>
                            <p onClick={handleOpenComment}>View all {post && post.comments.length} comments</p>
                        </div>
                    }

                    {
                        post && post.comments.length > 0 && post.comments.slice(0, 3).map((comment, i) => {
                            return (
                                <div key={i} className='each-comment-container'>
                                    <div className='comment'>
                                        <p><span>{comment.userName} </span> {comment.comment}</p>
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



const mapStateToProps = (state) =>{
    return{
        profile : state.firebase.profile
    }
}


const mapDisptachToProps = (dispatch) =>{
    return{
        followUser : data => dispatch(followUser(data)),
        likePost : data => dispatch(likePost(data)),
        unLikePost : data => dispatch(unLikePost(data))
    }
}


export default connect( mapStateToProps, mapDisptachToProps)(EachPostFeed)