import React, { useEffect, useState } from 'react'
import "react-slideshow-image/dist/styles.css"

import iphone_frame from './assets/iphone_frame.png'
import image_one from './assets/image_one.jpg'
import image_two from './assets/image_two.jpg'
import image_three from './assets/image_three.jpg'
import image_four from './assets/image_four.jpg'
import image_five from './assets/image_five.jpg'
import instagram_image from './assets/instagram_image.png'
import MobileSignIn from '../mobile/MobileSignIn'



const PcSignIn = ({ setFieldValue, handleBlur, touched, errors, authError }) => {
    const [x, setX] = useState(0)
    const slideImages = [image_one, image_two, image_three, image_four, image_five]

    useEffect(() => {
        const interval = setInterval(() => {
            x === -100 * (slideImages.length - 1) ? setX(0) : setX(x - 100)
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [x, slideImages.length])

    return (
        <div className="pc-signin-container">
            <div className='images-container'>
                <div className='first-image-container'>
                    <img src={instagram_image} alt='IG' />
                </div>
                <div className='slide-image-container'>
                    <div style={{ transform: `translateX(${x}%)` }} className='image-container' >
                        {
                            slideImages.map((image, index) => {
                                return (

                                    <img src={image} alt="Instagram" key={index} />

                                )
                            })
                        }
                    </div>
                </div>

                <div className="phone-frame-container">
                    <img src={iphone_frame} alt="Frame" />
                </div>

            </div>

            <div className='signin-container'>
                <MobileSignIn
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                  authError={authError}
                />
            </div>

        </div>
    )
}


export default PcSignIn