
export const handleViewStory = (user) =>{
    return (dispatch, getState) =>{
        //console.log(getState)
        dispatch({ type : 'VIEW_STORY', user})
    }
}


export const handleUnviewStory = () =>{
    return(dispatch, getState) =>{
        dispatch({ type : 'UN_VIEW_STORY'})
    }
}



