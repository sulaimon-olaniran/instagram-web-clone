import React from 'react'
import HorizontalScroller from 'react-horizontal-scroll-container'
import PostsFeed from '../../../components/feed/PostsFeed'
import { connect } from 'react-redux'



//import TopPcNav from '../../../components/navbar/top_nav/TopPcNav'
import Stories from '../../../components/stories/Stories'
import RightSection from './right_section/RightSection'
import Suggestions from '../../suggestions/Suggestions'
import { handleCloseProfileCard } from '../../../store/actions/AppActions'



const PcHome = ({ feedPosts }) => {
    //const feedPosts = []


    if(feedPosts !== null && feedPosts.length === 0) return (
        <div className='pc-home-suggestions-container'>
            <Suggestions />
        </div>
    )
    return(
        <div className='pc-home-container'>
            
            <div className='pc-home-contents-container'>
                <RightSection />
                <div className='pc-home-stories-container'>
                    <HorizontalScroller>
                        <Stories />
                    </HorizontalScroller>
                </div>

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
    }
}


export default connect(null, mapDispatchToProps)(PcHome)