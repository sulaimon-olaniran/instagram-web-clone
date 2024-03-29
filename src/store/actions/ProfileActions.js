import firebase, { db, storage } from '../../firebase/Firebase'



export const followUser = (data) =>{
    return( dispatch, getState ) =>{

        const followUserNotification = firebase.functions().httpsCallable('followUserNotification')

        db.collection('users').doc(data.userId)
        .update({
            following : firebase.firestore.FieldValue.arrayUnion(data.accountId)
        })
        .then(() =>{
          return  data.accountId === data.userId ?
            followUserNotification({
                time : Date.now(),
                userId : data.userId,
                accountId : data.accountId,
                notification : 'Started following you',
            })
            .then((res) =>{
                const data = res.data
                dispatch({ type : 'NOTIFICATION_SENT', data})
            })
            :null
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



export const uploadProfilePicture = (data) =>{
    return(dispatch, getState) =>{
        const { file, userId } = data
        const uploadTask = storage.ref(`profile_images/${file.name}`)
        uploadTask.put(file)
        .then(() =>{
            return storage.ref('profile_images').child(file.name).getDownloadURL()
            .then(url =>{
                return db.collection('users').doc(userId)
                .update({
                    "profilePhoto" : url
                })
            })
        })
        .then(() =>{
            dispatch({ type : 'PHOTO_UPDATE_SUCCESSFUL'})
        })
        .catch(error =>{
            dispatch({type : 'PHOTO_UPDATE_FAILED', error})
        })
    }
}


export const updateUserDetails = (data, userId) =>{
    return(dispatch, getState) =>{
        db.collection('users').doc(userId).update({
            ...data
        })
        .then(() =>{
            dispatch({ type : 'UPDATED_PROFILE_SUCCESS'})
        })
        .catch(error =>{
            dispatch({ type : 'UPDATED_PROFILE_FAILED', error})
        })
    }
}