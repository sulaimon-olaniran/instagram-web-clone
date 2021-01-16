import React, { useRef, useState } from 'react'
import useDoubleClick from 'use-double-click'






const FeedImage = ({ imageSource, handleLikePost, postStyle, post, profile }) => {
    const buttonRef = useRef(null)
    const [showHeart, setShowHeart] = useState(null)

    const handleLikePostFunction = () =>{
        if(profile && profile.likedPosts.includes(post && post.postId)){
            setShowHeart('show-heart')
        }
        else{
            handleLikePost()
            setShowHeart('show-heart')
        }
        //console.log('hello world')
    }

    useDoubleClick({
        onSingleClick: e => {
            console.log(e, 'single click');
        },
        onDoubleClick: e => {
            handleLikePostFunction()
        },
        ref: buttonRef,
        latency: 300
    })

    showHeart === 'show-heart' && setTimeout(() =>{
        setShowHeart('hide-heart')
    }, [2000])
    return (
        <div className='feed-image-file-container'>
            <img
                src={imageSource}
                alt='file'
                ref={buttonRef}
                style={postStyle}
            />

            <div 
                className={`instagram-liked-heart ${showHeart}`}
            />
        </div>
    )
}


export default FeedImage