const initState = {
     sharedPostSnackBar : false,
     createPostModal : false,
     fileUrl : null,
     filePreviewUrl : null,
     creatingPost : false,
     createPostSnackbar : false,
     snackBarText : '',
}


const PostsReducer = (state = initState, action) =>{
     switch (action.type){


          case 'OPEN_CREATE_POST' :
               
               return {
                    ...state,
                    createPostModal : true,
                    fileUrl : action.data.fileUrl,
                    filePreviewUrl : action.data.filePreviewUrl
               }


          case 'CLOSE_CREATE_POST' :
               localStorage.removeItem('imageRotation')
               localStorage.removeItem('imageWidth')
               localStorage.removeItem('filterStyle')
               localStorage.removeItem('imageStyle')
               return {
                    ...state,
                    createPostModal : false,
               }


          case 'CREATING_POST' :
               
               return {
                    ...state,
                    creatingPost : true,
               }


          case 'CREATE_POST_SUCCESS' :
               localStorage.removeItem('imageRotation')
               localStorage.removeItem('imageWidth')
               localStorage.removeItem('filterStyle')
               localStorage.removeItem('imageStyle')
               console.log('created posts', action.post)
               return {
                    ...state,
                    sharedPostSnackBar : true,
                    snackBarText : 'Your photo was added',
                    createPostModal : false,
               }
          
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

          case 'OPEN_SHARED_POST' :
               
               return {
                    ...state,
                    sharedPostSnackBar : true,
                    snackBarText : 'Post sent sucessfully'
               }

          case 'CLOSE_SHARED_POST' :
               
               return {
                    ...state,
                    sharedPostSnackBar : false,
               }
     
          default : return state
     }
}


export default PostsReducer