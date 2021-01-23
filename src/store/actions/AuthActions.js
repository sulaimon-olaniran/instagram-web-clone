import firebase, { db }  from '../../firebase/Firebase'


export const signUserIn = (credentials) =>{
    return (dispatch, getState) =>{
        dispatch({ type : 'LOGING_IN'})
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then(() =>{
            dispatch({type : 'LOGIN_SUCCESS'})
        })
        .catch((error) =>{
            dispatch({type : 'LOGIN_ERROR', error})
        })
    }
}



export const signUserOut = () =>{
    return(dispatch, getState) =>{
        firebase.auth().signOut()
        .then(() =>{
            dispatch({type : 'SIGNOUT_SUCCESS'})
        })
    }
}


export const signUserUp = (user) =>{
    return(dispatch, getState) => {
        dispatch({ type : 'SIGNING_UP'})
        firebase.auth().createUserWithEmailAndPassword(
            user.email,
            user.password
        ).then( res =>{
            return db.collection('users').doc(res.user.uid)
            .set({
                fullName : user.full_name,
                email : user.email,
                password : user.password,
                userName : user.username,
                userId : res.user.uid,
                private : false,
                followers : [],
                following : [],
                savedPosts : [],
                likedPosts : [],
                likedComments : [],
                stories : [],
                blockedUsers : []
            })
        })
        .then(() =>{
            dispatch({ type : 'SIGNUP_SUCCESS'})
        })
        .catch(error =>{
            dispatch({ type :  'SIGNUP_ERROR', error})
        })
    }
}




export const changePassword = (data) =>{
    return(dispatch, getState) =>{
       
        dispatch({type : 'CHANGING_PASSWORD'})

        firebase.auth().currentUser.updatePassword(data.newPassword)
        .then(() =>{
            return db.collection('users').doc(data.userId)
            .update({
                password : data.newPassword
            })
        })
        .then(() =>{
            dispatch({type : 'PASSWORD_UPDATE_SUCCESS'})
        })
        .catch(error =>{
            dispatch({type : 'PASSWORD_UPDATE_FAILED', error})
        })
        
    }
}


export const closePasswordSnackBar = () =>{
    return(dispatch, getState) =>{
        dispatch({type : 'CLOSE_PASSWORD_SNACKBAR'})
    }
}