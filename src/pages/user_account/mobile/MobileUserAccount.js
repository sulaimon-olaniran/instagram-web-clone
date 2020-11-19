import React, { useState, useEffect, useCallback } from 'react'
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
import { db } from '../../../firebase/Firebase'
import LogoLoader from '../../../components/loaders/LogoLoader'



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


const MobileUserAccount = ({ match }) => {
    const [editProfileModal, setEditProfileModal] = useState(false)
    const [optionsModal, setOptionsModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)
    const [followersModal, setFollowersModal] = useState(false)
    const [fetchingUserData, setFetchingUserData] = useState(true)
    const [userPosts, setUserPosts] = useState([])
    const [userData, setUserData] = useState({})
    //console.log('mobile user account mounted')

    const handleFetchUserData = useCallback( () =>{
        const { userId } = match.params
        db.collection('users').doc(userId)
        .onSnapshot(snapshot =>{
            setUserData(snapshot.data())

            db.collection('users').doc(userId)
            .collection('posts').onSnapshot(snapshot =>{
                const posts = []
                snapshot.forEach((doc) =>{
                    posts.push(doc.data())
                })

                setUserPosts(posts)
                setFetchingUserData(false)
            })
        })
    }, [ match ])

    useEffect(() =>{
        handleFetchUserData()

    }, [handleFetchUserData])

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

    const classes = useStyles()

    if(fetchingUserData) return <LogoLoader />
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

                <p>Sulai_m0n</p>

                <Link to='/explore/people/suggested/'>
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