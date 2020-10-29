import React from 'react'
import EachPostFeed from './each_feed/EachPostFeed'




const PostsFeed = ({ feedPosts }) =>{
    return(
        <div className='posts-feed-container'>
            {
                feedPosts.map((post, id) =>{
                    return(
                        <React.Fragment key={id}>
                           <EachPostFeed post={post}/>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}


export default PostsFeed