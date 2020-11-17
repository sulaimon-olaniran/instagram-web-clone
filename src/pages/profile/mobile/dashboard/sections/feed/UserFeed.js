import React from 'react'


import PostsFeed from '../../../../../../components/feed/PostsFeed'
import NoPost from '../posts/no_posts/NoPost'
//import { feedPosts } from '../../../../../home/FakeData'


const UserFeed = ({ posts, from, user }) =>{
    if(!posts.length > 0) return <NoPost from={from} user={user}/>
    return(
        <PostsFeed feedPosts={posts} />
    )
}


export default UserFeed