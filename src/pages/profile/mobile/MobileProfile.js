import React, { useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import CheckIcon from '@material-ui/icons/Check'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'


import DashBoard from './dashboard/DashBoard'
import Followers from './follow/Followers'
import Following from './follow/Following'
import UnFollowDialog from './actions/unfollow/UnFollow'
import BlockReportRestrictDialog from './actions/brr-dialog/BRRDialog'


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    small : {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },

    tiny : {
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
}))


const MobileProfile = ({ match, history }) => {
    const [followingModal, setFollowingModal] = useState(false)
    const [followersModal, setFollowersModal] = useState(false)
    const [unfollowDialog, setUnfollowDialog] = useState(false)
    const [blockDialog, setBlockDialog] = useState(false)

    const openFollowingModal = () =>{
        setFollowingModal(true)
    }

    const openFollowersModal = () =>{
        setFollowersModal(true)
    }

    const handleCloseModal = () =>{
        setFollowersModal(false)
        setFollowingModal(false)
    }

    const openUnFollowDialog = () =>{
        setUnfollowDialog(true)
    }

    const openBlockDialog = () =>{
        setBlockDialog(true)
    }

    const handleCloseDialog = () =>{
        setUnfollowDialog(false)
        setBlockDialog(false)
    }

    const classes = useStyles()
    //console.log(match)
    return (
        <div className='profile-page-container'>

            <Followers 
               handleCloseModal={handleCloseModal}
               openModal={followersModal}
            />
            <Following 
                handleCloseModal={handleCloseModal}
                openModal={followingModal}
            />

            <UnFollowDialog 
               openDialog={unfollowDialog}
               handleCloseDialog={handleCloseDialog}
            />
            
            <BlockReportRestrictDialog 
              openDialog={blockDialog}
              handleCloseDialog={handleCloseDialog}
            />


            <div className='profile-nav-container'>
                <ArrowBackIosIcon 
                   onClick={() => history.goBack()}
                />
                <p>{match.params.username}</p>
            </div>


            <div className='user-information-container'>

                <div className='first-section-container'>
                    <Avatar className={classes.large} src='https://source.unsplash.com/random/600x600/?woman' />

                    <div className='name-message-follow-container'>
                        <p>{match.params.username}</p>

                        <div className='message-follow-container'>
                            <Button
                                variant='outlined'
                                size='small'
                            >
                                Message
                            </Button>

                            <Button
                                variant='outlined'
                                size='small'
                                onClick={openUnFollowDialog}
                            >
                                <PersonIcon className={classes.tiny} />
                                <CheckIcon className={classes.tiny} />
                            </Button>

                            <Button
                                variant='outlined'
                                size='small'
                            >
                                <ArrowDropDownIcon className={classes.small} />
                            </Button>
                        </div>
                    </div>

                    <MoreHorizIcon 
                       onClick={openBlockDialog}
                    />
                </div>

                <div className='second-section-container'>
                    <h3>Olaniran Sulaimon</h3>
                    <p>Web App Developer</p>
                    <a href='https://www.instagram.com/manchesterunited/' target="_blank" rel="noopener noreferrer">
                       instagram.com/manchesterunited/
                    </a>
                </div>


                <div className='third-section-container'>
                    <Button>
                        <span>
                            <p>64</p>
                            <small>posts</small>
                        </span>
                    </Button>

                    <Button onClick={openFollowersModal}>
                        <span>
                            <p>14,564</p>
                            <small>followers</small>
                        </span>
                    </Button>

                    <Button onClick={openFollowingModal}>
                        <span>
                            <p>150</p>
                            <small>following</small>
                        </span>
                    </Button>

                </div>

            </div>


            <div className='user-medias-container'>
                <DashBoard />
            </div>

        </div>
    )
}


export default MobileProfile