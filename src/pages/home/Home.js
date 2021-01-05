import React, { useState, useEffect, useCallback } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
//import { db } from '../../firebase/Firebase'


import MobileHome from './mobile/MobileHome'
import PcHome from './pc/PcHome'
import LogoLoader from '../../components/loaders/LogoLoader'



const Home = ({ users, profile, posts, setCurrentPage }) => {
    const [followingPosts, setFollowingPosts] = useState(null)



    const getAllFollowingPosts = useCallback(() => {

        const allPosts = []
        const promises = profile.isLoaded  && !profile.isEmpty && posts && posts.map(post => {
            return profile.following.length > 0 && profile.following.includes(post.userId) ?
            allPosts.push(post) : null
        
        })

        Promise.all([promises])
        .then(() =>{
            setFollowingPosts(allPosts)
            
        })
        
    }, [posts, profile])



    useEffect(() => {
        getAllFollowingPosts()
        setCurrentPage('home')

    }, [getAllFollowingPosts, setCurrentPage])

    if (!profile.isLoaded) return <LogoLoader />

    return (
        <React.Fragment>
            <div className='mobile-home'>
                <MobileHome
                    feedPosts={followingPosts}
                    profile={profile}
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
   console.log(state)
    return {
        users: state.firestore.ordered.users,
        posts: state.firestore.ordered.posts,
        profile: state.firebase.profile,
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['posts', 'users', 'chats'])
)(Home)