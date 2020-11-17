import { storage } from '../../firebase/Firebase'

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
                            dispatch({ type: 'CREATE_POST', post })
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