import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'
import moment from 'moment'


import { UnLikedIcon, LikedIcon } from '../../../../components/MyIcons'
import { db } from '../../../../firebase/Firebase'
import CommentActionDialog from './comment_action/CommentActionDialog'
import { likePostComment, unLikePostComment } from '../../../../store/actions/PostsAction'




const EachComment = ({ from, comment, post, profile, likePostComment, unLikePostComment }) => {
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
        }, 1000)
    }

    const handleMouseUp = () => {
        clearTimeout(holdTimeRef.current)
    }

    const handleLikePostComment = () => {
        const data = {
            userId: profile.userId,
            accountId: comment.userId,
            commentId: comment.commentId,
            postId: post.postId
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
            <Avatar src={user && user.profilePhoto} />

            <div className='comment-details'>
                <div className='comment-text'>
                    <Link to={`/profile/${user && user.userName}/${user && user.userId}`}>
                        <p><span>{user && user.userName}</span> {comment.comment}</p>
                    </Link>
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
                    <small>{moment(comment.time).fromNow()}</small>
                    {comment.likes.length > 0 && <small>{comment.likes.length} likes</small>}
                    <small>Reply</small>
                </div>
            </div>

        </div>

    )
}


const mapDispatchToProps = dispatch => {
    return {
        likePostComment: data => dispatch(likePostComment(data)),
        unLikePostComment: data => dispatch(unLikePostComment(data))
    }
}


export default connect(null, mapDispatchToProps)(EachComment)