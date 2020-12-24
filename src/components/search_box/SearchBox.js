import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'



import { showSearchResults, hideSearchResults } from '../../store/actions/AppActions'




const PcSearchBox = ({ showSearchResults, hideSearchResults, inputValue }) =>{
    //console.log(inputValue)


    const handleInputChange = (e) =>{
        if(e.target.value !== ''){
            showSearchResults(e.target.value)
        }
        else{
            hideSearchResults()
        }
    }


     
    return(
        <div className='pc-search-box'>
            <input 
                placeholder='Search'
                onChange={handleInputChange}
                value={inputValue}
            />

            <div
                className='cancel-icon-container'
            >
                <Button
                    onClick={hideSearchResults} 
                >
                    <CloseIcon fontSize='small' />

                </Button>
            </div>

        </div>
    )
}


const mapStateToProps = state =>{
    return{
        inputValue : state.application.inputValue,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        showSearchResults : inputValue => dispatch(showSearchResults(inputValue)),
        hideSearchResults : () => dispatch(hideSearchResults())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PcSearchBox)


