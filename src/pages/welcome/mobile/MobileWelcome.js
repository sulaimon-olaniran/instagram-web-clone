import React from 'react'
import SuggestionsCarousel from '../../../components/sugestions_carousel/SuggestionsCarousel'




const MobileWelcome = () =>{
    return(
        <div className='mobile-welcome-page-container'>
            <h1>Welcome to Instagram</h1>
            <p>
                When you follow people, you'll see the 
                photos and videos they post here.
            </p>
            
            <SuggestionsCarousel />

        </div>
    )
}






export default MobileWelcome