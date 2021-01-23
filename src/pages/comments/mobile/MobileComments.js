import React, { useState } from 'react'
//import { withRouter } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextareaAutosize from 'react-textarea-autosize'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import moment from 'moment'




import { MyDirectIcon } from '../../../components/MyIcons'
import EachComment from './each_comment/EachComment'
import { commentOnPost } from '../../../store/actions/PostsAction'





const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY : 'scroll',
        marginTop : '106px'
    },
}))


const MobileComments = ({ post, postComments, posterProfile, openCommentModal, handleCloseModal, profile, commentOnPost }) => {
    const [textAreaHeight, setTextAreaHeight] = useState(0)
    const [commentText, setCommentText] = useState('')
    const classes = useStyles()


    const handleTextInputChange = e =>{
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

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openCommentModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='mobile-comments-container' style={{ marginTop: `${textAreaHeight - 12}px` }}>

                <div className={`top-section-container`} >
                    <div className='navigation'>
                        <ArrowBackIosIcon
                            onClick={handleCloseModal}
                        />
                        <p>Comments</p>
                        <MyDirectIcon
                            height='24px'
                            width='24px'
                        />
                    </div>

                    <div className='comment-input-container'>
                        <Avatar 
                            src={profile.profilePhoto}
                        />
                        <form>
                            <TextareaAutosize
                                placeholder='Add a comment...'
                                autoCorrect='off'
                                autoComplete='off'
                                maxRows={5}
                                value={commentText}
                                onChange={handleTextInputChange}
                                onHeightChange={(height) => setTextAreaHeight(height)}
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

                <div className='caption-container'>
                    <Avatar src={posterProfile && posterProfile.profilePhoto}/>

                    <div className='caption-text'>
                        <p>
                            <span>{posterProfile && posterProfile.userName}</span> {post && post.caption}
                        </p>

                        <small>{moment(post && post.time).fromNow()}</small>
                    </div>
                </div>

                <div className='comments-container'>
                    {
                        postComments && postComments.map((comment, i) => {
                            return (
                                <React.Fragment key={comment.commentId}>
                                    <EachComment comment={comment} post={post} profile={profile} />
                                </React.Fragment>
                            )
                        })
                    }

                </div>

            </div>
        </Modal>
    )
}


const mapStateToProps = state =>{
    return {
        profile : state.firebase.profile
    }
}


const mapDispatchToProps = dispatch => {
    return {
        commentOnPost : data => dispatch(commentOnPost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileComments)