import React, { useState, useEffect, useRef, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Avatar from '@material-ui/core/Avatar'
import TextareaAutosize from 'react-textarea-autosize'
import CloseIcon from '@material-ui/icons/Close'
import { connect } from 'react-redux'


import { createPost } from '../../../../store/actions/PostsAction'
import Location from './location/Location'




const FileDetails = ({ filePreviewUrl, fileUrl, goToPreviousStep, createPost }) => {
    const [imageStyle, setImageStyle] = useState(null)
    const [locationModal, setLocationModal] = useState(false)
    const [locationDetails, setLocationDetails] = useState(null)
    const [caption, setCaption] = useState('')

    const imageFileRef = useRef()

    const convertUrlToFileObject = useCallback( async() =>{
        const response = await fetch(filePreviewUrl)
        const blob = await response.blob()
        const file = new File([blob], `${fileUrl.name}`, { type: blob.type})
        imageFileRef.current = file
    }, [filePreviewUrl, fileUrl.name])

    useEffect(() => {
        const value = localStorage.getItem('imageStyle')
        value !== null && setImageStyle(JSON.parse(value))
        convertUrlToFileObject()

    }, [convertUrlToFileObject])

    const post = {
        //"fileUrl" : filePreviewUrl,
        "caption" : caption,
        "location" : locationDetails,
        "style" : imageStyle,
        "comments" : [],
        "likes" : [],
        "time" : '3 days ago'
    }

    const handleCreatePost = () =>{
        const file = imageFileRef.current
        createPost(post, file)
    }


    const handleOpenLocationModal = () => {
        setLocationModal(true)
    }

    const handleCloseLocationModal = (location) => {
        setLocationModal(false)
        setLocationDetails(location)
    }


    const handleCaptionTextChagne = (e) =>{
        setCaption(e.target.value)
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
                <Button 
                    color='primary'
                    onClick={handleCreatePost}
                >
                    Share
                </Button>
            </div>

            <div className='text-area-contents-container'>
                <Avatar />

                <div className='text-area-input'>
                    <TextareaAutosize
                        placeholder='Write a caption...'
                        autoCorrect='off'
                        autoComplete='off'
                        maxRows={3}
                        onChange={handleCaptionTextChagne}
                    />
                </div>

                <div className='post-image-container'>
                    <img src={filePreviewUrl} alt='File' style={imageStyle} />
                </div>
            </div>

            <div className='action-button-container' >
                {
                    locationDetails === null || '' ?

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

const mapDispatchToProps = (dispatch) =>{
    return{
        createPost : (post, file) => dispatch(createPost(post, file))
    }
}


export default connect(null, mapDispatchToProps)(FileDetails)

