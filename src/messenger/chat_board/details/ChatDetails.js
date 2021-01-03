import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button } from '@material-ui/core'
import { ArrowBackIosOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import BlockDialog from '../../../pages/profile/actions/brr-dialog/block/Block'
import { ReportChatAccountModal } from './report/ReportAccount'
import DeleteChatDialog from './delete/DeleteChatDialog'


const useStyles = makeStyles((theme) => ({
    xLarge: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    tiny: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}))




const ChatDetails = ({ user, handleHideDetails }) => {
    const [blockDialog, setBlockDialog] = useState(false)
    const [reportModal, setReportModal] = useState(false)
    const [deleteChatDialog, setDeleteChatDialog] = useState(false)
    const classes = useStyles()


    const handleOpenBlockDialog = () => {
        setBlockDialog(true)
    }


    const handleCloseBlockDialog = () => {
        setBlockDialog(false)
    }

    const handleOpenReportModal = () => {
        setReportModal(true)
    }

    const handleCloseReportModal = () => {
        setReportModal(false)
    }

    const handleOpenDeleteChatDialog = () => {
        setDeleteChatDialog(true)
    }

    const handleCloseDeleteChatDialog = () => {
        setDeleteChatDialog(false)
    }

    return (
        <div className='chat-details-container'>

            <BlockDialog
                openDialog={blockDialog}
                handleCloseDialog={handleCloseBlockDialog}
                userProfile={user}
            />

            <ReportChatAccountModal
                openModal={reportModal}
                handleCloseModal={handleCloseReportModal}
                user={user}
            />

            <DeleteChatDialog
                openDialog={deleteChatDialog}
                handleCloseDialog={handleCloseDeleteChatDialog}
            />

            <div className='chat-details-nav-container'>
                <ArrowBackIosOutlined onClick={handleHideDetails} />
                <p>Details</p>
            </div>


            <div className='chat-details-mute-message-container'>
                <Checkbox
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                />

                <p>Mute Messages</p>

            </div>


            <div className='chat-details-members-container'>
                <h4>Members</h4>

                <div className='chat-details-profile-container'>
                    <Link to={`/profile/${user.userName}/${user.userId}`}>
                        <Avatar
                            src={user.profilePhoto}
                            className={classes.xLarge}
                        />
                    </Link>

                    <div className='chat-details-names-container'>
                        <Link to={`/profile/${user.userName}/${user.userId}`}>
                            <p>{user.userName}</p>
                        </Link>
                        <Link to={`/profile/${user.userName}/${user.userId}`}>
                            <small>{user.fullName}</small>
                        </Link>
                    </div>
                </div>

            </div>



            <div className='chat-details-actions-container'>
                <Button onClick={handleOpenDeleteChatDialog}>Delete Chat</Button>
                <Button onClick={handleOpenBlockDialog}>Block</Button>
                <Button onClick={handleOpenReportModal}>Report</Button>
            </div>

        </div>
    )

}



export default ChatDetails