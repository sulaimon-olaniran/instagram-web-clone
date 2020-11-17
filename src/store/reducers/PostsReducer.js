
const initState = {}


const PostsReducer = (state = initState, action) =>{
     switch (action.type){
          case 'CREATE_POST' :
               console.log('created posts', action.post)
               return state
          
          case 'CREATE_POST_ERROR' :
               console.log('create project error', action.error)
               return state
          
          default : return state
     }
}


export default PostsReducer