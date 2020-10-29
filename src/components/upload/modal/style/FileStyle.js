import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import HorizontalScroller from 'react-horizontal-scroll-container'
//import Caman from 'caman'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'
import CachedIcon from '@material-ui/icons/Cached'


import normal_filter from './assets/normal_filter.jpg'
import clarendon_filter from './assets/clarendon_filter.jpg'
import gingham_filter from './assets/gingham_filter.jpg'
import moon_filter from './assets/moon_filter.jpg'
import lark_filter from './assets/lark_filter.jpg'
import reyes_filter from './assets/reyes_filter.jpg'
import juno_filter from './assets/juno_filter.jpg'
import slumber_filter from './assets/slumber_filter.jpg'
import crema_filter from './assets/crema_filter.jpg'
import ludwig_filter from './assets/ludwig_filter.jpg'
import aden_filter from './assets/aden_filter.jpg'
import perpetua_filter from './assets/perpetua_filter.jpg'



const FileUploadStyle = ({ goToNextStep, filePreviewUrl, handleCloseModal }) => {
    const [filterStyle, setFilterStyle] = useState(() => {
        const value = localStorage.getItem('filterStyle')
        return value !== null ? JSON.parse(value) : ''
    })


    const [activeStyling, setActiveStyling] = useState('filter')

    const [imageWidth, setImageWidth] = useState( () =>{
        const value = localStorage.getItem('imageWidth')
        return value !== null ? JSON.parse(value) : 100
    })

    const [imageRotation, setImageRotation] = useState(() =>{
        const value = localStorage.getItem('imageRotation')
        return value !== null ? JSON.parse(value) : 0
    })
    

    const canvasRef = useRef(null)
    const canvasUrl = useRef(null)

    const canvasStyle = {
        width: `${imageWidth}%`,
        transform: `rotate(${imageRotation}deg)`
    }

    useEffect(() => {
        localStorage.setItem('imageStyle', JSON.stringify(canvasStyle))
        localStorage.setItem('imageWidth', JSON.stringify(imageWidth))
        localStorage.setItem('imageRotation', JSON.stringify(imageRotation))

        const canvasContext = canvasRef.current.getContext('2d')
        const canvasImage = new Image()


        canvasImage.onload = () => {
            canvasRef.current.width = canvasImage.width
            canvasRef.current.height = canvasImage.height

            canvasContext.filter = filterStyle
            canvasContext.save()

            canvasContext.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height)
            canvasUrl.current = canvasRef.current.toDataURL()
        }

        canvasImage.src = filePreviewUrl


    }, [filePreviewUrl, filterStyle, canvasUrl, canvasStyle, imageRotation, imageWidth])




    const switchActiveStylingToFilter = () => {
        setActiveStyling('filter')
    }



    const switchActiveStylingToEdit = () => {
        setActiveStyling('edit')
    }



    const toggleImageWidth = () => {
        setImageWidth(prev => {
            return prev === 100 ? 80 : 100
        })
    }



    const handleImageRotation = () => {
        setImageRotation(prev => {
            return prev < 270 ? prev + 90 : 0
        })
    }



    const filters = [
        {
            name: 'Normal',
            className: "",
            sample: normal_filter,
            filter: ''
        },

        {
            name: 'Clarendon',
            className: "toaster",
            sample: clarendon_filter,
            filter: 'contrast(1.5) brightness(.9)'
        },

        {
            name: 'Gingham',
            className: "gingham",
            sample: gingham_filter,
            filter: 'brightness(1.05) hue-rotate(-10deg)'
        },

        {
            name: 'Moon',
            className: "inkwell",
            sample: moon_filter,
            filter: 'sepia(.3) contrast(1.1) brightness(1.1) grayscale(1)'
        },

        {
            name: 'Lark',
            className: "walden",
            sample: lark_filter,
            filter: 'brightness(1.1) hue-rotate(-10deg) sepia(.3) saturate(1.6)'
        },

        {
            name: 'Reyes',
            className: "reyes",
            sample: reyes_filter,
            filter: 'sepia(.22) brightness(1.1) contrast(.85) saturate(.75)'
        },

        {
            name: 'Juno',
            className: "lofi",
            sample: juno_filter,
            filter: 'saturate(1.1) contrast(1.5)'
        },

        {
            name: 'Slumber',
            className: "brooklyn",
            sample: slumber_filter,
            filter: 'contrast(.9) brightness(1.1)'
        },

        {
            name: 'Crema',
            className: "earlybird",
            sample: crema_filter,
            filter: 'contrast(.9) sepia(.2)'
        },

        {
            name: 'Ludwig',
            className: "_1977",
            sample: ludwig_filter,
            filter: 'contrast(1.1) brightness(1.1) saturate(1.3)'
        },

        {
            name: 'Aden',
            className: "aden",
            sample: aden_filter,
            filter: 'hue-rotate(-20deg) contrast(.9) saturate(.85) brightness(1.2)'
        },

        {
            name: 'Perpetua',
            className: "perpetua",
            sample: perpetua_filter,
            filter: 'brightness(1.1) hue-rotate(-10deg) sepia(.3) saturate(1.6)'
        },
    ]

    const handleFilterStyle = filter => {
        setFilterStyle(filter)
        localStorage.setItem('filterStyle', JSON.stringify(filter))
    }


    return (
        <div className='upload-file-style-container'>

            <div className='upload-file-nav-container'>
                <CloseIcon onClick={handleCloseModal} />
                <p>New Photo Post</p>
                <Button onClick={() => goToNextStep(canvasUrl.current)} color='primary'>Next</Button>
            </div>


            <figure className={`upload-file-image-container`}>
                {
                    activeStyling === 'edit'

                    &&

                    <div className='edit-active-lines-overlay'>
                        <div className='left-div'></div>
                        <div className='right-div'></div>
                        <div className='top-div'></div>
                        <div className='bottom-div'></div>

                        <div className='button-container resize-button-container'
                            onClick={toggleImageWidth}
                        >
                            <AspectRatioIcon />
                        </div>

                        <div className='button-container rotate-button-container'
                            onClick={handleImageRotation}
                        >
                            <CachedIcon />
                        </div>
                    </div>
                }

                <canvas
                    ref={canvasRef}
                    style={canvasStyle}
                />

            </figure>


            {
                activeStyling === 'filter'
                &&
                <div className='upload-file-filters-container'>
                    <HorizontalScroller>
                        {
                            filters.map(filter => (
                                <div key={filter.name} className='each-filter-container' onClick={() => handleFilterStyle(filter.filter)}>
                                    <small>{filter.name}</small>
                                    <img src={filter.sample} alt="Filter" />
                                </div>
                            ))
                        }
                    </HorizontalScroller>
                </div>
            }


            <div className='edit-filter-selection-container'>
                <div className={`each-selection ${activeStyling === 'filter' ? 'active-styling' : 'not-active-styling'}`}>
                    <Button onClick={switchActiveStylingToFilter}>Filter</Button>
                </div>

                <div className={`each-selection ${activeStyling === 'edit' ? 'active-styling' : 'not-active-styling'}`}>
                    <Button onClick={switchActiveStylingToEdit}>Edit</Button>
                </div>

            </div>


        </div>
    )
}




export default FileUploadStyle