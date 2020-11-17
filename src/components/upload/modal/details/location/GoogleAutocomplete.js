import React, { useState, useRef, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { MyUnActiveSearchIcon } from '../../../../MyIcons'



const GoogleAutocomplete = ({ handleCloseModal }) => {
    const inputRef = useRef(null)
    const [locationError, setLocationError] = useState(false)

    useEffect(() => {
        let autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
        new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
            let place = autocomplete.getPlace();

            if (place.geometry !== undefined && place.formatted_address !== undefined) {
                const location = {
                    address: place.formatted_address,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }
                setLocationError(false)
                handleCloseModal(location)
            }
            else (setLocationError(true))
        });
    }, [ handleCloseModal ])

   

    return (
        <React.Fragment>
            <div className='location-top-nav-container'>
                <CloseIcon onClick={() => handleCloseModal(null)} />
                <p>Add Location</p>
            </div>

            <div className='location-input-container'>
                <form onSubmit={e => e.preventDefault()} className='google-location-form'>
                    <MyUnActiveSearchIcon width='8px' height='8px' />
                    <input type='text' ref={inputRef} />
                </form>

            </div>
            {
                locationError && <small style={{ color: 'red' }}>You Selected an Invalid Location</small>
            }

        </React.Fragment>
    )
}



export default GoogleAutocomplete