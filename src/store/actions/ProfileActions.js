import firebase, { db } from '../../firebase/Firebase'

export const followUser = (data) =>{
    return( dispatch, getState ) =>{

        const followUserNotification = firebase.functions().httpsCallable('followUserNotification')

        db.collection('users').doc(data.userId)
        .update({
            following : firebase.firestore.FieldValue.arrayUnion(data.accountId)
        })
        .then(() =>{
          return  followUserNotification({
                time : Date.now(),
                userId : data.userId,
                accountId : data.accountId,
                notification : 'Started following you',
            })
            .then((res) =>{
                const data = res.data
                dispatch({ type : 'NOTIFICATION_SENT', data})
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

        const docId = data.userId.concat(data.accountId)

        db.collection('users').doc(data.userId)
        .update({
            following : firebase.firestore.FieldValue.arrayRemove(data.accountId)
        })
        .then(() =>{
            return db.collection('users').doc(data.accountId).collection('notifications')
            .doc(docId)
            .delete()
        })
        .then(() =>{
            dispatch({ type : 'UNFOLLOWED_SUCCESSFULLY'})
        })
        .catch( error =>{
            dispatch({ type : 'UNFOLLOWED_FAILED', error})
        })
    }
}



export const removeFollower = (data) =>{
    return(dispatch, getState) =>{

        db.collection('users').doc(data.userId)
        .update({
            followers : firebase.firestore.FieldValue.arrayRemove(data.accountId)
        })
        .then(() =>{
            dispatch({ type : 'REMOVE_FOLLOWER_SUCCESSFULLY'})
        })
        .catch( error =>{
            dispatch({ type : 'REMOVE_FOLLOWER_FAILED', error})
        })
    }
}