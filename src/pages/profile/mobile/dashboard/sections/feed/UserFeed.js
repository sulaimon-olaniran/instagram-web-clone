import React from 'react'


import PostsFeed from '../../../../../../components/feed/PostsFeed'
import { feedPosts } from '../../../../../home/FakeData'


const UserFeed = () =>{
    return(
        <PostsFeed feedPosts={feedPosts} />
    )
}


export default UserFeed