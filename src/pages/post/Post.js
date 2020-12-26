import React, { useState, useEffect, useCallback } from 'react'



import { db } from '../../firebase/Firebase'
import LogoLoader from '../../components/loaders/LogoLoader'
import MobilePost from './mobile/MobilePost'
import PcPost from './pc/PcPost'


const Post = ({ match }) =>{
    const [fetchingPost, setFetchingPost] = useState(true)
    const [post, setPost] = useState({})
    const [posterProfile, setPosterProfile] = useState({})
    const {postId} = match.params
    
    const handleFetchPost = useCallback( () =>{
        db.collection('posts').doc(postId)
        .onSnapshot(snapshot =>{
            setPost(snapshot.data())
            return db.collection('users').doc(snapshot.data().userId)
            .onSnapshot(doc =>{
                setPosterProfile(doc.data())
                setFetchingPost(false)
            })
            //setFetchingPost(false)
        })
    }, [postId])



    useEffect(() =>{
        handleFetchPost()

    }, [handleFetchPost])


    if(fetchingPost) return <LogoLoader />
    return(
        <div className='post-container'>
            <div className='mobile-post'>
                <MobilePost post={post} />
            </div>

            <div className='pc-post'>
                <PcPost post={post} posterProfile={posterProfile} />
            </div>
        </div>
    )
}


export default Post