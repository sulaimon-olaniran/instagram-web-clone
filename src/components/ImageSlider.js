import React, { useState, useEffect } from 'react'


const ImageSlider = ({ images }) => {
    const [x, setX] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            x === -100 * (images.length - 1) ? setX(0) : setX(x - 100);
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [x])

    return (
        <div style={{display : 'flex'}}>
            {
                images.map((image, index) => {
                    return (
                        <div style={{ transform: `translateX(${x}%)` }} key={index} >
                            <img src={image} alt="Instagram" />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default ImageSlider