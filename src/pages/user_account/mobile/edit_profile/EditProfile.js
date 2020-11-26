import React from 'react'
import Modal from '@material-ui/core/Modal'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ProfilePhoto from './profile_photo/ProfilePhoto'
import FormikProfileInfromation from './information/ProfileInfromation'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import { connect } from 'react-redux'




const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY : 'auto',
    },
}));


const EditProfile = ({ openModal, handleCloseModal, profile }) =>{
    const classes = useStyles()
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
            <div className='edit-profile-container'>
                
                <div className='edit-profile-nav-container'>
                    <ArrowBackIosIcon onClick={handleCloseModal} />
                    <p>Edit Profile</p>
                </div>

                <ProfilePhoto 
                    profile={profile}
                />
            
                <FormikProfileInfromation 
                    profile={profile}
                />

            </div>

        </Modal>
    )
}


const mapStateToProps = (state) =>{
    //console.log(state)
    return {
        profile : state.firebase.profile
    }
}


export default connect(mapStateToProps)(EditProfile)