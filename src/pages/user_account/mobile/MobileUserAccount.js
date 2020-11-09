import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'


import { SettingsIcon, DiscoverIcon } from '../../../components/MyIcons'
import DashBoard from '../../profile/mobile/dashboard/DashBoard'
import EditProfile from './edit_profile/EditProfile'



const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },

    tiny: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    },

    button: {
        width: '100%',
    },
}));


const MobileUserAccount = () => {
    const [editProfileModal, setEditProfileModal] = useState(false)

    const openEditProfileModal = () =>{
        setEditProfileModal(true)
    }

    const closeEditProfileModal = () =>{
        setEditProfileModal(false)
    }

    const openFollowersModal = () =>{

    }

    const openFollowingModal = () =>{

    }

    const classes = useStyles()
    return (
        <div className='mobile-user-account-container'>
            <EditProfile
                openModal={editProfileModal}
                handleCloseModal={closeEditProfileModal}
            />
            <div className='mobile-user-account-nav-container'>
                <SettingsIcon
                    height='24px'
                    width='24px'
                />

                <p>Sulai_m0n</p>

                <Link exact to='/explore/people/suggested/'>
                    <DiscoverIcon
                        height='24px'
                        width='24px'
                    />
                </Link>

            </div>

            <div className='user-profile-details-container'>

                <div className='user-profile-header-container'>
                    <Avatar
                        className={classes.large}
                        src='https://source.unsplash.com/random/600x600/?woman'
                    />
                    <section>
                        <h1>Sulai_m0n</h1>
                        <Button
                            className={classes.button}
                            variant='outlined'
                            onClick={openEditProfileModal}
                        >
                            Edit profile

                        </Button>

                    </section>
                </div>

                <div className='user-profile-information-container'>
                    <h4>Sulaimon Olaniran</h4>
                    <p>
                        I'm a good boy<br/>
                        great guy aswell <br/>
                        nice to know guy <br/>
                        smart dude <br/>
                    </p>

                    <a
                        href='https://sulaimon-olaniran.netlify.app/'
                        rel='me nofollow noopener noreferrer'
                        target='_blank'
                    >
                        www.dontaskme.com
                    </a>
                    
                </div>

                <div className='user-profile-statistics-container'>
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

            <div className='mobile-user-account-dashboard-container'>
                <DashBoard />
            </div>

        </div>
    )
}


export default MobileUserAccount