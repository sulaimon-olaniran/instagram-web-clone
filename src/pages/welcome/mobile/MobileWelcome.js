import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'


import SuggestionsCarousel from '../../../components/sugestions_carousel/SuggestionsCarousel'




const MobileWelcome = ({ users, profile, MobileTopNavigation, unReadMessages }) =>{
    const [suggestedUsers, setSuggestedUsers] = useState([])
    
    const { following, userId } = profile && profile

    useEffect(() =>{
        const usersArray = []
        users && users.forEach(user =>{
            if( user.userId !== userId && userId && following && !following.includes(user.userId)){
                usersArray.push(user)
                //console.log(usersArray)
            }
        })

        setSuggestedUsers(usersArray)
    }, [users, following, userId])


    //console.log(suggestedUsers)

    return(
        <div className='mobile-welcome-page-container'>
            <MobileTopNavigation unReadMessages={unReadMessages} />
            <h1>Welcome to Instagram</h1>
            <p>
                When you follow people, you'll see the 
                photos and videos they post here.
            </p>
            
            <SuggestionsCarousel 
                users={suggestedUsers}
            />

        </div>
    )
}


const mapStateToProps = (state) => {
    //console.log(state.firestore)
    return {
        users: state.firestore.ordered.users,
        profile: state.firebase.profile
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(MobileWelcome)
