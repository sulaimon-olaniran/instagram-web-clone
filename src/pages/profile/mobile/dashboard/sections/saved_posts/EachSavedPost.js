import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'



import { db } from '../../../../../../firebase/Firebase'


const EachSavedPost = ({ savedPost }) => {
    const [post, setPost] = useState({})


    const getPostData = useCallback(() => {
        return db.collection('posts').doc(savedPost)
            .onSnapshot(snapshot => {
                setPost(snapshot.data())
            })

    }, [savedPost])

    useEffect(() => {
        getPostData()

    }, [getPostData])


    return (
            <Link to={`/p/${post && post.postId}/`}>
                <img src={post && post.fileUrl} alt='FILE' />
            </Link>
    )
}


export default EachSavedPost