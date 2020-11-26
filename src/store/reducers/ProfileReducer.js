
const initState = {
   profileError : null
}


const ProfileReducer = (state = initState, action) =>{
     switch (action.type){

         case  "FOLLOWED_SUCCESSFULLY" :
            console.log('followed user successfully')
            return{
               ...state,
               profileError : null
            }
         
         case "NOTIFICATION_SENT" : 
            console.log(action.data)
            return{
               ...state
            }

         case "FOLLOWED_FAILED" :
            console.log('followed user unsuccessful')
            return {
               ...state,
               profileError : action.error
            }


         case  "UNFOLLOWED_SUCCESSFULLY" :
            console.log('Unfollowed user successfully')
            return{
               ...state,
               profileError : null
            }


         case "UnFOLLOWED_FAILED" :
            console.log('Unfollowing user unsuccessful')
            return {
               ...state,
               profileError : action.error
            }


         case  "REMOVE_FOLLOWER_SUCCESSFULLY" :
            console.log('removed user successfully')
            return{
               ...state,
               profileError : null
            }


         case "REMOVE_FOLLOWER_FAILED" :
            console.log('removing user unsuccessful')
            return {
               ...state,
               profileError : action.error
            }

         case  "PHOTO_UPDATE_SUCCESSFUL" :
            console.log('profile photo updated successfully')
            return{
               ...state,
               profileError : null
            }


         case "PHOTO_UPDATE_FAILED" :
            console.log('profile photo update failed', action.error)
            return {
               ...state,
               profileError : action.error
            }

         case  "UPDATED_PROFILE_SUCCESS" :
            console.log('profile details updated successfully')
            return{
               ...state,
               profileError : null
            }


         case "UPDATED_PROFILE_FAILED" :
            console.log('profile details update failed', action.error)
            return {
               ...state,
               profileError : action.error
            }

        default : return state
     }
}


export default ProfileReducer