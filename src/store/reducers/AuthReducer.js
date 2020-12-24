const initState = {
     authError : null, 
     changingPassword : false,
     passwordSnackbar : false,
     snackbarText : '',
}


const AuthReducer = (state = initState, action) =>{
     switch(action.type){
          case 'LOGIN_ERROR' :
               console.log(action.error)
          return {
               ...state,
               authError : action.error.message
          }

          case  'LOGIN_SUCCESS' :
          console.log('login success')
          return {
               ...state,
               authError : null
          }

          case 'SIGNOUT_SUCCESS' :
               console.log('signout successful')
               return state

          case 'SIGNUP_SUCCESS' :
               console.log('signup successfull')
               return{
                    ...state,
                    authError : null
               }

          case 'SIGNUP_ERROR' :
               console.log(action.error)
          return {
               ...state,
               authError : action.error.message
          }

          //

          case 'CHANGING_PASSWORD' :
              
               return {
                    ...state,
                    changingPassword : true,
               }

          case 'PASSWORD_UPDATE_SUCCESS' :
               console.log('password update successfull')
               return{
                    ...state,
                    changingPassword : false,
                    passwordSnackbar : true,
                    snackbarText : 'Password Updated'
               }

          case 'PASSWORD_UPDATE_FAILED' :
               console.log('password update failed', action.error)
          return {
               ...state,
               changingPassword : false,
               passwordSnackbar : true,
               snackbarText : 'Password Update Failed',
               authError : action.error.message
          }
        

          case 'CLOSE_PASSWORD_SNACKBAR' :
              //console.log('closed story successfully')
              return {
                  ...state,
                  passwordSnackbar : false
              }

          default : return state
     }
}


export default AuthReducer