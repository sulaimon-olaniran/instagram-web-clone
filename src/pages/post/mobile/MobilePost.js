import React, { useState, useEffect, useCallback } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'


//import { feedPosts } from '../../home/FakeData'
import EachPostFeed from '../../../components/feed/each_feed/EachPostFeed'
import { db } from '../../../firebase/Firebase'
import LogoLoader from '../../../components/loaders/LogoLoader'


const MobilePost = ({ match, history }) =>{
    const [fetching, setFetching] = useState(true)
    const [post, setPost] = useState({})
    const {postId, posterId} = match.params
    
    const handleFetchPost = useCallback( () =>{
        db.collection('users').doc(posterId)
        .collection('posts').doc(postId)
        .onSnapshot(snapshot =>{
            setPost(snapshot.data())
            setFetching(false)
        })
    }, [postId, posterId])

    useEffect(() =>{
        handleFetchPost()

    }, [handleFetchPost])


    if(fetching) return <LogoLoader />
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


export default MobilePost