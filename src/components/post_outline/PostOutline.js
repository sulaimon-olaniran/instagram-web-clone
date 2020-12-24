import React, { useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'




import { LikedIcon, CommentIcon } from '../MyIcons'
import { db } from '../../firebase/Firebase'



const PostOutline = ({ post }) =>{
    const [postComments, setPostComments] = useState([])

    const getPostComments = useCallback(() =>{
        db.collection('posts').doc(post && post.postId)
        .collection('comments').orderBy('time', 'desc')
        .onSnapshot(snapshot =>{
            const comments = []
            snapshot.forEach(doc =>{
                comments.push(doc.data())
            })
            setPostComments(comments)
        })

    }, [post])



    useEffect(() => {
        getPostComments()

    }, [ getPostComments])

    console.log('arrived at outline post')
    console.log(post)



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

            <img src={post.fileUrl} alt='file' />

        </Link>

    )
}



export default PostOutline