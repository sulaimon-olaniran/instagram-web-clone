const initState = {
     viewStory: false,
     storyUser: null,
     createStoryModal: false,
     anchorEl: null,
     cardProfile: null,
     searchResults : false,
     inputValue : '',
     popperActive: false,
}


const AppReducer = (state = initState, action) => {
     switch (action.type) {
          case 'VIEW_STORY':
               //console.log('viewed story successfully')
               return {
                    ...state,
                    viewStory: true,
                    storyUser: action.user
               }


          case 'UN_VIEW_STORY':
               //console.log('closed story successfully')
               return {
                    ...state,
                    viewStory: false,
                    storyUser: null
               }

          case 'OPEN_PROFILE_CARD':
               //alert('viewed story successfully')
               return {
                    ...state,
                    anchorEl: action.payload.event,
                    cardProfile: action.payload.profile,
                    popperActive: true,
               }


          case 'CLOSE_PROFILE_CARD':
               //alert('closed story successfully')
               return {
                    ...state,
                    anchorEl: null,
                    cardProfile: null,
               }

          case 'SHOW_SEARCH_RESULTS':
               //console.log(action.inputValue)
               return {
                    ...state,
                    searchResults : true,
                    inputValue : action.inputValue
               }


          case 'HIDE_SEARCH_RESULTS':
               //console.log('hide search results')
               return {
                    ...state,
                    inputValue : '',
                    searchResults : false,
               }

          

          case 'CLOSE_POPPER_ACTIVE':
               //alert('closed story successfully')
               return {
                    ...state,
                    anchorEl: null,
                    cardProfile: null,
                    popperActive : false
                    
               }



          default: return state
     }
}


export default AppReducer