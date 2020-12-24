import React from 'react'
import HorizontalScroller from 'react-horizontal-scroll-container'
import PostsFeed from '../../../components/feed/PostsFeed'
import { connect } from 'react-redux'



//import TopPcNav from '../../../components/navbar/top_nav/TopPcNav'
import Stories from '../../../components/stories/Stories'
import RightSection from './right_section/RightSection'
import { handleCloseProfileCard } from '../../../store/actions/AppActions'




const PcHome = ({ feedPosts, handleCloseProfileCard}) => {
    return(
        <div className='pc-home-container' onMouseEnter={() => console.log('hoody hoo')}>
            
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