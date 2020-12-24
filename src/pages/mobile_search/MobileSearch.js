import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'




import SearchResults from '../expolore/search/search_results/SearchResults'





const MobileSearch = ({ history }) => {
    const [inputValue, setInputValue ] = useState('')
   

    const handleInputChange = e =>{
        setInputValue(e.target.value)
    }

    return (
        <div className='mobile-search-container'>

            <div className='mobile-search-top-container'>
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
                            onClick={() => setInputValue('')}
                        >
                            <CloseIcon fontSize='small' />

                        </Button>
                    </div>

                </div>

                <Button onClick={() => history.goBack()} size='small' >Cancel</Button>

            </div>

            <SearchResults inputValue={inputValue} />

        </div>
    )
}




export default withRouter(MobileSearch)