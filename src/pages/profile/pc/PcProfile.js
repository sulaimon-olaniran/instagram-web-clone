import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import CheckIcon from '@material-ui/icons/Check'
//import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'




import StoryAvatar from '../../../components/avatar/StoryAvatar'
import DashBoard from '../mobile/dashboard/DashBoard'
import FollowersButton from './follow/FollowersButton'
import FollowingsButton from './follow/FollowingButton'




const useStyles = makeStyles((theme) => ({
    xLarge: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },

    tiny: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    },

    followButton : {
        backgroundColor : '#0095f6',
        marginRight : '10px',
        marginLeft : '15px',
    },

    messageButton : {
        marginRight : '10px',
        marginLeft : '15px',
        height : '30px'
    },

    unFollowButton : {
        marginRight : '10px',
        height : '30px'
    }
}))



const PcProfile = ({ profile, userProfile, userPosts, handleViewStory, handleFollowUser, openUnFollowDialog, openBlockDialog }) => {
    const classes = useStyles()



    return (
        <div className='pc-profile-container'>

            <div className='user-information-container'>
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

                        <FollowersButton
                            userProfile={userProfile}
                        />

                        <FollowingsButton
                            userProfile={userProfile}
                        />
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



            <DashBoard
                posts={userPosts && userPosts}
                user={userProfile && userProfile}
                from='profile'
            />
            

        </div>
    )
}


export default PcProfile