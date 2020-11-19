import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import AuthReducer from './AuthReducer'
import PostsReducer from './PostsReducer'
import ProfileReducer from './ProfileReducer'




const RootReducer = combineReducers({
    auth : AuthReducer,
    posts : PostsReducer,
    profile : ProfileReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer
})



export default RootReducer



