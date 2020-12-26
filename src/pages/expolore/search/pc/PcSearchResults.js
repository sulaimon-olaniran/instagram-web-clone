import React from 'react'
import SearchResults from '../search_results/SearchResults'






const PcSearchResults = ({ inputValue }) =>{
    return(
        <div className='pc-search-results-container'>
            <SearchResults inputValue={inputValue} />
        </div>
            
    )
}




export default PcSearchResults