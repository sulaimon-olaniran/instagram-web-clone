import React, { useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
//import { db } from '../../firebase/Firebase'


import MobileHome from './mobile/MobileHome'
import PcHome from './pc/PcHome'
import LogoLoader from '../../components/loaders/LogoLoader'
import { handleOpenScamWarning } from '../../store/actions/AppActions'



const Home = ({ users, profile, posts, setCurrentPage, unReadMessages, showScamWarning }) => {

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


    const filterOutFeedPosts = (data) =>{
        return(
            profile.following.includes(data.userId) || profile.userId === data.userId
        ) 
    }


    const filterOutUserWithStories = (data) =>{
        return(
            profile.following.includes(data.userId) && data.stories.length > 0
        )
    }



    useEffect(() => {

        showScamWarning()
        setCurrentPage()

    }, [showScamWarning, setCurrentPage])

    if (posts === undefined || profile.isLoaded === false || users === undefined) return <LogoLoader />
    return (
        <React.Fragment>
            <div className='mobile-home'>
                <MobileHome
                    feedPosts={posts.filter(filterOutFeedPosts).sort(sortPostsBasedOnTime)}
                    profile={profile}
                    unReadMessages={unReadMessages}
                    storyUsers={users.filter(filterOutUserWithStories)}
                />
            </div>
            
            <div className='pc-home'>
                <PcHome  
                    feedPosts={posts.filter(filterOutFeedPosts).sort(sortPostsBasedOnTime)}
                    profile={profile}
                    storyUsers={users.filter(filterOutUserWithStories)}
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