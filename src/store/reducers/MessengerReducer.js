const initState = {
    openChatBoard: false,
    selectedAccount: null,
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

        default: return state
    }

}



export default MessengerReducer