import React, { useState, useEffect } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'


import { feedPosts } from '../../home/FakeData'
import EachPostFeed from '../../../components/feed/each_feed/EachPostFeed'


const MobilePost = ({ match }) =>{
    const [post, setPost] = useState(null)
    
    //console.log(match)

    useEffect(() =>{
        feedPosts.forEach((post)=>{
            if(match.params.postId === post.postId){
                setPost(post)
            }
        })
    }, [match.params.postId])


    return(
        <div className='post-page-container'>
            
            <div className='post-nav-container'>
                   <ArrowBackIosIcon />
                   <p>Photo</p>
            </div>
            <EachPostFeed post={post} />
        </div>
    )
}


export default MobilePost