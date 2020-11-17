import React from 'react'
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

import { signUserOut } from '../../../../store/actions/AuthActions'

const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY : 'auto',
    },
}));




const AccountOptions = ({ openModal, handleCloseModal, openEditProfileModal, signUserOut }) => {
    const classes = useStyles()

    const handleOpenEditProifle = () =>{
        handleCloseModal()
        openEditProfileModal()
    }

    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div className='user-account-options-container'>
                <div className='user-account-options-nav-container'>
                    <CloseIcon
                        onClick={handleCloseModal}
                    />
                    <p>Options</p>

                </div>

                <div className='options-section-title'>
                        <p>Account</p>
                    </div>

                    <div className='each-action-button-container' onClick={handleOpenEditProifle}>
                        <Button>Edit Profile</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <Link to='/accounts/password/change'>
                        <div className='each-action-button-container'>
                            <Button>Change Password</Button>
                            <ArrowForwardIosIcon />
                        </div>
                    </Link>

                    <div className='each-action-button-container'>
                        <Button>Privacy and Security</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Nametag</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Login Activity</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Emails from Instagram</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='options-section-title'>
                        <p>Settings</p>
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Language</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Apps and Websites</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Notifications</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='options-section-title'>
                        <p>About</p>
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Ads</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Help Center</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>Report a Problem</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button>More</Button>
                        <ArrowForwardIosIcon />
                    </div>

                    <div className='each-action-button-container'>
                        <Button 
                            onClick={signUserOut}
                            color='secondary'
                        >
                            Log Out
                        </Button>
                        <ArrowForwardIosIcon />
                    </div>

            </div>

        </Modal>
    )
}


const matchDispatchToProps = (dispatch) =>{
    return{
        signUserOut: () => dispatch(signUserOut())
    }
}



export default connect(null, matchDispatchToProps)(AccountOptions)