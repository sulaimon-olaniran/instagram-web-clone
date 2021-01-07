import firebase, { db } from '../../firebase/Firebase'
//import { v4 as uuidv4 } from 'uuid'

export const openChatBoard = (user) =>{
    return (dispatch, getState) =>{
        dispatch({type : 'OPEN_CHAT_BOARD', user})
    }
}


export const closeChatBoard = () =>{
    return (dispatch, getState) =>{
        dispatch({type : 'CLOSE_CHAT_BOARD'})
    }
}


export const createChat = (data) =>{
    const { interlocutors, createdBy, chatId, coUser } = data
    return (dispatch, getState) =>{
        dispatch({type : "CREATING_CHAT"})

        interlocutors.map(id =>{
            return db.collection('users').doc(id).collection('chats')
            .doc(chatId).set({
                chatId : chatId,
                interlocutors : interlocutors,
                createdAt : Date.now(),
                createdBy : createdBy,
                coUser : coUser

            }, { merge : true })
            .then(() =>{
                dispatch({ type : "CHAT_CREATED_SUCCESS"})
            })
            .catch(error =>{
                dispatch({ type : "CHAT_CREATED_FAIL", error})
            })
        })

    }
}


export const deleteChat = (data) =>{
    const { userId, chatId } = data
    return (dispatch, getState) =>{
        dispatch({ type: "DELETING_CHAT"})

        db.collection('users').doc(userId).collection('chats')
        .doc(chatId).delete()
        .then(() =>{
            dispatch({type : "DELETE_CHAT_SUCCESS"})
        })
        .catch(error =>{
            dispatch({type : "DELETE_CHAT_FAIL", error})
        })
        

    }
}



export const sendMessage = (data) =>{
    const { sender, chatId, messageType, message, interlocutors, messageId } = data
    
    return (dispatch, getState) =>{
        dispatch({type : "SENDING_MESSAGE"})

        interlocutors.map(id =>{
            return db.collection('users').doc(id).collection('chats')
            .doc(chatId).collection('messages').doc(messageId).set({
                timeStamp : Date.now(),
                message : message,
                messageType : messageType,
                sender : sender,
                seen : false,
                likes : [],
                messageId : messageId,
            })
            .then(() =>{
                dispatch({type : "MESSAGE_SEND_SUCCESS"})
            })
            .catch(error =>{
                dispatch({type : "MESSAGE_SEND_FAIL", error})
            })
        })


    }
}


export const deleteMessage = (data) =>{
    const { chatId, messageId, interlocutors } = data
    return (dispatch, getState) =>{
        dispatch({ type : 'DELETING_MESSAGE'})

        interlocutors.map(id =>{
            return db.collection('users').doc(id).collection('chats')
            .doc(chatId).collection('messages').doc(messageId).delete()
            .then(() =>{
                dispatch({type : 'MESSAGE_DELETE_SUCCESS'})
            })
            .catch(error =>{
                dispatch({type : "MESSAGE_DELETE_FAIL", error})
            })
        })

    }
}



export const likeMessage = (data) =>{
    const { chatId, messageId, interlocutors, userId } = data
    return (dispatch, getState) =>{
        dispatch({ type : 'LIKING_MESSAGE'})

        interlocutors.map(id =>{
            return db.collection('users').doc(id).collection('chats')
            .doc(chatId).collection('messages').doc(messageId).update({
                likes : firebase.firestore.FieldValue.arrayUnion(userId)
            })
            .then(() =>{
                dispatch({type : 'MESSAGE_LIKE_SUCCESS'})
            })
            .catch(error =>{
                dispatch({type : "MESSAGE_LIKE_FAIL", error})
            })
        })
    }
}




export const unlikeMessage = (data) =>{
    const { chatId, messageId, interlocutors, userId } = data
    return (dispatch, getState) =>{
        dispatch({ type : 'UNLIKING_MESSAGE'})

        interlocutors.map(id =>{
            return db.collection('users').doc(id).collection('chats')
            .doc(chatId).collection('messages').doc(messageId).update({
                likes : firebase.firestore.FieldValue.arrayRemove(userId)
            })
            .then(() =>{
                dispatch({type : 'MESSAGE_UNLIKE_SUCCESS'})
            })
            .catch(error =>{
                dispatch({type : "MESSAGE_UNLIKE_FAIL", error})
            })
        })
    }
}