
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


export const handleOpenProfileCard = (data) =>{
    return(dispatch, getState) =>{
        dispatch({type : 'OPEN_PROFILE_CARD', payload : data})
    }
}



export const handleCloseProfileCard = () =>{
    return(dispatch, getState) =>{
        dispatch({type : 'CLOSE_PROFILE_CARD'})
    }
}


export const showSearchResults = (inputValue) =>{
    return(dispatch, getState) =>{
        dispatch({type : 'SHOW_SEARCH_RESULTS', inputValue})
    }
}


export const hideSearchResults = () =>{
    return(dispatch, getState) =>{
        dispatch({type : 'HIDE_SEARCH_RESULTS'})
    }
}


export const setPopperActiveFalse = () =>{
    return(dispatch, getState) =>{
        dispatch({type : 'CLOSE_POPPER_ACTIVE'})
    }
}



