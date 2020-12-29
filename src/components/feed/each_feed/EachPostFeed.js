import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
//import useDoubleClick from 'use-double-click'
import { connect } from 'react-redux'
import moment from 'moment'
import Snackbar from '@material-ui/core/Snackbar'


import { LikedIcon, UnLikedIcon, CommentIcon, ShareIcon, SavedIcon, UnSavedIcon } from '../../MyIcons'
import MoreOptions from './more_options/MoreOptions'
import SharePost from './share/SharePost'
import MobileComments from '../../../pages/comments/mobile/MobileComments'
import { db } from '../../../firebase/Firebase'
import { followUser } from '../../../store/actions/ProfileActions'
import {  likePost, unLikePost, savePost, unSavePost } from '../../../store/actions/PostsAction'
import { handleViewStory, handleOpenProfileCard } from '../../../store/actions/AppActions'
import FeedSkeleton from '../../skeletons/FeedSkeleton'
import EachComment from '../../../pages/comments/mobile/each_comment/EachComment'
import StoryAvatar from '../../avatar/StoryAvatar'


const EachPostFeed = ({ post, profile, followUser, likePost, unLikePost, savePost, unSavePost, handleViewStory, handleOpenProfileCard }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [openShareDrawer, setOpenShareDrawer] = useState(false)
    const [openComment, setOpenComment] = useState(false)
    const [posterProfile, setPosterProfile] = useState({})
    const [postComments, setPostComments] = useState([])
    const [fetching, setFetching] = useState(true)
    const [linkSnackBar, setLinkSnackBar] = useState(false)
    //const [isFollowing, setIsFollowing] = useState(null)
    // const buttonRef = useRef(null)

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
            setFetching(false)
        })
    }, [post])

    const getPostComments = useCallback(() =>{
        db.collection('posts').doc(post && post.postId)
        .collection('comments').onSnapshot(snapshot =>{
            const comments = []
            snapshot.forEach( doc =>{
                comments.push(doc.data())
            })
            setPostComments(comments)
            //console.log(comments)
        })
    }, [post])
    

    useEffect(() =>{
        getPosterProfile()
        getPostComments()

    }, [ getPosterProfile, getPostComments ])

    
    const handleCloseSnackBar= () =>{
        setLinkSnackBar(false)
    }

//    useDoubleClick({
//         onSingleClick: e => {
//           console.log(e, 'single click');
//         },
//         onDoubleClick: e => {
//             profile && profile.likedPosts.includes(post && post.postId) ?
//             handleUnLikePost() : handleLikePost()
//         },
//         //ref: buttonRef,
//         latency: 250
//     })


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

    const hanldeSavePost = () =>{
        const data = {
            userId : profile.userId,
            postId : post.postId
        }
        savePost(data)
    }

    const handleUnSavePost = () =>{
        const data = {
            userId : profile.userId,
            postId : post.postId
        }
        unSavePost(data)
    }

    const handleCopyPostLink = () =>{
        const link = `http://0s-instagram-clone/p/${post.postId}`

        navigator.clipboard.writeText(link)
        setLinkSnackBar(true)
        handleCloseShareDrawer()
    }

    const handleOpenProfilePopper = e =>{
        const data = {
            event : e.currentTarget,
            profile : posterProfile
        }
        handleOpenProfileCard(data)
    }

    //const fetcher = true

    if(fetching) return <FeedSkeleton  />
    return (
        <div className='each-post-feed-container'>

            <MobileComments 
              openCommentModal={openComment}
              handleCloseModal={handleCloseComment}
              post={post && post}
              posterProfile={posterProfile && posterProfile}
              postComments={postComments}
            />


            <MoreOptions
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                posterId = {post && post.userId}
                postId={post && post.postId}
                openShare={handleOpenShareDrawer}
                handleCopyPostLink={handleCopyPostLink}
            />


            <SharePost 
                open={openShareDrawer}
                close={handleCloseShareDrawer}
                link={`https://os-instagram-clone.netlify.app/p/${post.postId}`}
                handleCopyPostLink={handleCopyPostLink}
            />


            <div className='top-details-container'>

                <div className='user-container'>
                    {posterProfile && posterProfile.stories && !posterProfile.stories.length > 0 ?
                    <Avatar
                        onMouseEnter={handleOpenProfilePopper}
                        //onMouseLeave={handleCloseProfileCard}
                        src={posterProfile && posterProfile.profilePhoto}
                    />
                        :
                    <StoryAvatar 
                        onMouseEnter={handleOpenProfilePopper}
                        //onMouseLeave={handleCloseProfileCard}
                        src={posterProfile && posterProfile.profilePhoto}
                        height='48px'
                        width='48px'
                        action={() => handleViewStory(posterProfile)}
                    />}

                    <Link 
                        onMouseEnter={handleOpenProfilePopper}
                        //onMouseLeave={handleCloseProfileCard}
                        to={`/profile/${posterProfile && posterProfile.userName}/${posterProfile && posterProfile.userId}`}
                    >
                        <p>
                            {posterProfile && posterProfile.userName}
                        </p>
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
                    //ref={buttonRef}
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
                    <span className='mobile-comment-feeds-icon-container'>
                        <CommentIcon
                            width='24px'
                            height='24px'
                            action={handleOpenComment}
                        />
                    </span>

                    <Link 
                        to={`/p/${post.postId}`}
                        className='pc-comment-feeds-icon-container'
                    >
                        <CommentIcon
                            width='24px'
                            height='24px'
                            action={handleOpenComment}
                        />
                    </Link>

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
                    action={handleUnSavePost}
                />
                :
                <UnSavedIcon
                    width='24px'
                    height='24px'
                    action={hanldeSavePost}
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
                    
                    { postComments && postComments.length > 3 &&
                        <div className='comments-title'>
                            <p onClick={handleOpenComment}>View all {postComments && postComments.length} comments</p>
                        </div>
                    }

                    {
                        postComments && postComments.length > 0 && postComments.slice(0, 3).map((comment, i) => {
                            return (
                                <div key={i} className='each-comment-container'>
                                    <EachComment 
                                        comment={comment}
                                        post={post}
                                        profile={profile}
                                        from='top_three'
                                    />
                                </div>
                            )
                        })
                    }

                </div>

                <div className='time-container'>
                    <p>{moment(post && post.time).fromNow()}</p>
                </div>

            </div>

            <div className='each-post-bottom-commnent-input'>
                    <input
                        placeholder='Add a comment'
                    />
                    <Button>
                        Post
                    </Button>
            </div>

                <Snackbar
                    open={linkSnackBar}
                    message="Link Copied To Clipboard"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    onClose={handleCloseSnackBar}
                    autoHideDuration={3000}
                />

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
        unLikePost : data => dispatch(unLikePost(data)),
        savePost : data => dispatch(savePost(data)),
        unSavePost : data => dispatch(unSavePost(data)),
        handleViewStory : data => dispatch(handleViewStory(data)),
        handleOpenProfileCard : data => dispatch(handleOpenProfileCard(data)),
        //handleCloseProfileCard : data => dispatch(handleCloseProfileCard(data)),
    }
}


export default connect(mapStateToProps, mapDisptachToProps)(EachPostFeed)