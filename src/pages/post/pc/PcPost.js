import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import TextareaAutosize from 'react-textarea-autosize'




import { LikedIcon, UnLikedIcon, CommentIcon, ShareIcon, SavedIcon, UnSavedIcon } from '../../../components/MyIcons'
import { db } from '../../../firebase/Firebase'
import EachComment from '../../comments/mobile/each_comment/EachComment'
import EachMorePost from './EachMorePost'
import { commentOnPost, deletePost, likePost, unLikePost, savePost, unSavePost } from '../../../store/actions/PostsAction'
import { followUser, unFollowUser } from '../../../store/actions/ProfileActions'
import { handleViewStory, handleOpenProfileCard, handleCloseProfileCard } from '../../../store/actions/AppActions'



const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    medium: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));



const PcPost = ({ post, posterProfile, profile, posts, followUser, likePost, commentOnPost, 
    unLikePost, savePost, unSavePost, unFollowUser, handleViewStory, handleOpenProfileCard, handleCloseProfileCard }) => {

    const [moreUserPosts, setMoreUserPosts] = useState([])
    const [postComments, setPostComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const inputRef = useRef(null)
    const classes = useStyles()


    const getPostComments = useCallback(() =>{
        db.collection('posts').doc(post && post.postId)
        .collection('comments').orderBy('time', 'desc')
        .onSnapshot(snapshot =>{
            const comments = []
            snapshot.forEach(doc =>{
                comments.push(doc.data())
            })
            setPostComments(comments)
        })

    }, [post])


    const getMoreUserPosts = useCallback(() =>{
        const allPosts = []

        posts && posts.forEach(currentPost => {
            if (post && posterProfile && currentPost.userId === posterProfile.userId
                && currentPost.id !== post.postId){

                allPosts.push(currentPost)
            }
        })

        setMoreUserPosts(allPosts)
    }, [post, posterProfile, posts])


    useEffect(() => {
        getMoreUserPosts()
        getPostComments()

    }, [getMoreUserPosts, getPostComments])



    const handleTextInputChange = e => {
        setCommentText(e.target.value)
    }

    const handleSubmitComment = () =>{
        //console.log(commentText)
        const data = {
            comment : commentText,
            accountId : posterProfile.userId,
            userId : profile.userId,
            postId : post.postId,
            time : Date.now()
        }
        commentOnPost(data)
        setCommentText('')
    }

    const handleFollowUser = () =>{
        const data = {
            accountId : posterProfile.userId,
            userId : profile.userId
        }
        followUser(data)
    }

    const handleUnfollowUser = () =>{
        const data ={
            userId : profile.userId,
            accountId : post.userId
        }
        unFollowUser(data)
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


    const handleOpenProfilePopper = e =>{
        const data = {
            event : e.currentTarget,
            profile : posterProfile
        }
        handleOpenProfileCard(data)
    }

    const focusOnCommentInput = () =>{
        inputRef.current.focus()
    }


    return (
        <div className='pc-post-container' >
            <div className='main-selected-post-container'>

                <div className='main-post-file-container'>
                    <img src={post && post.fileUrl} alt='file' />
                </div>


                <div className='main-post-details-container'>

                    <div className='poster-profile-container'>

                        <div className='profile-information'>
                            <Avatar
                                className={classes.small}
                                src={posterProfile && posterProfile.profilePhoto}
                            />
                            <Link
                                onMouseEnter={handleOpenProfilePopper}
                                to={`/profile/${posterProfile && posterProfile.userName}/${posterProfile && posterProfile.userId}`}
                            >
                                <p>{posterProfile && posterProfile.userName}</p>
                            </Link>
                            <span className='span'>•</span>


                            {
                            post && profile && post.userId !== profile.userId && profile.following.includes(post.userId) ?
                                <Button
                                    size='small'
                                    onClick={handleUnfollowUser}
                                >
                                    Following
                                </Button>
                                    :
                                <Button
                                    color='primary'
                                    size='small'
                                    onClick={handleFollowUser}
                                >
                                    Follow
                                </Button>
                            }

                        </div>

                        <MoreHorizIcon fontSize='small' />

                    </div>




                    <div className='post-information-container'>
                        <div className='post-details'>
                            <Avatar
                                className={classes.small}
                                src={posterProfile && posterProfile.profilePhoto}
                            />
                            <p>
                                <Link
                                    onMouseEnter={handleOpenProfilePopper}
                                    to={`/profile/${posterProfile && posterProfile.userName}/${posterProfile && posterProfile.userId}`}
                                >
                                    {posterProfile && posterProfile.userName} 
                                </Link>
                                <span>{post && post.caption}</span>
                            </p>
                            

                        </div>

                        <div className='post-time'>
                            <small>{moment(post && post.time).fromNow()}</small>
                        </div>

                        

                        {
                            postComments && postComments.map(comment =>{
                                return(
                                    <EachComment
                                        comment={comment}
                                        post={post}
                                        profile={profile}
                                        key={comment.commentId}
                                    />
                                )
                            })
                        }

                    </div>



                    {/* comment section over here */}


                    <div className='post-detail-bottom-container'>

                        <div className='post-detail-bottom-actions-container'>

                            <div className='left-sided-actions'>

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
                                    action={focusOnCommentInput}
                                />

                                <ShareIcon
                                    width='24px'
                                    height='24px'

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

                        <div className='addition-post-information'>
                            <p>{post && post.likes.length} likes</p>
                            <small>{moment(post && post.time).fromNow()}</small>
                        </div>


                        <form className='post-comment-input-container'>
                            <TextareaAutosize
                                placeholder='Add a comment...'
                                autoCorrect='off'
                                autoComplete='off'
                                maxRows={5}
                                value={commentText}
                                onChange={handleTextInputChange}
                                ref={inputRef}
                            //onHeightChange={(height) => setTextAreaHeight(height)}
                            />
                            <Button
                                onClick={handleSubmitComment}
                                color='primary'
                                size='small'
                                disabled={commentText === ''}
                            >
                                Post
                            </Button>
                        </form>

                    </div>




                </div>

            </div>


            <hr className='pc-post-divider' />



            <div className='other-posts-container'>
                <p>More posts from <span>{posterProfile && posterProfile.userName}</span></p>

                <div className='more-user-posts-container'>
                    {moreUserPosts.length > 0 && moreUserPosts.slice(0, 6).map(post => {
                        return (
                            <EachMorePost
                                key={post.postId}
                                post={post}
                            />
                        )
                    })}
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
        posts: state.firestore.ordered.posts
    }
}


const mapDispatchToProps = dispatch => {
    return {
        commentOnPost : data => dispatch(commentOnPost(data)),
        followUser : data => dispatch(followUser(data)),
        unFollowUser : data => dispatch(unFollowUser(data)),
        likePost : data => dispatch(likePost(data)),
        unLikePost : data => dispatch(unLikePost(data)),
        savePost : data => dispatch(savePost(data)),
        unSavePost : data => dispatch(unSavePost(data)),
        handleViewStory : data => dispatch(handleViewStory(data)),
        handleOpenProfileCard : data => dispatch(handleOpenProfileCard(data)),
        handleCloseProfileCard : data => dispatch(handleCloseProfileCard(data)),
        deletePost : data => dispatch(deletePost(data)),
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['posts'])
)(PcPost)
