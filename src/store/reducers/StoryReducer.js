const initState = {
    addingStory: false,
    storyAdded : false,
    createStoryModal : false,
    fileUrl : null,
    filePreviewUrl : null
    
}




const AppReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADDING_STORY':
            //console.log('started adding story')

            return {
                ...state,
                addingStory: true
            }

        case 'ADDED_STORY_SUCCESS':
            console.log('story added successfully')
            //console.log(action.payload)
            return {
                ...state,
                addingStory: false,
                storyAdded : true,
                createStoryModal : false
            }

        case 'ADDED_STORY_FAILED':
            console.log('story adding failed')
            //console.log(action.payload)
            return {
                ...state,
                addingStory: false,
                storyAdded : false
            }

        case 'STORY_DELETE_SUCCESS':
            //console.log('deleted story successfully')
           
            return {
                ...state,
            }

        case 'STORY_DELETE_FAILED':
            console.log('delete story failed')
            //console.log(action.payload)
            return {
                ...state,
            }

        
        case 'OPEN_CREATE_STORY' :
            console.log(action.data)
            return {
                ...state,
                createStoryModal : true,
                fileUrl : action.data.fileUrl,
                filePreviewUrl : action.data.filePreviewUrl
            }


        case 'CLOSE_CREATE_STORY' :
           // console.log('closed story successfully')
            return {
                ...state,
                createStoryModal : false
            }
        

        case 'CLOSE_STORY_SNACKBAR' :
            //console.log('closed story successfully')
            return {
                ...state,
                storyAdded : false
            }

    

        default: return state
    }
}


export default AppReducer