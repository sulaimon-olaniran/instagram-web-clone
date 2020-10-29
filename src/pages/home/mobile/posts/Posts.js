import React from 'react'



import { feedPosts } from '../../FakeData'
import EachPost from './each_post/EachPost'



const Posts = () => {
    //console.log(feedPosts)
    return (
        <div className='posts-container'>
            {
                feedPosts.map((post, id) =>{
                    return(
                        <React.Fragment key={id}>
                           <EachPost post={post}/>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default Posts