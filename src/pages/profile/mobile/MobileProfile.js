import React, { useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import CheckIcon from '@material-ui/icons/Check'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { withRouter } from 'react-router-dom'



//import { db } from '../../../firebase/Firebase'
import DashBoard from './dashboard/DashBoard'
import Followers from './follow/Followers'
import Following from './follow/Following'

//import LogoLoader from '../../../components/loaders/LogoLoader'
import StoryAvatar from '../../../components/avatar/StoryAvatar'


const useStyles = makeStyles((theme) => ({
    xLarge : {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },

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
}))


const MobileProfile = ({ history, profile, userProfile, userPosts, handleViewStory, handleFollowUser, openUnFollowDialog, openBlockDialog, openChatBoard }) => {
    const [followingModal, setFollowingModal] = useState(false)
    const [followersModal, setFollowersModal] = useState(false)
    

    const classes = useStyles()



    //console.log(userPosts)

    const openFollowingModal = () => {
        setFollowingModal(true)
    }

    const openFollowersModal = () => {
        setFollowersModal(true)
    }

    const handleCloseModal = () => {
        setFollowersModal(false)
        setFollowingModal(false)
    }

 

    //following for opening mobile chatboard from the user's profile page
    

    return (
        <div className='mobile-profile-page-container'>

            { followersModal && <Followers
                handleCloseModal={handleCloseModal}
                openModal={followersModal}
                followers={userProfile && userProfile.followers}
                from='profile'
            />}

            {followingModal && <Following
                handleCloseModal={handleCloseModal}
                openModal={followingModal}
                following={userProfile && userProfile.following}
                from='profile'
            />}

            


            <div className='mobile-profile-nav-container'>
                <ArrowBackIosIcon
                    onClick={() => history.goBack()}
                />
                <p>{userProfile && userProfile.userName}</p>
            </div>



            <div className='user-information-container landscape'>
                {userProfile && !userProfile.stories.length > 0 ?
                    <Avatar
                        className={classes.xLarge}
                        src={userProfile && userProfile.profilePhoto}
                    />
                    :
                    <StoryAvatar
                        src={userProfile && userProfile.profilePhoto}
                        height='144px'
                        width='144px'
                        action={() => handleViewStory(userProfile)}
                    />
                }

                <div className='user-account-details'>
                    <section className='top-details-section'>
                        <p>{userProfile && userProfile.userName}</p>
                        {profile && profile.following.includes(userProfile && userProfile.userId) ?
                            <React.Fragment>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    className={classes.messageButton}
                                    onClick={() => openChatBoard(userProfile)}
                                >
                                    Message
                                </Button>

                                <Button
                                    variant='outlined'
                                    size='medium'
                                    className={classes.unFollowButton}
                                    onClick={openUnFollowDialog}
                                >
                                    <PersonIcon className={classes.tiny} />
                                    <CheckIcon className={classes.tiny} />
                                </Button>

                            </React.Fragment>

                            :

                            <Button
                                variant='contained'
                                onClick={handleFollowUser}
                                color='primary'
                                className={classes.followButton}
                            >
                                Follow
                            </Button>}

                        <MoreHorizIcon
                            onClick={openBlockDialog}
                        />
                    </section>




                    <section className='post-follows-section'>
                        <Button>
                            <div>
                                <p>{userPosts && userPosts.length}</p>
                                <small>posts</small>
                            </div>
                        </Button>

                        <Button onClick={openFollowersModal} >
                            <div>
                                <p>{userProfile && userProfile.followers.length}</p>
                                <small>followers</small>
                            </div>
                        </Button>

                        <Button onClick={openFollowingModal}>
                            <div>
                                <p>{userProfile && userProfile.following.length}</p>
                                <small>following</small>
                            </div>
                        </Button>
                    </section>


                    <section className='bottom-details-section'>
                        <h3>{userProfile && userProfile.fullName}</h3>
                        <p>{userProfile && userProfile.bio}</p>
                        <a href={userProfile && userProfile.website} target="_blank" rel="noopener noreferrer">
                            {userProfile && userProfile.website}
                        </a>
                    </section>
                </div>
            </div>






            <div className='user-information-container portrait'>

                <div className='first-section-container'>
                    {  userProfile && !userProfile.stories.length > 0 ?
                    <Avatar
                        className={classes.large}
                        src={userProfile && userProfile.profilePhoto}
                    />
                        :
                    <StoryAvatar
                        src={userProfile && userProfile.profilePhoto}
                        height='80px'
                        width='80px'
                        action={() => handleViewStory(userProfile)}
                    />}

                    <div className='name-message-follow-container'>
                        <p>{userProfile && userProfile.userName}</p>

                        <MoreHorizIcon
                            onClick={openBlockDialog}
                        />

                        <div className='message-follow-container'>
                            {profile && profile.following.includes(userProfile && userProfile.userId) ?
                                <React.Fragment>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        onClick={() => openChatBoard(userProfile)}
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
                                </React.Fragment>

                                :

                                <Button
                                    variant='contained'
                                    onClick={handleFollowUser}
                                    color='primary'
                                >
                                    Follow
                            </Button>}
                        </div>
                        
                    </div>

                    
                </div>

                <div className='second-section-container'>
                    <h3>{userProfile && userProfile.fullName}</h3>
                    <p>{userProfile && userProfile.bio}</p>
                    <a href={userProfile && userProfile.website} target="_blank" rel="noopener noreferrer">
                        {userProfile && userProfile.website}
                    </a>
                </div>


                <div className='third-section-container'>
                    <Button>
                        <span>
                            <p>{userPosts && userPosts.length}</p>
                            <small>posts</small>
                        </span>
                    </Button>

                    <Button onClick={openFollowersModal}>
                        <span>
                            <p>{userProfile && userProfile.followers.length}</p>
                            <small>followers</small>
                        </span>
                    </Button>

                    <Button onClick={openFollowingModal}>
                        <span>
                            <p>{userProfile && userProfile.following.length}</p>
                            <small>following</small>
                        </span>
                    </Button>

                </div>

            </div>


            <div className='user-medias-container'>
                <DashBoard
                    posts={userPosts && userPosts}
                    user={userProfile && userProfile}
                    from='profile'
                />
            </div>

        </div>
    )
}







export default withRouter(MobileProfile)