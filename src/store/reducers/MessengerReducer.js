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
    messageSent : false,

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



        case 'SELECT_CHAT':
            //console.log('closed story successfully')
            return {
                ...state,
                openChatBoard: false,
                selectedAccount: action.user,
            }


        case 'CREATING_CHAT':
            console.log('creating the chat')
            return {
                ...state,
                creatingChat : true,
            }


        case 'CHAT_CREATED_SUCCESS':
            console.log('created chat successfully')
            return {
                ...state,
                creatingChat : false,
            }


        case 'CHAT_CREATED_FAIL':
            console.log('created chat failed')
            return {
                ...state,
                creatingChat : false,
            }


        case 'DELETING_CHAT':
            //console.log('closed story successfully')
            return {
                ...state,
                deletingChat : true,
            }


        case 'DELETE_CHAT_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
                deletingChat : false,
            }


        case 'DELETE_CHAT_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
                deletingChat : false,
            }


        case 'SENDING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
                sendingMessage : true,
            }


        case 'MESSAGE_SEND_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
                messageSent : true,
                sendingMessage : false,
            }


        case 'MESSAGE_SEND_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
                sendingMessage : false,
            }


        case 'DELETING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
                deletingMessage : true,
            }


        case 'MESSAGE_DELETE_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
                deletingMessage : false,
            }


        case 'MESSAGE_DELETE_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
                deletingMessage : false,
            }


        case 'LIKING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
                likingMessage : true,
            }


        case 'MESSAGE_LIKE_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
                likingMessage : false,
            }


        case 'MESSAGE_LIKE_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
                likingMessage : false,
            }


        case 'UNLIKING_MESSAGE':
            //console.log('closed story successfully')
            return {
                ...state,
                unlikingMessage : true,
            }


        case 'MESSAGE_UNLIKE_SUCCESS':
            //console.log('closed story successfully')
            return {
                ...state,
                unlikingMessage : false,
            }


        case 'MESSAGE_UNLIKE_FAIL':
            //console.log('closed story successfully')
            return {
                ...state,
                unlikingMessage : false,
            }




        default: return state
    }

}



export default MessengerReducer