import React, { useState, useEffect, useCallback } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
//import { db } from '../../firebase/Firebase'


import MobileHome from './mobile/MobileHome'
import PcHome from './pc/PcHome'



const Home = ({ users, following, posts, setCurrentPage }) => {
    const [followingPosts, setFollowingPosts] = useState([])
    const [fetching, setFetching] = useState(true)


    const getAllFollowingPosts = useCallback(() => {

        const allPosts = []
        const promises = posts && posts.map(post => {
            return following.length > 0 && following.includes(post.userId) ?
            allPosts.push(post) : null
        
        })

        Promise.all([promises])
        .then(() =>{
            setFollowingPosts(allPosts)
            setFetching(false)
        })
        
    }, [posts, following])



    useEffect(() => {
        getAllFollowingPosts()
        setCurrentPage('home')

    }, [getAllFollowingPosts, setCurrentPage])

    return (
        <React.Fragment>
            <div className='mobile-home'>
                <MobileHome
                    feedPosts={followingPosts}
                    fetchingFeedPosts={fetching}
                />
            </div>
            
            <div className='pc-home'>
                <PcHome  
                    feedPosts={followingPosts}
                />
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        posts: state.firestore.ordered.posts,
        following: state.firebase.profile.following
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['posts', 'users'])
)(Home)