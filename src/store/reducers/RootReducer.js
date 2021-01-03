import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import AuthReducer from './AuthReducer'
import PostsReducer from './PostsReducer'
import ProfileReducer from './ProfileReducer'
import AppReducer from './AppReducer'
import StoryReducer from './StoryReducer'
import MessengerReducer from './MessengerReducer'



const RootReducer = combineReducers({
    auth : AuthReducer,
    posts : PostsReducer,
    story : StoryReducer,
    profile : ProfileReducer,
    application : AppReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer,
    messenger : MessengerReducer,
})



export default RootReducer



