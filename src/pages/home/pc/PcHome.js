import React from 'react'
import HorizontalScroller from 'react-horizontal-scroll-container'
import PostsFeed from '../../../components/feed/PostsFeed'
import { connect } from 'react-redux'



import RightSection from './right_section/RightSection'
import Suggestions from '../../suggestions/Suggestions'
import { handleCloseProfileCard, handleViewStory } from '../../../store/actions/AppActions'
import StoryAvatar from '../../../components/avatar/StoryAvatar'
import LogoLoader from '../../../components/loaders/LogoLoader'



const PcHome = ({ feedPosts, profile, handleViewStory, storyUsers }) => {

    if (feedPosts !== null && feedPosts.length === 0) return (
        <div className='pc-home-suggestions-container'>
            <Suggestions />
        </div>
    )
    if (!feedPosts) return <LogoLoader />
    return (
        <div className='pc-home-container'>

            <div className='pc-home-contents-container'>
                <RightSection />


                {profile && (profile.stories.length > 0 || storyUsers.length) > 0 ?
                    <div className='pc-home-stories-container'>
                        <HorizontalScroller>
                            {profile && profile.stories.length > 0 &&
                                <StoryAvatar
                                    src={profile && profile.profilePhoto}
                                    height='74px'
                                    width='74px'
                                    action={() => handleViewStory(profile)}
                                />}


                            {storyUsers !== null && storyUsers.length > 0 && storyUsers.map(user => {
                                return (
                                    <StoryAvatar
                                        key={user.userId}
                                        src={user.profilePhoto}
                                        alt='Story_Avatar'
                                        height='74px'
                                        width='74px'
                                        action={() => handleViewStory(user)}
                                    />
                                )
                            })}
                        </HorizontalScroller>
                    </div>

                    : null
                }



                <div className='pc-home-feedposts-container'>
                    <PostsFeed
                        feedPosts={feedPosts}
                    />
                </div>

            </div>

        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        handleCloseProfileCard: () => dispatch(handleCloseProfileCard()),
        handleViewStory: (data) => dispatch(handleViewStory(data))
    }
}


export default connect(null, mapDispatchToProps)(PcHome)