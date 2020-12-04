import firebase, { db, storage } from '../../firebase/Firebase'





export const openCreateStoryModal = (data) =>{
    return(dispatch, getState) =>{
        dispatch({type : 'OPEN_CREATE_STORY', data})
    }
}




export const closeCreateStoryModal = () =>{
    return(dispatch, getState) =>{
        dispatch({type : 'CLOSE_CREATE_STORY'})
    }
}


export const closeStorySnackBar = () =>{
    return(dispatch, getState) =>{
        dispatch({type : 'CLOSE_STORY_SNACKBAR'})
    }
}





export const addStory = (data) => {

    return (dispatch, getState) => {
        dispatch({ type: 'ADDING_STORY' })

        const uploadTask = storage.ref(`story_files/${data.file.name}`)

        uploadTask.put(data.file).then(() => {
            return storage.ref('story_files').child(data.file.name).getDownloadURL()
                .then(url => {
                    return db.collection('stories').add({
                        fileUrl: url,
                        userId: data.userId,
                        time: Date.now(),
                        fileName : data.file.name
                    })
                    .then(docRef => {
                        return db.collection('stories').doc(docRef.id).update({
                            storyId: docRef.id
                        })
                        .then(() => {
                            return db.collection('users').doc(data.userId).update({
                                stories: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                            })
                        })
                    })
                    .then(() => {
                        dispatch({ type: 'ADDED_STORY_SUCCESS' })
                    })
                    .catch( error => {
                        dispatch({ type: 'ADDED_STORY_FAILED', error })
                    })
                })
        })

    }
}



export const deleteStory = (data) =>{
    return(dispatch, getState) =>{

        dispatch({type : 'DELETE_STORY_LOADING'})

        db.collection('stories').doc(data.storyId).delete()
        .then(() =>{
            return db.collection('users').doc(data.userId).update({
                stories : firebase.firestore.FieldValue.arrayRemove(data.storyId)
            })
        })
        .then(() =>{
            dispatch({ type : 'STORY_DELETE_SUCCESS'})
        })
        .catch(error =>{
            dispatch({type : 'STORY_DELETE_FAILED', error})
        })
    }
}