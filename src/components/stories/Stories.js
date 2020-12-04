import React, { useState, useEffect, useCallback } from 'react'
//import { Link } from 'react-router-dom'
//import ViewStory from '../../pages/story/ViewStory'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'



import StoryAvatar from '../avatar/StoryAvatar'
import { handleViewStory } from '../../store/actions/AppActions'
// import { db } from '../../firebase/Firebase'
// import { storyData } from './Data'



const Stories = ({ following, users, handleViewStory }) =>{
   
    const [storyUsers, setStoryUsers] = useState(null)
    //let money = you


    const getFollowedUserStories = useCallback(() =>{
    const usersData = []
  
     users && users.forEach(user =>{
           if(following.includes(user.userId) && user.stories && user.stories.length > 0){
               usersData.push(user)
           }
        })
        //console.log(usersData)
        setStoryUsers(usersData)
    }, [ following, users ])
    
    useEffect(() =>{
        getFollowedUserStories()

    }, [ getFollowedUserStories ])

   

    //console.log(storyUsers)
    return(
        <React.Fragment>
            {/* <ViewStory /> */}
            {
                storyUsers && storyUsers.map((user, i) =>{
                    return(
                        <React.Fragment key={user.userId}>
                        <StoryAvatar 
                            src={user.profilePhoto}
                            alt='File'
                            height='74px'
                            width='74px'
                            action={() => handleViewStory(user)}
                        />
                        </React.Fragment>
                    )
                })
            }

        </React.Fragment>
    )
}



const mapStateToProps = state =>{
    return{
        following : state.firebase.profile.following,
        users: state.firestore.ordered.users,
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        handleViewStory : data => dispatch(handleViewStory(data))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['users'])
)(Stories)