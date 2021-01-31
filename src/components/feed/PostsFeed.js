import React from 'react'
import EachPostFeed from './each_feed/EachPostFeed'



const PostsFeed = ({ feedPosts }) =>{

    return(
        <div className='posts-feed-container'>
            {
                feedPosts && feedPosts.map( post =>{
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