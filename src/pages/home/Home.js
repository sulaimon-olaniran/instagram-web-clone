import React, { useState, useEffect, useCallback } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { db } from '../../firebase/Firebase'


import MobileHome from './mobile/MobileHome'



const Home = ({ users, following }) => {
    const [followingPosts, setFollowingPosts] = useState([])
    //const [fetching, setFetching] = useState(true)

    //const mountedRef = useRef(true)
    //console.log(following)

    const concatAllFollowingPosts = useCallback(() => {

        users && users.forEach(user => {
            if (following.includes(user.userId)) {

                db.collection('users').doc(user.userId)
                    .collection('posts').onSnapshot(snapshot => {
                        // if (!mountedRef.current) return null
                        const posts = []
                        snapshot.forEach(doc => {
                            const data = doc.data()
                            posts.push(data)
                        })
                        setFollowingPosts(prev => prev.concat(posts))
                    })
            }

        })
    }, [users, following])



    useEffect(() => {
        concatAllFollowingPosts()

        return () => {
            //mountedRef.current = false
        }
    }, [concatAllFollowingPosts])


    return (
        <div>
            <MobileHome
                feedPosts={followingPosts}
            />
        </div>
    )
}


const mapStateToProps = (state) => {
    //console.log(state.firestore)
    return {
        users: state.firestore.ordered.users,
        following: state.firebase.profile.following
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Home)