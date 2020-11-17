import React, { useState } from 'react'
import SuggestionCard from '../suggestion_card/SuggestionCard'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useSwipeable } from "react-swipeable";


const data = [
    {
        name: 'David Brooks',
        userName: 'dave_brooks',
        dp: 'https://source.unsplash.com/random/600x600/?man',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?girl',
            'https://source.unsplash.com/random/600x600/?money',
            'https://source.unsplash.com/random/600x600/?ball'
        ]
    },

    {
        name: 'Callum Wilson',
        userName: 'ca_wilson',
        dp: 'https://source.unsplash.com/random/600x600/?girl',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?boy',
            'https://source.unsplash.com/random/600x600/?gift',
            'https://source.unsplash.com/random/600x600/?toad'
        ]
    },

    {
        name: 'Angelo Burge',
        userName: 'angel_burge',
        dp: 'https://source.unsplash.com/random/600x600/?dog',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?puppy',
            'https://source.unsplash.com/random/600x600/?cat',
            'https://source.unsplash.com/random/600x600/?kitten'
        ]
    },

    {
        name: 'You Know',
        userName: 'idont_know',
        dp: 'https://source.unsplash.com/random/600x600/?london',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?japan',
            'https://source.unsplash.com/random/600x600/?flag',
            'https://source.unsplash.com/random/600x600/?woman'
        ]
    },

    {
        name: 'Kelvin Frank',
        userName: 'frankly_kelv',
        dp: 'https://source.unsplash.com/random/600x600/?stadium',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?beckham',
            'https://source.unsplash.com/random/600x600/?chelsea',
            'https://source.unsplash.com/random/600x600/?arsenal'
        ]
    },
    {
        name: 'David Brooks',
        userName: 'dave_brooks',
        dp: 'https://source.unsplash.com/random/600x600/?man',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?girl',
            'https://source.unsplash.com/random/600x600/?money',
            'https://source.unsplash.com/random/600x600/?ball'
        ]
    },

    {
        name: 'Callum Wilson',
        userName: 'ca_wilson',
        dp: 'https://source.unsplash.com/random/600x600/?girl',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?boy',
            'https://source.unsplash.com/random/600x600/?gift',
            'https://source.unsplash.com/random/600x600/?toad'
        ]
    },

    {
        name: 'Angelo Burge',
        userName: 'angel_burge',
        dp: 'https://source.unsplash.com/random/600x600/?dog',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?puppy',
            'https://source.unsplash.com/random/600x600/?cat',
            'https://source.unsplash.com/random/600x600/?kitten'
        ]
    },

    {
        name: 'You Know',
        userName: 'idont_know',
        dp: 'https://source.unsplash.com/random/600x600/?london',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?japan',
            'https://source.unsplash.com/random/600x600/?flag',
            'https://source.unsplash.com/random/600x600/?woman'
        ]
    },

    {
        name: 'Kelvin Frank',
        userName: 'frankly_kelv',
        dp: 'https://source.unsplash.com/random/600x600/?stadium',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?beckham',
            'https://source.unsplash.com/random/600x600/?chelsea',
            'https://source.unsplash.com/random/600x600/?arsenal'
        ]
    },
    {
        name: 'David Brooks',
        userName: 'dave_brooks',
        dp: 'https://source.unsplash.com/random/600x600/?man',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?girl',
            'https://source.unsplash.com/random/600x600/?money',
            'https://source.unsplash.com/random/600x600/?ball'
        ]
    },

    {
        name: 'Callum Wilson',
        userName: 'ca_wilson',
        dp: 'https://source.unsplash.com/random/600x600/?girl',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?boy',
            'https://source.unsplash.com/random/600x600/?gift',
            'https://source.unsplash.com/random/600x600/?toad'
        ]
    },

    {
        name: 'Angelo Burge',
        userName: 'angel_burge',
        dp: 'https://source.unsplash.com/random/600x600/?dog',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?puppy',
            'https://source.unsplash.com/random/600x600/?cat',
            'https://source.unsplash.com/random/600x600/?kitten'
        ]
    },

    {
        name: 'You Know',
        userName: 'idont_know',
        dp: 'https://source.unsplash.com/random/600x600/?london',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?japan',
            'https://source.unsplash.com/random/600x600/?flag',
            'https://source.unsplash.com/random/600x600/?woman'
        ]
    },

    {
        name: 'Kelvin Frank',
        userName: 'frankly_kelv',
        dp: 'https://source.unsplash.com/random/600x600/?stadium',
        reason: 'followed by Olami_sly',
        topThree: [
            'https://source.unsplash.com/random/600x600/?beckham',
            'https://source.unsplash.com/random/600x600/?chelsea',
            'https://source.unsplash.com/random/600x600/?arsenal'
        ]
    }
]



const SuggestionsCarousel = ({ users }) => {
    const [x, setX] = useState(0)

    const handleGoRight = () => {
        if(x === -100 * (data.length-1)){
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
    const rightButtonDisplay = x <= -100 * (data.length-1) ? 'none' : 'flex'

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