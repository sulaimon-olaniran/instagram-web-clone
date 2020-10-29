import React, { useState, useEffect, useRef } from 'react'


const CubeSlider = () =>{
    const exploreImages = [
        {
            url: 'https://source.unsplash.com/random/600x600/?nature,animals',
            rows: 3,
            cols: 3,
        },

        {
            url :'https://source.unsplash.com/random/600x600/?nature,flowers',
            rows: 1,
            cols : 1

        },
        
        {
            url :'https://source.unsplash.com/random/600x600/?places',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?cows',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/1600x900/?dog',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?foods',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?elephants',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?car',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?train',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?pet',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?guns',
            rows: 3,
            cols : 3

        },
        {
            url :'https://source.unsplash.com/random/600x600/?ronaldo',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?messi',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?london',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?manchester',
            rows: 1,
            cols : 1

        },
    ]

    const [slideIndex, setSlideIndex] = useState(0)
    const [left, setLeft] = useState('')
    const [right, setRight] = useState('')
    const [container, setContainer] = useState('')

    const leftRef = useRef(null)
    const rightRef = useRef(null)
    

    const leftImage = exploreImages[slideIndex].url
    const rightImage = exploreImages[slideIndex + 1].url

    
    useEffect(() =>{
        const theRef= leftRef.current
        leftRef.current.addEventListener('click', ()=>{
            //setSlideIndex(prev => prev + 1)
            setLeft('left-move-left')
            setRight('right-move-left')
            setContainer('container-movement')
        })
        leftRef.current.addEventListener('animationend', ()=>{
            setSlideIndex(prev => prev + 1)
            setLeft('')
            setRight('')
            setContainer('')
        })

        return () =>{
            theRef.removeEventListener('click')
            theRef.removeEventListener('animationend')
        }
    }, [])
    

    return(
        <div className='cube-slider-container'>
             <div className={`contents-container ${container}`}>
                <div className={`image-container left-sided ${left}`} ref={leftRef}>
                       <img src={leftImage} alt='File' />
                </div>

                <div className={`image-container right-sided ${right}`} ref={rightRef}>
                       <img src={rightImage} alt='file' />
                </div>
            </div>
        </div>
    )
}



export default CubeSlider











