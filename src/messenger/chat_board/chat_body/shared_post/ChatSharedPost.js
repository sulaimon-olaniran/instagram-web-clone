import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React, { useState, useCallback, useEffect } from 'react'



import { db } from '../../../../firebase/Firebase'



const ChatSharedPost = ({ postId }) =>{
    const [post, setPost] = useState({})
    const [poster, setPoster] = useState({})
    const [fetching, setFetching] = useState(true)


    const handleFetcherPostAndPosterDetails = useCallback(() =>{
            db.collection('posts').doc(postId).get()
            .then((doc) =>{
                const postDoc = doc.data()
                setPost(postDoc)

                return db.collection('users').doc(postDoc.userId).get()
                .then(doc =>{
                    setPoster(doc.data())
                })

            })
            .then(() =>{
                setFetching(false)
            })
    }, [ postId ])



    useEffect(() => {
       handleFetcherPostAndPosterDetails()

    }, [ handleFetcherPostAndPosterDetails ])

    if(fetching) return <div className='chat-shared-post-container loading' />
    return(
        <div className='chat-shared-post-container'>

            <div className='chat-shared-post-top-section'>
                <Link to={`/profile/${poster && poster.userName}/${poster && poster.userId}`}>
                    <Avatar src={poster && poster.profilePhoto} />
                </Link>
                
                <Link to={`/profile/${poster && poster.userName}/${poster && poster.userId}`}>
                    <p>{poster && poster.userName}</p>
                </Link>
            </div>

            <Link 
                className='chat-shared-post-image-container'
                to={`/p/${postId && postId}`}
            >
                <img src={post && post.fileUrl} alt='post-file' />
            </Link>

            <div className='chat-shared-post-bottom-section'>
                <p>{poster && poster.userName} <span>{post && post.caption}</span></p>
            </div>

        </div>
    )
}


export default ChatSharedPost