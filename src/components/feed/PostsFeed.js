import React from 'react'
import EachPostFeed from './each_feed/EachPostFeed'



const PostsFeed = ({ feedPosts }) =>{
    
    const uniqueFeedPosts = feedPosts && Array.from(new Set(feedPosts.map(a => a.postId)))
    .map(id =>{
        return feedPosts.find(a => a.postId === id)
    })
    //const filteredFeedPosts = feedPosts && feedPosts.forEach()

    return(
        <div className='posts-feed-container'>
            {
                uniqueFeedPosts && uniqueFeedPosts.map( post =>{
                    return(
                        <React.Fragment key={post.postId}>
                           <EachPostFeed post={post}/>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}


export default PostsFeed