import firebase, { db }  from '../../firebase/Firebase'


export const signUserIn = (credentials) =>{
    return (dispatch, getState) =>{

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