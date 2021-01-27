import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'


import SuggestionsCarousel from '../../../components/sugestions_carousel/SuggestionsCarousel'




const MobileWelcome = ({ users, profile, MobileTopNavigation, unReadMessages }) =>{
   
    const filterOutSuggestedUsers = (data) =>{
        return(
           profile && !profile.following.includes(data.userId) && profile.userId !== data.userId
        )
    }

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }


    const suggestedUsers = users && users.filter(filterOutSuggestedUsers) 

    const shuffledSuggestedUsers = suggestedUsers && shuffleArray(suggestedUsers)




    return(
        <div className='mobile-welcome-page-container'>
            <MobileTopNavigation unReadMessages={unReadMessages} />
            <h1>Welcome to Instagram</h1>
            <p>
                When you follow people, you'll see the 
                photos and videos they post here.
            </p>
            
            <SuggestionsCarousel 
                users={shuffledSuggestedUsers}
            />

        </div>
    )
}


const mapStateToProps = (state) => {
    
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
