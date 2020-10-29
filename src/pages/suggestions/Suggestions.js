import React from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { suggestions } from './Fakedat'
import Suggestion from './suggestion/Suggestion'


const Suggestions = () => {
    return (
        <div className='suggestions-container'>
            <div className='suggestions-nav-container'>
                <ArrowBackIosIcon />
                <p>Discover People</p>
            </div>

            <div className='suggestions-contents-container'>
                <p>Suggested</p>

                <div className='suggestions-list-container'>
                    {
                        suggestions.map((suggestion, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Suggestion data={suggestion} />
                                </React.Fragment>
                            )
                        })

                    }
                </div>

            </div>

        </div>
    )
}


export default Suggestions