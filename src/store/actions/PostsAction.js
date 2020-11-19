import firebase, { storage, db } from '../../firebase/Firebase'

export const createPost = (post, file) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        //const firebase = getFirebase()
        const uploadTask = storage.ref(`post_images/${file.name}`)
        //first upload the post image to firebase storage
        uploadTask.put(file)
            .then(() => {
                //get the file url from firebase storage after being uploaded
                storage.ref('post_images').child(file.name).getDownloadURL()
                .then(url =>{
                    //creating a firestore data containing post details and uploaded image url
                    firestore.collection('users').doc('vcAFxA3Fo0bijaUYfXh6')
                    .collection('posts').add({
                        ...post,
                        userId : 'vcAFxA3Fo0bijaUYfXh6',
                        fileUrl : url
                    })
                    //in order to add the document id to the newly created document for future use to track post
                    .then(docRef => {
                        firestore.collection('users').doc('vcAFxA3Fo0bijaUYfXh6')
                        .collection('posts').doc(docRef.id).set({
                            postId: docRef.id
                        }, { merge: true })
                        .then(() => {
                            //finally dispatching action after all async calls are done
                            dispatch({ type: 'CREATE_POST_SUCCESS', post })
                        })
                        .catch(error => {
                            dispatch({ type: 'CREATE_POST_ERROR', error })
                        })
                    })
                    .catch(error => {
                        dispatch({ type: 'CREATE_POST_ERROR', error })
                    })
                })
                .catch(error => {
                    dispatch({ type: 'CREATE_POST_ERROR', error })
                })
                
            })
            .catch(error => {
                dispatch({ type: 'CREATE_POST_ERROR', error })
            })
    }
}



export const likePost = (data) =>{
    return (dispatch, getState) =>{

        const likedPostNotification = firebase.functions().httpsCallable('likedPostNotification')

        db.collection('users').doc(data.userId)
        .update({
            likedPosts : firebase.firestore.FieldValue.arrayUnion(data.postId)
        })
        .then(() =>{
                return db.collection('users').doc(data.posterId)
                .collection('posts').doc(data.postId)
                .update({
                    likes : firebase.firestore.FieldValue.arrayUnion(data.userId)
                })
            })
            .then(() =>{
                return  likedPostNotification({
                time : Date.now(),
                userId : data.userId,
                accountId : data.accountId,
                postId : data.postId,
                notification : 'Liked your post',
            })
        })
        .then(() =>{
            dispatch({type : 'LIKED_POST_SUCCESSFUL'})
        })
        .catch(error =>{
            dispatch({ type : 'LIKED_POST_FAILED', error})
        })
        
    }
}

export const unLikePost = (data) =>{
    return (dispatch, getState) =>{
        const docId = data.userId.concat(data.postId)

        db.collection('users').doc(data.userId)
        .update({
            likedPosts : firebase.firestore.FieldValue.arrayRemove(data.postId)
        })
        .then(() =>{
            return db.collection('users').doc(data.posterId)
            .collection('posts').doc(data.postId)
            .update({
                likes : firebase.firestore.FieldValue.arrayRemove(data.userId)
            })
            .then(() =>{
                return db.collection('users').doc(data.accountId).collection('notifications')
                .doc(docId)
                .delete()
            })
        })
        .then(() =>{
            dispatch({type : 'UNLIKE_POST_SUCCESSFUL'})
        })
        .catch(error =>{
            dispatch({ type : 'UNLIKE_POST_FAILED', error})
        })
        
    }
}