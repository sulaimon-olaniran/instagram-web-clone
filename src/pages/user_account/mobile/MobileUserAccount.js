import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'


import { SettingsIcon, DiscoverIcon } from '../../../components/MyIcons'
import DashBoard from '../../profile/mobile/dashboard/DashBoard'
import EditProfile from './edit_profile/EditProfile'
import AccountOptions from './options/AccountOptions'
import Followers from '../../profile/mobile/follow/Followers'
import Following from '../../profile/mobile/follow/Following'



const useStyles = makeStyles((theme) => ({
    xLarge : {

        width: theme.spacing(18),
        height: theme.spacing(18),
    },

    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    button: {
        width: '100%',
    },
}));


const MobileUserAccount = ({ userPosts, userData }) => {
    const [editProfileModal, setEditProfileModal] = useState(false)
    const [optionsModal, setOptionsModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)
    const [followersModal, setFollowersModal] = useState(false)


    const classes = useStyles()


    const openEditProfileModal = () =>{
        setEditProfileModal(true)
    }

    const closeEditProfileModal = () =>{
        setEditProfileModal(false)
    }

    const openOpetionsMOdal = () =>{
        setOptionsModal(true)
    }

    const closeOptionsModal = () =>{
        setOptionsModal(false)
    }

    const openFollowersModal = () =>{
        setFollowersModal(true)
    }

    const openFollowingModal = () =>{
        setFollowingModal(true)
    }

    const handleCloseModal = () =>{
        setFollowersModal(false)
        setFollowingModal(false)
    }

    

    return (
        <div className='mobile-user-account-container'>
            <EditProfile
                openModal={editProfileModal}
                handleCloseModal={closeEditProfileModal}
            />

            <AccountOptions 
               openModal={optionsModal}
               handleCloseModal={closeOptionsModal}
               openEditProfileModal={openEditProfileModal}
            />

            { followersModal && <Followers 
                handleCloseModal={handleCloseModal}
                openModal={followersModal}
                followers={userData && userData.followers}
                from='account'
            />}

            { followingModal && <Following 
                handleCloseModal={handleCloseModal}
                openModal={followingModal}
                following={userData && userData.following}
                from='account'
            />}


            <div className='mobile-user-account-nav-container'>
                <SettingsIcon
                    height='24px'
                    width='24px'
                    action={openOpetionsMOdal}
                />

                <p>{userData.userName}</p>

                <Link to='/explore/people/suggested/'>
                    <DiscoverIcon
                        height='24px'
                        width='24px'
                    />
                </Link>

            </div>




            {/* user account for landscape mode in mobile................................... */}

            <div className='user-account-information-container landscape'>
                <Avatar
                    className={classes.xLarge}
                    src={userData.profilePhoto}
                />

                <div className='user-account-details-container'>
                    <section className='first-section'>
                        <p>{userData.userName}</p>
                        <Button
                            variant='outlined'
                            onClick={openEditProfileModal}
                        >
                            Edit Profile
                        </Button>

                    </section>


                    <section className='second-section'>
                        <Button>
                            <div>
                                <p>{ userPosts.length }</p>
                                <small>posts</small>
                            </div>
                        </Button>

                        <Button
                            onClick={openFollowersModal}
                        >
                            <div>
                                <p>{userData && userData.followers.length}</p>
                                <small>Followers</small>
                            </div>
                        </Button>

                        <Button
                            onClick={openFollowingModal}
                        >
                            <div>
                                <p>{userData && userData.following.length}</p>
                                <small>Following</small>
                            </div>
                        </Button>
                    </section>

                    <section className='third-section'>
                        <h3>{userData.fullName}</h3>
                        <p>{userData.bio}</p>
                        <a href={userData.website} target="_blank" rel="noopener noreferrer">
                            {userData.website}
                        </a>
                    </section>
                    
                </div>

            </div>






            {/*mobile profile for portrait mode....................................................................... */}

            <div className='user-profile-details-container portrait'>

                <div className='user-profile-header-container'>
                    <Avatar
                        className={classes.large}
                        src={userData && userData.profilePhoto}
                    />
                    <section>
                        <h1>{userData && userData.userName}</h1>
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
                    <h4>{userData && userData.fullName}</h4>
                    <p>{userData && userData.bio}</p>

                    <a
                        href={userData && userData.website}
                        rel='me nofollow noopener noreferrer'
                        target='_blank'
                    >
                        {userData && userData.website}
                    </a>
                    
                </div>

                <div className='user-profile-statistics-container'>
                    <Button>
                        <span>
                            <p>{userPosts && userPosts.length}</p>
                            <small>posts</small>
                        </span>
                    </Button>

                    <Button onClick={openFollowersModal}>
                        <span>
                            <p>{userData && userData.followers.length}</p>
                            <small>followers</small>
                        </span>
                    </Button>

                    <Button onClick={openFollowingModal}>
                        <span>
                            <p>{userData && userData.following.length}</p>
                            <small>following</small>
                        </span>
                    </Button>

                </div>

            </div>

            <div className='mobile-user-account-dashboard-container'>
                <DashBoard 
                    posts={userPosts && userPosts}
                    user={userData && userData}  
                    from='account'
                />
            </div>

        </div>
    )
}


export default withRouter(MobileUserAccount)