import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Avatar from '@material-ui/core/Avatar'
import TextareaAutosize from 'react-textarea-autosize'
import CloseIcon from '@material-ui/icons/Close'



import Location from './location/Location'




const FileDetails = ({ filePreviewUrl, goToPreviousStep }) => {
    const [imageStyle, setImageStyle] = useState(null)
    const [locationModal, setLocationModal] = useState(false)
    const [locationDetails, setLocationDetails] = useState(null)

    useEffect(() => {
        const value = localStorage.getItem('imageStyle')
        value !== null && setImageStyle(JSON.parse(value))
    }, [])

    const handleOpenLocationModal = () => {
        setLocationModal(true)
    }

    const handleCloseLocationModal = (location) => {
        setLocationModal(false)
        setLocationDetails(location)
    }


    return (
        <div className='file-details-container'>
            <Location
                openModal={locationModal}
                handleCloseModal={handleCloseLocationModal}
            />
            <div className='top-nav-container'>
                <ArrowBackIosIcon onClick={goToPreviousStep} />
                <p>New Post</p>
                <Button color='primary'>Share</Button>
            </div>

            <div className='text-area-contents-container'>
                <Avatar />

                <div className='text-area-input'>
                    <TextareaAutosize
                        placeholder='Write a caption...'
                        autoCorrect='off'
                        autoComplete='off'
                        maxRows={3}
                    />
                </div>

                <div className='post-image-container'>
                    <img src={filePreviewUrl} alt='File' style={imageStyle} />
                </div>
            </div>

            <div className='action-button-container' >
                {
                    locationDetails === null ?

                    <React.Fragment>
                        <Button onClick={handleOpenLocationModal}>Add Location</Button>
                        <ArrowForwardIosIcon onClick={handleOpenLocationModal} />
                    </React.Fragment>
                         :

                    <React.Fragment>
                        <p>{locationDetails.address}</p>
                        <CloseIcon fontSize='small' onClick={ () => setLocationDetails(null)} />
                    </React.Fragment>
                }
            </div>


        </div>
    )
}


export default FileDetails

