
const initState = {}


const PostsReducer = (state = initState, action) =>{
     switch (action.type){
          case 'CREATE_POST_SUCCESS' :
               console.log('created posts', action.post)
               return state
          
          case 'CREATE_POST_ERROR' :
               console.log('create project error', action.error)
               return state

          case 'POST_DELETED_SUCCESSFULLY' :
               console.log('deleted post successfully')
               return state

          case 'POST_DELETE_FAILED' :
               console.log('deleting post failed', action.error)
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
               console.log('unliked post failed', action.error)
               return state
///
          case 'SAVED_POST_SUCCESSFULLY' :
               console.log('saved post successfully')
               return state

          case 'SAVE_POST_FAILED' :
               console.log('saving post failed', action.error)
               return state

          case 'UNSAVED_POST_SUCCESSFULLY' :
               console.log('unsaved post successfully')
               return state

          case 'UNSAVE_POST_FAILED' :
               console.log('unsaving post failed', action.error)
               return state

          case 'COMMENT_SUCCESSFUL' :
               console.log('commented on post successfully')
               return state

          case 'COMMENT_FAILED' :
               console.log('commented on post failed')
               return state

          case 'COMMENT_DELETE_SUCCESS' :
               console.log('comment deleted successfully')
               return state

          case 'COMMENT_DELETE_FAILED' :
               console.log('comment deleting failed')
               return state

          case 'LIKED_COMMENT_SUCCESS' :
               console.log('comment liked successfully')
               return state

          case 'LIKED_COMMENT_FAILED' :
               console.log('liking comment failed', action.error)
               return state

          case 'UNLIKE_COMMENT_SUCCESS' :
               console.log('comment un-liked successfully')
               return state

          case 'UNLIKE_COMMENT_FAILED' :
               console.log('un-liking comment failed')
               return state
     
          default : return state
     }
}


export default PostsReducer