import { combineReducers } from 'redux'


import AuthReducer from './AuthReducer'
import PostsReducer from './PostsReducer'




const RootReducer = combineReducers({
    auth : AuthReducer,
    posts : PostsReducer
})



export default RootReducer



