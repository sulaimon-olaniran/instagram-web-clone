import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'


import { deletePost } from '../../../../store/actions/PostsAction'
import { unFollowUser } from '../../../../store/actions/ProfileActions'



const MoreOptions = ({ openDialog, handleCloseDialog, handleCopyPostLink, openShare, posterId, userId, postId, deletePost, unFollowUser }) => {

    const handleDeletePost = () =>{
        deletePost(postId)
    }

    const handleSharePost = () =>{
        openShare()
        handleCloseDialog()
    }

    const handleUnfollowUser = () =>{
        const data ={
            userId : userId,
            accountId : posterId
        }

        unFollowUser(data)
    }
    return (
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            { userId && userId !== posterId ?
            <div className='not-user-dialog-contents-container'>
                <div className='content-container'>
                    <Button color='secondary'>Report</Button>
                </div>

                {/* unfollow should only be visible when user is followed, unfollow confirmation dialog */}
                <div className='content-container'>
                    <Button color='secondary' onClick={handleUnfollowUser}>Unfollow</Button>
                </div>

                <Link 
                    to={`/p/${postId}`}
                    className='content-container'
                >
                    <Button >Go To Post</Button>
                </Link>

                <div className='content-container'>
                    <Button onClick={handleSharePost} >Share</Button>
                </div>

                <div className='content-container'>
                    <Button onClick={handleCopyPostLink} >Copy Link</Button>
                </div>

                <div className='content-container'>
                    <Button onClick={handleCloseDialog}>Cancle</Button>
                </div>

            </div>

            :

            <div className='user-dialog-contents-container'>
                <div className='content-container'>
                    <Button color='secondary' onClick={handleDeletePost}>Delete</Button>
                </div>

                <Link 
                    to={`/p/${postId}`}
                    className='content-container'
                >
                    <Button >Go To Post</Button>
                </Link>

                <div className='content-container'>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </div>
            </div>}

        </Dialog>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        userId : state.firebase.profile.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        deletePost : data => dispatch(deletePost(data)),
        unFollowUser : data => dispatch(unFollowUser(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MoreOptions)