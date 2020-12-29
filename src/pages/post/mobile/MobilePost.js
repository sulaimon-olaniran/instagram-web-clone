import React from 'react'
import { withRouter } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'


//import { feedPosts } from '../../home/FakeData'
import EachPostFeed from '../../../components/feed/each_feed/EachPostFeed'


const MobilePost = ({ post, history }) =>{
    return(
        <div className='post-page-container'>
            
            <div className='post-nav-container'>
                   <ArrowBackIosIcon onClick={() => history.goBack()} />
                   <p>Photo</p>
            </div>
            <EachPostFeed post={post} />
        </div>
    )
}


export default withRouter(MobilePost)