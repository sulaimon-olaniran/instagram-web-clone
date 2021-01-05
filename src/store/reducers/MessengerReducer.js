const initState = {
    openChatBoard: false,
    selectedAccount: null,
    messageError : null,
    sendingMessage : false,
    deletingMessage : false,
    creatingChat : false,
    likingMessage : false,
    unlikingMessage : false,
    deletingChat : false,

}


const MessengerReducer = (state = initState, action) => {
    switch (action.type) {
        case 'OPEN_CHAT_BOARD':
            //console.log('viewed story successfully')
            return {
                ...state,
                openChatBoard: true,
                selectedAccount: action.user,
            }


        case 'CLOSE_CHAT_BOARD':
            //console.log('closed story successfully')
            return {
                ...state,
                openChatBoard: false,
                selectedAccount: null,
            }


        case 'CREATING_CHAT':
            console.log('creating the chat')
            return {
                ...state,
            }


        case 'CHAT_CREATED_SUCCESS':
            console.log('created chat successfully')
            return {
                ...state,
            }


        case 'CHAT_CREATED_FAIL':
            console.log('created chat failed')
            return {
                ...state,
            }


        case 'DELETING_CHAT':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'DELETE_CHAT_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'DELETE_CHAT_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'SENDING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_SEND_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_SEND_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'DELETING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_DELETE_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_DELETE_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'LIKING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_LIKE_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_LIKE_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'UNLIKING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_UNLIKE_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
            }


        case 'MESSAGE_UNLIKE_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
            }




        default: return state
    }

}



export default MessengerReducer