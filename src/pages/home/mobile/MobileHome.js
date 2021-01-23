import React from 'react'
import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { makeStyles } from '@material-ui/core/styles'
import HorizontalScroller from 'react-horizontal-scroll-container'
import { connect } from 'react-redux'


import instagram_text_logo from '../../assets/instagram_text_logo.png'
import { MyDirectIcon, MyCameraIcon } from '../../../components/MyIcons'
//import Stories from '../../../components/stories/Stories'
import PostsFeed from '../../../components/feed/PostsFeed'
import CreateButton from '../../../components/create_story/CreateButton'
import MobileWelcome from '../../welcome/mobile/MobileWelcome'
import StoryAvatar from '../../../components/avatar/StoryAvatar'
import { handleViewStory } from '../../../store/actions/AppActions'

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginLeft: '10px'
    },
}));



const MobileTopNavigation = ({ unReadMessages }) => {
    return (

        <div className='top-navigation-container'>
            <CreateButton
                component={<MyCameraIcon height='24px' width='24px' />}
            />

            <img src={instagram_text_logo} alt="INSTAGRAM" />
            <Link to='/direct/inbox'>
                {unReadMessages.length > 0 ?
                    <Badge
                        badgeContent={unReadMessages.length}
                        color="secondary"
                    >
                        <MyDirectIcon
                            height='24px'
                            width='24px'
                        />
                    </Badge>
                    :
                    <MyDirectIcon
                        height='24px'
                        width='24px'
                    />
                }
            </Link>
        </div>

    )
}




const MobileHome = ({ feedPosts, profile, handleViewStory, unReadMessages, storyUsers }) => {

    const classes = useStyles()


    if (feedPosts !== null && feedPosts.length === 0) return (
        <MobileWelcome 
            MobileTopNavigation={MobileTopNavigation} 
            unReadMessages={unReadMessages} 
        />
    )
    return (
        <div className='mobile-home-container'>

            <MobileTopNavigation unReadMessages={unReadMessages} />

            <React.Fragment>
                <div className='stories-container'>
                    <HorizontalScroller>

                        {profile && profile.stories && !profile.stories.length > 0 ?
                            <CreateButton
                                component={
                                    <Badge
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        badgeContent={<AddCircleIcon color='primary' fontSize='small' />}
                                    >
                                        <Avatar
                                            src={profile && profile.profilePhoto}
                                            className={classes.large}
                                        />
                                    </Badge>
                                }
                            />
                            :
                            <div className='user-story-container'>
                                <StoryAvatar
                                    src={profile && profile.profilePhoto}
                                    height='70px'
                                    width='70px'
                                    action={() => handleViewStory(profile)}
                                />
                                <small>Your Story</small>
                            </div>
                        }

                        {storyUsers.length > 0 && storyUsers.map(user =>{
                            return(
                                <StoryAvatar
                                    key={user.userId}
                                    src={user.profilePhoto}
                                    height='74px'
                                    width='74px'
                                    action={() => handleViewStory(user)}
                                />
                            )
                        })}


                    </HorizontalScroller>
                </div>

                <div className='main-contents-container'>
                    <PostsFeed feedPosts={feedPosts} />
                </div>
            </React.Fragment>


        </div>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        handleViewStory: (data) => dispatch(handleViewStory(data))
    }
}

export default connect(null, mapDispatchToProps)(MobileHome)