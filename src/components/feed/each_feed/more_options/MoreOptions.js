import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'


import { deletePost } from '../../../../store/actions/PostsAction'
import { unFollowUser } from '../../../../store/actions/ProfileActions'
import ReportModal, { ReportDialog } from '../../../../pages/profile/actions/brr-dialog/report/ReportModal'



const MoreOptions = ({ openDialog, handleCloseDialog, handleCopyPostLink, openShare, post, profile, deletePost, unFollowUser, from }) => {
    const [reportModal, setReportModal] = useState(false)
    const [reportDialog, setReportDialog] = useState(false)

    const {postId} = post

    const posterId = post.userId

    const { userId } = profile

    const handleDeletePost = () =>{
        const data ={
            postId : postId,
            fileName : post.fileName
        }
        deletePost(data)
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


    const handleOpenReportModal = () =>{
        setReportModal(true)
    }


    const handleOpenReportDialog = () =>{
        setReportDialog(true)
        handleCloseDialog()
    }

    const handleCloseReport = () =>{
        setReportModal(false)
        setReportDialog(false)
    }

    return (
        <React.Fragment>
            <ReportModal
                openModal={reportModal}
                handleCloseModal={handleCloseReport}
                closeDialog={handleCloseDialog}
                text='post'
            />

            <ReportDialog
                openDialog={reportDialog}
                handleCloseDialog={handleCloseReport}
                text='post'
            />


            <Dialog
                aria-labelledby='simple-dialog-title'
                open={openDialog}
                onClose={handleCloseDialog}
            >
                { userId && userId !== posterId ?
                <div className='not-user-dialog-contents-container'>
                    <div className='content-container mobile'>
                        <Button 
                            color='secondary'
                            onClick={handleOpenReportModal}
                        >
                            Report
                        </Button>
                    </div>

                    <div className='content-container pc'>
                        <Button 
                            color='secondary'
                            onClick={handleOpenReportDialog}
                        >
                            Report
                        </Button>
                    </div>

                    {/* unfollow should only be visible when user is followed, unfollow confirmation dialog */}
                    
                    {
                        profile && profile.following.includes(posterId && posterId) &&

                        <div className='content-container'>
                            <Button color='secondary' onClick={handleUnfollowUser}>Unfollow</Button>
                        </div>
                    }

                    { from !== 'pc-post' && 
                    <Link 
                        to={`/p/${postId}`}
                        className='content-container'
                    >
                        <Button >Go To Post</Button>
                    </Link>}

                    <div className='content-container'>
                        <Button onClick={handleSharePost} >Share</Button>
                    </div>

                    <div className='content-container'>
                        <Button onClick={handleCopyPostLink} >Copy Link</Button>
                    </div>

                    <div className='content-container'>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
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
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        userId : state.firebase.profile.userId,
        profile : state.firebase.profile
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        deletePost : data => dispatch(deletePost(data)),
        unFollowUser : data => dispatch(unFollowUser(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MoreOptions)