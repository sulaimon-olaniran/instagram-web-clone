import React from 'react'
import Popover from '@material-ui/core/Popover'
import { Button } from '@material-ui/core'






const UnsendReportPopper = ({ anchorEl, handleClose, profile, message, handleLikeMessage, handleDeleteMessage, handleUnlikeMessage }) => {
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const handleCopyText = () =>{
        navigator.clipboard.writeText(message.message)
    }

    const deleteMessage = () =>{
        handleDeleteMessage(message)
        handleClose()
    }

    const likeMessage = () =>{
        handleLikeMessage(message)
        handleClose()
    }


    const unLikeMessage = () =>{
        handleUnlikeMessage(message)
        handleClose()
    }
    

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <div className='unsend-report-popper-container'>
                {message.likes.includes(profile.userId) ?
                    <Button
                        onClick={unLikeMessage}
                    >
                        Unlike
                    </Button>
                        :
                    <Button
                        onClick={likeMessage}
                    >
                        Like
                    </Button>
                }

                {
                    message.messageType === 'text' &&
                    <Button
                        onClick={handleCopyText}
                    >
                        Copy
                    </Button>

                }

                {
                    message.sender !== profile.userId ?
                    <Button>
                        Report
                    </Button>
                    :
                    <Button
                        onClick={deleteMessage}
                    >
                        Unsend
                    </Button>
                }

            </div>

        </Popover>
    )
}



export default UnsendReportPopper