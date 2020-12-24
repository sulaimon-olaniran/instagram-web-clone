import React, { useEffect, useCallback, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'




import MobileUserAccount from './mobile/MobileUserAccount'
import LogoLoader from '../../components/loaders/LogoLoader'
import PcUserAccount from './pc/PcUserAccount'


const UserAccount = ({ auth, posts, profile, setCurrentPage }) =>{
    const [userPosts, setUserPosts] = useState([])


    const getUserPosts = useCallback(() =>{
        const allPosts = []
        posts && posts.forEach(post =>{
            if(post.userId === auth.uid){
                allPosts.push(post)
            }
        })

        setUserPosts(allPosts)
    }, [auth, posts])


    
    useEffect(() =>{
        setCurrentPage('')
        getUserPosts()
        
    }, [ setCurrentPage, getUserPosts])



    if(!auth.uid) return <Redirect to='/' />
    if(profile.isLoaded === false) return <LogoLoader />
    return(
        <React.Fragment>
            <div className='mobile-user-account'>
                <MobileUserAccount 
                    userPosts={userPosts}
                    userData={profile && profile}
                />
            </div>

            <div className='pc-user-account'>
                <PcUserAccount
                    userPosts={userPosts}
                    userData={profile && profile}
                />
            </div>

        </React.Fragment>
    )
}


const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth,
        profile: state.firebase.profile,
        posts: state.firestore.ordered.posts,
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['posts'])
)(UserAccount)

//export default connect(mapStateToProps)(UserAccount)