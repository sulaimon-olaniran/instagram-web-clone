const initState = {
    viewStory : false,
    storyUser : null,
    createStoryModal : false,
}


const AppReducer = (state = initState, action) =>{
    switch(action.type){
         case 'VIEW_STORY' :
              //console.log('viewed story successfully')
         return {
              ...state,
              viewStory : true,
              storyUser : action.user
         }


         case 'UN_VIEW_STORY' :
              //console.log('closed story successfully')
         return {
              ...state,
              viewStory : false,
              storyUser : null
         }



         default : return state
    }
}


export default AppReducer