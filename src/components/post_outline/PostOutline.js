import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'




import { LikedIcon, CommentIcon } from '../MyIcons'
import { db } from '../../firebase/Firebase'



const PostOutline = ({ post }) =>{
    const [postComments, setPostComments] = useState([])

    const mountedRef = useRef(true)

    const getPostComments = useCallback(() =>{
        db.collection('posts').doc(post && post.postId)
        .collection('comments').orderBy('time', 'desc')
        .onSnapshot(snapshot =>{
            if (!mountedRef.current) return null
            const comments = []
            snapshot.forEach(doc =>{
                comments.push(doc.data())
            })
            setPostComments(comments)
        })

    }, [post])



    useEffect(() => {
        getPostComments()

        return () => {
            mountedRef.current = false
        }

    }, [ getPostComments])



    if (!mountedRef.current) return null
    return(
        <Link
            to={`/p/${post.postId}`}
            className='post-outline-container'
            key={post.postId}
        >
            <div className='content-overlay'></div>

            <div className='post-overlay-details fadeIn-top'>
                <div>
                    <LikedIcon width='24px' height='24px' fill='white' />
                    <p>{post && post.likes.length}</p>
                </div>

                <div>
                    <CommentIcon width='24px' height='24px' fill='white' />
                    <p>{postComments.length}</p>
                </div>
            </div>

            <img src={post.fileUrl} alt='file' style={post.imageStyle && post.imageStyle} />

        </Link>

    )
}



export default PostOutline