import React, { useEffect, useCallback, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'




import MobileUserAccount from './mobile/MobileUserAccount'
import LogoLoader from '../../components/loaders/LogoLoader'
import PcUserAccount from './pc/PcUserAccount'
import { handleOpenScamWarning } from '../../store/actions/AppActions'


const UserAccount = ({ auth, posts, profile, setCurrentPage, showScamWarning }) =>{
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
        showScamWarning()
        getUserPosts()
        
    }, [ setCurrentPage, getUserPosts, showScamWarning])



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


const mapDispatchToProps = dispatch =>{
    return{
        showScamWarning : () => dispatch(handleOpenScamWarning())
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['posts'])
)(UserAccount)

//export default connect(mapStateToProps)(UserAccount)