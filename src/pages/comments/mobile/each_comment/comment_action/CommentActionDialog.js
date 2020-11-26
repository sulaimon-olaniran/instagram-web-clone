import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'


import { deletePostComment } from '../../../../../store/actions/PostsAction'



const CommentActionDialog = ({ openDialog, handleCloseDialog, deletePostComment, comment, post, profile }) => {

    const handleDeleteComment = () => {
        const data = {
            commentId: comment.commentId,
            postId: post.postId,
            accountId: post.userId,
            userId: profile.userId
        }

        deletePostComment(data)
    }


    return (
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='delete-comment-dialog-container'>
                <div className='button-container'>
                    <Button color='secondary'>
                        Report
                    </Button>
                </div>

                {profile.userId === post.userId || profile.userId === comment.userId ?
                    <div className='button-container'>
                        <Button
                            color='secondary'
                            onClick={handleDeleteComment}
                        >
                            Delete
                    </Button>
                    </div>
                    : null
                }

                <div className='button-container'>
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                </div>
            </div>

        </Dialog>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePostComment: data => dispatch(deletePostComment(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentActionDialog)