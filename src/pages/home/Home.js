import React, { useState, useEffect, useCallback } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
//import { db } from '../../firebase/Firebase'


import MobileHome from './mobile/MobileHome'
import PcHome from './pc/PcHome'
import LogoLoader from '../../components/loaders/LogoLoader'
import { handleOpenScamWarning } from '../../store/actions/AppActions'



const Home = ({ users, profile, posts, setCurrentPage, unReadMessages, showScamWarning }) => {
    const [followingPosts, setFollowingPosts] = useState(null)

    const sortPostsBasedOnTime = (a, b) =>{
        const comparisonA = a.time
        const comparisonB = b.time

        let comparisonsStatus = 0
        if(comparisonA < comparisonB){
            comparisonsStatus = 1
        }
        else{
            comparisonsStatus = -1
        }

        return comparisonsStatus
    }

    const getAllFollowingPosts = useCallback(() => {

        const allPosts = []
        const promises = profile.isLoaded  && !profile.isEmpty && posts && posts.map(post => {
            return post.userId === profile.userId || profile.following.includes(post.userId) ?
            allPosts.push(post) : null
        
        })


        Promise.all([promises])
        .then(() =>{
            const sortedPosts = allPosts.sort(sortPostsBasedOnTime)
            setFollowingPosts(sortedPosts)
            
        })
        
    }, [posts, profile])



    useEffect(() => {

        showScamWarning()
        getAllFollowingPosts()
        setCurrentPage('home')

    }, [getAllFollowingPosts, setCurrentPage, showScamWarning ])

    if (!profile.isLoaded) return <LogoLoader />

    return (
        <React.Fragment>
            <div className='mobile-home'>
                <MobileHome
                    feedPosts={followingPosts}
                    profile={profile}
                    unReadMessages={unReadMessages}
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
   //console.log(state)
    return {
        users: state.firestore.ordered.users,
        posts: state.firestore.ordered.posts,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        showScamWarning : () => dispatch(handleOpenScamWarning())
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['posts', 'users', 'chats'])
)(Home)