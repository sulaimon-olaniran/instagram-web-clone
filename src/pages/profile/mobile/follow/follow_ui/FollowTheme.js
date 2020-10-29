import React from 'react'
import Modal from '@material-ui/core/Modal'
//import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { makeStyles } from '@material-ui/core/styles'


import { suggestions } from '../../../../suggestions/Fakedat'


const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY: 'scroll',
        //marginTop : '106px'
    },
}));



const FollowTheme = ({ openModal, handleCloseModal, data }) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >

                <div className='follow-container'>
                    <div className='follow-nav-container'>
                        <ArrowBackIosIcon onClick={handleCloseModal} />
                        <p>{data}</p>
                    </div>

                    <div className='follow-contents-container'>
                        {
                            suggestions.map((suggestion, i) => {
                                return (
                                    <div key={i} className='each-follow-container'>
                                        <div className='follow-profile-container'>
                                            <Avatar src={suggestion.image} alt={suggestion.name} />

                                            <div className='follow-personal-details'>
                                                <h5>{suggestion.name}</h5>
                                                <p>{suggestion.username}</p>
                                            </div>
                                        </div>


                                        <Button
                                            color='primary'
                                            variant='contained'
                                        >
                                            Follow
                                    </Button>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

        </Modal>
    )
}


export default FollowTheme