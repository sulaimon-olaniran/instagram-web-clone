
const initState = {}


const PostsReducer = (state = initState, action) =>{
     switch (action.type){
          case 'CREATE_POST_SUCCESS' :
               console.log('created posts', action.post)
               return state
          
          case 'CREATE_POST_ERROR' :
               console.log('create project error', action.error)
               return state
          
          case 'LIKED_POST_SUCCESSFUL' :
               console.log('liked post successful')
               return state

          case 'LIKED_POST_FAILED' :
               console.log('liking post failed', action.error)
               return state

          case 'UNLIKE_POST_SUCCESSFUL' :
               console.log('unliked post successful')
               return state

          case 'UNLIKE_POST_FAILED' :
               console.log('unliked post successfully', action.error)
               return state
     
          default : return state
     }
}


export default PostsReducer