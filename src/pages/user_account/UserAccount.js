import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'




import MobileUserAccount from './mobile/MobileUserAccount'
import LogoLoader from '../../components/loaders/LogoLoader'
import PcUserAccount from './pc/PcUserAccount'
import { handleOpenScamWarning } from '../../store/actions/AppActions'


const UserAccount = ({ auth, posts, profile, setCurrentPage, showScamWarning }) =>{
 
    
    useEffect(() =>{
        setCurrentPage('')
        showScamWarning()
        
    }, [ setCurrentPage, showScamWarning])



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

    const filterOutUserPosts = (data) =>{
        return(
            profile.userId === data.userId
        ) 
    }




    if(!auth.uid) return <Redirect to='/' />
    if(profile.isLoaded === false || posts === undefined) return <LogoLoader />
    return(
        <React.Fragment>
            <div className='mobile-user-account'>
                <MobileUserAccount 
                    userPosts={posts.filter(filterOutUserPosts).sort(sortPostsBasedOnTime)}
                    userData={profile && profile}
                />
            </div>

            <div className='pc-user-account'>
                <PcUserAccount
                    userPosts={posts.filter(filterOutUserPosts).sort(sortPostsBasedOnTime)}
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