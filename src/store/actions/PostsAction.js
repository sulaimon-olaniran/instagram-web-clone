import firebase, { storage, db } from '../../firebase/Firebase'
import { v4 as uuidv4 } from 'uuid'



export const openCreatePostModal = (data) =>{
    return (dispatch, getState) =>{
        dispatch({ type : 'OPEN_CREATE_POST', data})
    }
}



export const closeCreatePostModal = () =>{
    return (dispatch, getState) =>{
        dispatch({ type : 'CLOSE_CREATE_POST'})
    }
}

export const createPost = (post, data) => {
    return (dispatch, getState) => {
        dispatch({ type : 'CREATING_POST'})
        const { file, userId} = data
        const fileName = file.name.concat(uuidv4())
        
        const uploadTask = storage.ref(`post_images/${fileName}`)
        //first upload the post image to firebase storage
        return uploadTask.put(file)
            .then(() => {
                //get the file url from firebase storage after being uploaded
                return storage.ref('post_images').child(fileName).getDownloadURL()
                .then(url =>{
                    //creating a firestore data containing post details and uploaded image url
                    const docId = uuidv4()
                    return db.collection('posts').doc(docId).set({
                        ...post,
                        userId : userId,
                        fileUrl : url,
                        fileName : fileName,
                        postId : docId,
                        time : Date.now()
                    })
                })
                
            })
            .then(() => {
                //finally dispatching action after all async calls are done
                return dispatch({ type: 'CREATE_POST_SUCCESS', post })
            })
            .catch(error => {
                dispatch({ type: 'CREATE_POST_ERROR', error })
            })
    }
}


export const deletePost =(data) =>{
    return (dispatch, getState) =>{
        
        const {postId, fileName} = data
        const storageRef = storage.ref(`post_images/${fileName}`)

        db.collection('posts').doc(postId)
        .delete()
        .then(() =>{
            return storageRef.delete()

        })
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
                    commentId : docRef.id,
                    comment : data.comment
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
                    commentId : data.commentId,
                    comment : data.comment
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



export const openSharedPostSnackbar = () =>{
    return (dispatch, getState) =>{
        dispatch({ type : 'OPEN_SHARED_POST'})
    }
}


export const closeSharedPostSnackbar = () =>{
    return (dispatch, getState) =>{
        dispatch({ type : 'CLOSE_SHARED_POST'})
    }
}