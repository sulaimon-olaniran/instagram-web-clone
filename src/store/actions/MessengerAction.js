


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
    return (dispatch, getState) =>{

    }
}


export const deleteChat = (data) =>{
    return (dispatch, getState) =>{

    }
}



export const sendMessage = (data) =>{
    return (dispatch, getState) =>{

    }
}


export const deleteMessage = (data) =>{
    return (dispatch, getState) =>{
        
    }
}



export const likeMessage = (data) =>{
    return (dispatch, getState) =>{
        
    }
}