import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'


import { deletePostComment } from '../../../../../store/actions/PostsAction'
import ReportModal, { ReportDialog } from '../../../../profile/actions/brr-dialog/report/ReportModal'



const CommentActionDialog = ({ openDialog, handleCloseDialog, deletePostComment, comment, post, profile }) => {
    const [reportModal, setReportModal] = useState(false)
    const [reportDialog, setReportDialog] = useState(false)


    const handleDeleteComment = () => {
        const data = {
            commentId: comment.commentId,
            postId: post.postId,
            accountId: post.userId,
            userId: profile.userId
        }

        deletePostComment(data)
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
            />

            <ReportDialog
                openDialog={reportDialog}
                handleCloseDialog={handleCloseReport}
                text='comment'
            />
            <Dialog
                aria-labelledby='simple-dialog-title'
                open={openDialog}
                onClose={handleCloseDialog}
                text='comment'
            >
                <div className='delete-comment-dialog-container'>

                <div className='button-container mobile'>
                        <Button 
                            color='secondary'
                            onClick={handleOpenReportModal}
                        >
                            Report
                        </Button>
                    </div>


                    <div className='button-container pc'>
                        <Button 
                            color='secondary'
                            onClick={handleOpenReportDialog}
                        >
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
        </React.Fragment>
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