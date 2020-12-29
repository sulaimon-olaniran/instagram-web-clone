import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'
import moment from 'moment'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'



import { UnLikedIcon, LikedIcon } from '../../../../components/MyIcons'
import { db } from '../../../../firebase/Firebase'
import CommentActionDialog from './comment_action/CommentActionDialog'
import { likePostComment, unLikePostComment } from '../../../../store/actions/PostsAction'
import { handleViewStory } from '../../../../store/actions/AppActions'
import StoryAvatar from '../../../../components/avatar/StoryAvatar'




const EachComment = ({ from, comment, post, profile, likePostComment, unLikePostComment, handleViewStory }) => {
    const [user, setUser] = useState({}) //to get user that made the comment
    const [actionDialog, setActionDialog] = useState(false)
    const holdTimeRef = useRef(null)


    const getUserDetails = useCallback(() => {
        db.collection('users').doc(comment.userId)
            .onSnapshot(snapshot => {
                setUser(snapshot.data())
            })
    }, [comment])

    useEffect(() => {
        getUserDetails()

    }, [getUserDetails])


    const handleOpenActiondialog = () => {
        setActionDialog(true)
    }

    const handleCloseActionDialog = () => {
        setActionDialog(false)
    }
    

    const handleMouseDown = () => {
        holdTimeRef.current = setTimeout(() => {
            handleOpenActiondialog()
        }, 1500)
    }

    const handleMouseUp = () => {
        clearTimeout(holdTimeRef.current)
    }

    const handleLikePostComment = () => {
        const data = {
            userId: profile.userId,
            accountId: comment.userId,
            commentId: comment.commentId,
            postId: post.postId,
            comment: comment.comment
        }

        likePostComment(data)
    }

    const handleUnlikePostComment = () => {
        const data = {
            userId: profile.userId,
            accountId: comment.userId,
            commentId: comment.commentId,
            postId: post.postId
        }

        unLikePostComment(data)
    }

    //console.log(user)

    if (from === "top_three") return (
        <div className='each-comment-container'>
            <div className='comment'>
                <Link to={`/profile/${user && user.userName}/${user && user.userId}`}>
                    <p><span>{user && user.userName}</span> {comment.comment}</p>
                </Link>
            </div>
            {profile && profile.likedComments.includes(comment.commentId) ?
                <LikedIcon
                    height='12px'
                    width='12px'
                    action={handleUnlikePostComment}
                />
                :
                <UnLikedIcon
                    height='12px'
                    width='12px'
                    action={handleLikePostComment}
                />
            }
        </div>
    )

    return (
        <div className='every-comment-container'
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}

        >
            <CommentActionDialog
                openDialog={actionDialog}
                handleCloseDialog={handleCloseActionDialog}
                comment={comment}
                post={post}
            />
            {user && user.stories && !user.stories.length > 0 ?
                <Avatar src={user && user.profilePhoto} />
                :
                <StoryAvatar
                    src={user && user.profilePhoto}
                    height='40px'
                    width='40px'
                    action={() => handleViewStory(user)}
                />}

            <div className='comment-details'>
                <div className='comment-text'>
                    <p>
                        <Link to={`/profile/${user && user.userName}/${user && user.userId}`}>
                            {user && user.userName}
                        </Link>
                        {comment.comment}
                    </p>
                    
                    {profile && profile.likedComments.includes(comment.commentId) ?
                        <LikedIcon
                            height='12px'
                            width='12px'
                            action={handleUnlikePostComment}
                        />
                        :
                        <UnLikedIcon
                            height='12px'
                            width='12px'
                            action={handleLikePostComment}
                        />
                    }
                </div>

                <div className='comment-time-likes'>
                    <div className='time-likes'>
                        <small>{moment(comment.time).fromNow()}</small>
                        {comment.likes.length > 0 && <small>{comment.likes.length} likes</small>}
                    </div>

                    <div className='more-options'>
                        <MoreHorizIcon
                            fontSize='small'
                            onClick={handleOpenActiondialog}
                        />
                    </div>
                </div>
            </div>

        </div>

    )
}


const mapDispatchToProps = dispatch => {
    return {
        likePostComment: data => dispatch(likePostComment(data)),
        unLikePostComment: data => dispatch(unLikePostComment(data)),
        handleViewStory: data => dispatch(handleViewStory(data))
    }
}


export default connect(null, mapDispatchToProps)(EachComment)