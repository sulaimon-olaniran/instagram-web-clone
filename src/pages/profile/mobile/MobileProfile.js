import React, { useState, useEffect, useCallback } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import CheckIcon from '@material-ui/icons/Check'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'


import { db } from '../../../firebase/Firebase'
import DashBoard from './dashboard/DashBoard'
import Followers from './follow/Followers'
import Following from './follow/Following'
import UnFollowDialog from './actions/unfollow/UnFollow'
import BlockReportRestrictDialog from './actions/brr-dialog/BRRDialog'
import LogoLoader from '../../../components/loaders/LogoLoader'
import { followUser, unFollowUser } from '../../../store/actions/ProfileActions'
import { handleViewStory } from '../../../store/actions/AppActions'
import StoryAvatar from '../../../components/avatar/StoryAvatar'


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
}))


const MobileProfile = ({ match, history, followUser, unFollowUser, profile, posts, handleViewStory }) => {
    const [userProfile, setUserProfile] = useState({})
    const [fetchingData, setFetchingData] = useState(true)
    const [userPosts, setUserPosts] = useState([])
    const [followingModal, setFollowingModal] = useState(false)
    const [followersModal, setFollowersModal] = useState(false)
    const [unfollowDialog, setUnfollowDialog] = useState(false)
    const [blockDialog, setBlockDialog] = useState(false)
    //console.log(match.params.id)

    const getUserProfileData = useCallback(() => {
        const userId = match.params.id
        const allPosts = []
        db.collection('users').doc(userId)
            .onSnapshot(snapshot => {
                setUserProfile(snapshot.data())
                //console.log(snapshot.data())
                posts && posts.forEach(post => {
                    if (post.userId === userId) {
                        allPosts.push(post)
                    }
                })
                setUserPosts(allPosts)
                setFetchingData(false)
            })
    }, [match, posts])


    const handleFollowUser = () => {
        const data = {
            accountId: match.params.id,
            userId: profile.userId
        }

        followUser(data)
    }

    const handleUnFollowUser = () => {
        const data = {
            accountId: match.params.id,
            userId: profile.userId
        }

        unFollowUser(data)
    }


    useEffect(() => {
        getUserProfileData()
    }, [getUserProfileData])

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

    const openUnFollowDialog = () => {
        setUnfollowDialog(true)
    }

    const openBlockDialog = () => {
        setBlockDialog(true)
    }

    const handleCloseDialog = () => {
        setUnfollowDialog(false)
        setBlockDialog(false)
    }

    const classes = useStyles()
    //console.log(match)
    if (fetchingData) return <LogoLoader />
    return (
        <div className='profile-page-container'>

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

            <UnFollowDialog
                openDialog={unfollowDialog}
                handleCloseDialog={handleCloseDialog}
                unFollowUser={handleUnFollowUser}
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
                        <p>{match.params.username}</p>

                        <div className='message-follow-container'>
                            {profile && profile.following.includes(match.params.id) ?
                                <React.Fragment>
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

                    <MoreHorizIcon
                        onClick={openBlockDialog}
                    />
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

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        followUser: data => dispatch(followUser(data)),
        unFollowUser: data => dispatch(unFollowUser(data)),
        handleViewStory : data => dispatch(handleViewStory(data))
    }
}


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MobileProfile)