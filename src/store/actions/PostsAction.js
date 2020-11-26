import firebase, { storage, db } from '../../firebase/Firebase'

export const createPost = (post, data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const { file, userId} = data
        const firestore = getFirestore()
        //const firebase = getFirebase()
        const uploadTask = storage.ref(`post_images/${file.name}`)
        //first upload the post image to firebase storage
        uploadTask.put(file)
            .then(() => {
                //get the file url from firebase storage after being uploaded
                return storage.ref('post_images').child(file.name).getDownloadURL()
                .then(url =>{
                    //creating a firestore data containing post details and uploaded image url
                    return firestore.collection('posts').add({
                        ...post,
                        userId : userId,
                        fileUrl : url
                    })
                    //in order to add the document id to the newly created document for future use to track post
                    .then(docRef => {
                       return firestore.collection('posts').doc(docRef.id).set({
                            postId: docRef.id
                        }, { merge: true })
                    })
                })
                
            })
            .then(() => {
                //finally dispatching action after all async calls are done
                dispatch({ type: 'CREATE_POST_SUCCESS', post })
            })
            .catch(error => {
                dispatch({ type: 'CREATE_POST_ERROR', error })
            })
    }
}


export const deletePost =(postId) =>{
    return (dispatch, getState) =>{
        db.collection('posts').doc(postId)
        .delete()
        .then(() =>{
            dispatch({type :  'POST_DELETED_SUCCESSFULLY'})
        })
        .catch(error =>{
            dispatch({type : 'POST_DELETE_FAILED', error})
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
                return db.collection('posts').doc(data.postId)
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
            return db.collection('posts').doc(data.postId)
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



export const savePost = (data) =>{
    return(dispatch, getState) =>{
        db.collection('users').doc(data.userId)
        .update({
            savedPosts : firebase.firestore.FieldValue.arrayUnion(data.postId)
        })
        .then( () =>{
            dispatch({ type : 'SAVED_POST_SUCCESSFULLY'})
        })
        .catch(error =>{
            dispatch({ type : 'SAVE_POST_FAILED', error})
        })
    }
}


export const unSavePost = (data) =>{
    return(dispatch, getState) =>{
        db.collection('users').doc(data.userId)
        .update({
            savedPosts : firebase.firestore.FieldValue.arrayRemove(data.postId)
        })
        .then( () =>{
            dispatch({ type : 'UNSAVED_POST_SUCCESSFULLY'})
        })
        .catch(error =>{
            dispatch({ type : 'UNSAVE_POST_FAILED', error})
        })
    }
}


export const commentOnPost = (data) =>{
    return(dispatch, getState) =>{
        const commentOnPostNotification = firebase.functions().httpsCallable('commentOnPostNotification')

        db.collection('posts').doc(data.postId).collection('comments')
        .add({
            comment : data.comment,
            userId : data.userId,
            time : data.time,
            likes : []
        })
        .then(docRef =>{
            return db.collection('posts').doc(data.postId).collection('comments')
            .doc(docRef.id).update({
                commentId : docRef.id
            })
            .then(() =>{
                return  commentOnPostNotification({
                    time : data.time,
                    userId : data.userId,
                    accountId : data.accountId,
                    postId : data.postId,
                    notification : 'commented on your post',
                    commentId : docRef.id
                })
            })
        })
        .then(() =>{
            dispatch({ type : 'COMMENT_SUCCESSFUL'})
        })
        .catch(error =>{
            dispatch({type : 'COMMENT_FAILED', error})
        })
    }
}



export const deletePostComment = (data) =>{
    return(dispatch, getState) =>{
        const docId = data.userId.concat(data.commentId)

        db.collection('posts').doc(data.postId).collection('comments')
        .doc(data.commentId).delete()
        .then(() =>{
            return db.collection('users').doc(data.accountId).collection('notifications')
            .doc(docId).delete()
        })
        .then(() =>{
            dispatch({ type : 'COMMENT_DELETE_SUCCESS'})
        })
        .catch(error =>{
            dispatch({ type : 'COMMENT_DELETE_FAILED', error})
        })
    }
}


export const likePostComment = (data) =>{
    return(dispatch, getState) =>{
        const likedPostCommentNotification = firebase.functions().httpsCallable('likedPostCommentNotification')
        db.collection('users').doc(data.userId)
        .update({
            likedComments : firebase.firestore.FieldValue.arrayUnion(data.commentId)
        })
        .then(() =>{
            return db.collection('posts').doc(data.postId).collection('comments')
            .doc(data.commentId).update({
                likes : firebase.firestore.FieldValue.arrayUnion(data.userId)
            })
            .then(() =>{
                return likedPostCommentNotification({
                    time : Date.now(),
                    userId : data.userId,
                    accountId : data.accountId,
                    postId : data.postId,
                    notification : 'Liked your comment',
                    commentId : data.commentId
                })
            })
        })
        .then(() =>{
            dispatch({ type : 'LIKED_COMMENT_SUCCESS'})
        })
        .catch(error =>{
            dispatch({ type : 'LIKED_COMMENT_FAILED', error})
        })
    }
}



export const unLikePostComment = (data) =>{
    return(dispatch, getState) =>{
        const docId = data.commentId.concat(data.userId)

        db.collection('users').doc(data.userId)
        .update({
            likedComments : firebase.firestore.FieldValue.arrayRemove(data.commentId)
        })
        .then(() =>{
            return db.collection('posts').doc(data.postId).collection('comments')
            .doc(data.commentId).update({
                likes : firebase.firestore.FieldValue.arrayRemove(data.userId)
            })
            .then(() =>{
                return db.collection('users').doc(data.accountId).collection('notifications')
                .doc(docId).delete()
            })
        })
        .then(() =>{
            dispatch({ type : 'UNLIKE_COMMENT_SUCCESS'})
        })
        .catch(error =>{
            dispatch({ type : 'UNLIKE_COMMENT_FAILED', error})
        })
    }
}