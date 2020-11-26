import React, { useState, useEffect, useCallback } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
//import { db } from '../../firebase/Firebase'


import MobileHome from './mobile/MobileHome'



const Home = ({ users, following, posts }) => {
    const [followingPosts, setFollowingPosts] = useState([])
    const [fetching, setFetching] = useState(true)
    //const [fetching, setFetching] = useState(true)

    //const mountedRef = useRef(true)
    // console.log(users)
    // console.log(posts)


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
        

        //console.log(allPosts)
        // setFollowingPosts(allPosts)
        // setFetching(false)
    }, [posts, following])



    useEffect(() => {
        getAllFollowingPosts()

    }, [getAllFollowingPosts])
    //console.log(followingPosts)

    return (
        <div>
            <MobileHome
                feedPosts={followingPosts}
                fetchingFeedPosts={fetching}
            />
        </div>
    )
}


const mapStateToProps = (state) => {
    //console.log(state)
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