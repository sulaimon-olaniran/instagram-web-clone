import React, { useRef, useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@material-ui/icons/Close'
//import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

//import { MyUnActiveSearchIcon } from '../../../../MyIcons'
import GoogleAutocomplete from './GoogleAutocomplete';



// API key of the google map
const GOOGLE_MAP_API_KEY = "AIzaSyDLLiARjzPQmTRrRvBe6Ga3siT_63NwU_A";

// load google map script
const loadGoogleMapScript = callback => {
    if (
        typeof window.google === "object" &&
        typeof window.google.maps === "object"
    ) {
        callback();
    } else {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", callback);
        //console.log('google map script got fired')
    }
};


const Location = ({ openModal, handleCloseModal }) => {
    const [loadGoogleMap, setLoadGoogleMap] = useState(false)

    useEffect(() => {
        loadGoogleMapScript(() =>{
            setLoadGoogleMap(true)
        })
    }, [])


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='location-modal-container'>
                {
                    !loadGoogleMap ? <div>Loading</div> : <GoogleAutocomplete handleCloseModal={handleCloseModal} />
                }

            </div>

        </Modal>
    )
}


export default Location