import React from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { makeStyles } from '@material-ui/core/styles'
import HorizontalScroller from 'react-horizontal-scroll-container'
import { connect } from 'react-redux'


import instagram_text_logo from '../../assets/instagram_text_logo.png'
import { MyDirectIcon, MyCameraIcon } from '../../../components/MyIcons'
//import Posts from './posts/Posts'
//import StoryAvatar from '../../../components/avatar/StoryAvatar'
import Stories from '../../../components/stories/Stories'
//import { feedPosts } from '../FakeData'
import PostsFeed from '../../../components/feed/PostsFeed'
import CreateButton from '../../../components/create_story/CreateButton'
import MobileWelcome from '../../welcome/mobile/MobileWelcome'
import LogoLoader from '../../../components/loaders/LogoLoader'
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


const MobileHome = ({ feedPosts, fetchingFeedPosts, profile, handleViewStory }) => {
    const classes = useStyles()
    //console.log(users)
    if (fetchingFeedPosts) return <LogoLoader />
    return (
        <div className='mobile-home-container'>

            <div className='top-navigation-container'>
                <CreateButton 
                    component={<MyCameraIcon height='24px' width='24px' />} 
                />

                <img src={instagram_text_logo} alt="INSTAGRAM" />

                <Badge badgeContent={4} color="secondary">
                    <MyDirectIcon
                        height='24px'
                        width='24px'
                    />
                </Badge>
            </div>

            
            {!fetchingFeedPosts && feedPosts.length > 0 ?
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


                            <Stories />

                        </HorizontalScroller>
                    </div>

                    <div className='main-contents-container'>
                        <PostsFeed feedPosts={feedPosts} />
                    </div>
                </React.Fragment>
                :
                <MobileWelcome />
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.feedPosts,
        profile : state.firebase.profile
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        handleViewStory : (data) => dispatch(handleViewStory(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileHome)