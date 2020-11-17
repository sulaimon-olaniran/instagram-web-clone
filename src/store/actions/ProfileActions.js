import firebase, { db } from '../../firebase/Firebase'

export const followUser = (data) =>{
    return( dispatch, getState ) =>{

        const handleFollowUser = firebase.functions().httpsCallable('handleFollowUser')

        db.collection('users').doc(data.userId)
        .update({
            following : firebase.firestore.FieldValue.arrayUnion(data.accountId)
        })
        .then(() =>{
          return  handleFollowUser({
                time : Date.now(),
                userId : data.userId,
                accountId : data.accountId,
            })
        })
        .then(() =>{
            dispatch({ type : 'FOLLOWED_SUCCESSFULLY'})
        })
        .catch(error =>{
            dispatch({type : 'FOLLOWED_FAILED', error})
        })
        
    }
}


export const unFollowUser = (data) =>{
    return(dispatch, getState) =>{
        
        db.collection('users').doc(data.userId)
        .update({
            following : firebase.firestore.FieldValue.arrayRemove(data.accountId)
        })
        .then(() =>{
            dispatch({ type : 'UNFOLLOWED_SUCCESSFULLY'})
        })
        .catch( error =>{
            dispatch({ type : 'UNFOLLOWED_FAILED', error})
        })
    }
}