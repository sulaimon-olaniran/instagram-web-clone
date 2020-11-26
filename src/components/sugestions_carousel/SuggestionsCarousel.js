import React, { useState } from 'react'
import SuggestionCard from '../suggestion_card/SuggestionCard'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useSwipeable } from "react-swipeable";




const SuggestionsCarousel = ({ users }) => {
    const [x, setX] = useState(0)

    const handleGoRight = () => {
        if(x === -100 * (users.length-1)){
            return
        }
        setX(prev => prev - 100)
    }

    const handleGoLeft = () => {
        if(x >= 0){
            return
        }
        setX(prev => prev + 100)
    }

    const handlers = useSwipeable({
        onSwipedLeft : () => handleGoRight(),
        onSwipedRight : () => handleGoLeft(),
        preventDefaultTouchmoveEvent : true,
        trackMouse : true
    })

    const leftButtonDisplay = x < 0 ? 'flex' : 'none'
    const rightButtonDisplay = x <= -100 * (users.length-1) ? 'none' : 'flex'

    //console.log(users)

    return (
        <div 
            {...handlers}
            className='suggestions-carousel-container'
        >
            <div
                className='left-button-container button-container'
                style={{display : leftButtonDisplay}}
                onClick={handleGoLeft}
            >
               <ArrowBackIosIcon />
            </div>

            {
                users && users.map((user, i) => {
                    return (
                        <SuggestionCard user={user} key={user.userId} x={x} />
                    )
                })
            }

            <div 
                className='right-button-container button-container'
                style={{display : rightButtonDisplay}}
                onClick={handleGoRight}
            >
                <ArrowForwardIosIcon />
            </div>
        </div>
    )
}



export default SuggestionsCarousel