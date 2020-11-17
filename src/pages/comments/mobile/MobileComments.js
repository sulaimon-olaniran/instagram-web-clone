import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextareaAutosize from 'react-textarea-autosize'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'


import { MyDirectIcon } from '../../../components/MyIcons'
import EachComment from './each_comment/EachComment'


const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY : 'scroll',
        marginTop : '106px'
    },
}));


const MobileComments = ({ post, posterProfile, openCommentModal, handleCloseModal }) => {
    const [textAreaHeight, setTextAreaHeight] = useState(0)
    const classes = useStyles()

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
                            src={posterProfile.profilePhoto}
                        />
                        <form>
                            <TextareaAutosize
                                placeholder='Add a comment...'
                                autoCorrect='off'
                                autoComplete='off'
                                maxRows={5}
                                onHeightChange={(height) => setTextAreaHeight(height)}
                            />
                            <Button color='primary' size='small' disabled={true}>Post</Button>
                        </form>
                    </div>
                </div>

                <div className='caption-container'>
                    <Avatar />

                    <div className='caption-text'>
                        <p>
                            <span>{posterProfile && posterProfile.userName}</span> {post && post.caption}
                        </p>

                        <small>{post && post.time}</small>
                    </div>
                </div>

                <div className='comments-container'>
                    {
                        post && post.comments.map((comment, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <EachComment comment={comment} />
                                </React.Fragment>
                            )
                        })
                    }

                </div>

            </div>
        </Modal>
    )
}


export default withRouter(MobileComments)