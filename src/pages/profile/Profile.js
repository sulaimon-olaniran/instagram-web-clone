import React, { useState, useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


import MobileProfile from './mobile/MobileProfile'
import { db } from '../../firebase/Firebase'
import LogoLoader from '../../components/loaders/LogoLoader'
import { followUser, unFollowUser } from '../../store/actions/ProfileActions'
import { handleViewStory } from '../../store/actions/AppActions'
import PcProfile from './pc/PcProfile'
import UnFollowDialog from './actions/unfollow/UnFollow'
import BlockReportRestrictDialog from './actions/brr-dialog/BRRDialog'


const Profile = ({ match, auth, posts, profile, followUser, unFollowUser, handleViewStory }) =>{
    const [fetchingData, setFetchingData] = useState(true)
    const [userProfile, setUserProfile] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [unfollowDialog, setUnfollowDialog] = useState(false)
    const [blockDialog, setBlockDialog] = useState(false)



    const getUserProfileData = useCallback(() => {
        const userId = match.params.id
        const allPosts = []
        db.collection('users').doc(userId)
            .onSnapshot(snapshot => {
                setUserProfile(snapshot.data())
                //console.log(snapshot.data())
                posts && posts.forEach(post => {
                    if (post.userId === userId) {
                        allPosts.push(post)
                    }
                })
                setUserPosts(allPosts)
                setFetchingData(false)
            })
    }, [match, posts])


    useEffect(() => {
        getUserProfileData()
        
    }, [getUserProfileData])


    const handleFollowUser = () => {
        const data = {
            accountId: userProfile.userId,
            userId: auth.uid,
        }

        followUser(data)
    }

    const handleUnFollowUser = () => {
        const data = {
            accountId: userProfile.userId,
            userId: auth.uid
        }

        unFollowUser(data)
    }


    const openUnFollowDialog = () => {
        setUnfollowDialog(true)
    }

    const openBlockDialog = () => {
        setBlockDialog(true)
    }

    const handleCloseDialog = () => {
        setUnfollowDialog(false)
        setBlockDialog(false)
    }



    if(!auth.uid) return <Redirect to='/' />
    if (fetchingData) return <LogoLoader />
    return(
        <React.Fragment>

            <UnFollowDialog
                openDialog={unfollowDialog}
                handleCloseDialog={handleCloseDialog}
                unFollowUser={handleUnFollowUser}
                userProfile={userProfile && userProfile}
            />

            <BlockReportRestrictDialog
                openDialog={blockDialog}
                handleCloseDialog={handleCloseDialog}
                userProfile={userProfile && userProfile}
            />

            <div className='mobile-profile'>
                <MobileProfile 
                    userProfile={userProfile}
                    userPosts={userPosts}
                    handleViewStory={handleViewStory}
                    handleFollowUser={handleFollowUser}
                    handleUnFollowUser={handleUnFollowUser}
                    profile={profile}
                    openUnFollowDialog={openUnFollowDialog}
                    openBlockDialog={openBlockDialog}
                />
            </div>

            <div className='pc-profile'>
                <PcProfile
                    userProfile={userProfile}
                    userPosts={userPosts}
                    handleViewStory={handleViewStory}
                    handleFollowUser={handleFollowUser}
                    handleUnFollowUser={handleUnFollowUser}
                    profile={profile}
                    openUnFollowDialog={openUnFollowDialog}
                    openBlockDialog={openBlockDialog}
                />
            </div>

        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return{
        profile: state.firebase.profile,
        auth : state.firebase.auth,
        posts: state.firestore.ordered.posts,
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        followUser: data => dispatch(followUser(data)),
        unFollowUser: data => dispatch(unFollowUser(data)),
        handleViewStory : data => dispatch(handleViewStory(data))
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['posts'])
)(Profile)
