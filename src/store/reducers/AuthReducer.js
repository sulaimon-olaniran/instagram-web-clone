const initState = {
     authError : null
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

          default : return state
     }
}


export default AuthReducer