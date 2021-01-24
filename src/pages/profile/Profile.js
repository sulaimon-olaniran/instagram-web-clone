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
import { openChatBoard, selectUserToChatWith } from '../../store/actions/MessengerAction'
import { handleOpenScamWarning } from '../../store/actions/AppActions'
import PcProfile from './pc/PcProfile'
import UnFollowDialog from './actions/unfollow/UnFollow'
import BlockReportRestrictDialog from './actions/brr-dialog/BRRDialog'


const Profile = ({ match, auth, posts, profile, followUser, unFollowUser, handleViewStory, selectChatUser, openChatBoard, showScamWarning }) =>{
    const [fetchingData, setFetchingData] = useState(true)
    const [userProfile, setUserProfile] = useState({})
    const [unfollowDialog, setUnfollowDialog] = useState(false)
    const [blockDialog, setBlockDialog] = useState(false)



    const getUserProfileData = useCallback(() => {
        const userId = match.params.id
        
        db.collection('users').doc(userId)
            .onSnapshot(snapshot => {
                setUserProfile(snapshot.data())
                setFetchingData(false)
            })
    }, [match])




    useEffect(() => {
        getUserProfileData()
        showScamWarning()
        
    }, [getUserProfileData, showScamWarning])


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
            match.params.id === data.userId
        ) 
    }



    if(!auth.uid) return <Redirect to='/' />
    if (fetchingData || posts === undefined ) return <LogoLoader />
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
                    userPosts={posts.filter(filterOutUserPosts).sort(sortPostsBasedOnTime)}
                    handleViewStory={handleViewStory}
                    handleFollowUser={handleFollowUser}
                    handleUnFollowUser={handleUnFollowUser}
                    profile={profile}
                    openUnFollowDialog={openUnFollowDialog}
                    openBlockDialog={openBlockDialog}
                    openChatBoard={openChatBoard}
                />
            </div>

            <div className='pc-profile'>
                <PcProfile
                    userProfile={userProfile}
                    userPosts={posts.filter(filterOutUserPosts).sort(sortPostsBasedOnTime)}
                    handleViewStory={handleViewStory}
                    handleFollowUser={handleFollowUser}
                    handleUnFollowUser={handleUnFollowUser}
                    profile={profile}
                    openUnFollowDialog={openUnFollowDialog}
                    openBlockDialog={openBlockDialog}
                    selectChatUser={selectChatUser}
                />
            </div>

        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    console.log(state)
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
        handleViewStory : data => dispatch(handleViewStory(data)),
        openChatBoard : user => dispatch(openChatBoard(user)),
        selectChatUser : user => dispatch(selectUserToChatWith(user)),
        showScamWarning : () => dispatch(handleOpenScamWarning())
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['posts'])
)(Profile)
