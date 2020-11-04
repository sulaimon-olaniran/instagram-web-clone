import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import GetAppIcon from '@material-ui/icons/GetApp'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import WidgetsIcon from '@material-ui/icons/Widgets'


import CanvasDrawComponent from './canvas_draw/CanvasDraw'
import AddIconDrawer from './add_icon/AddIcon'
import IconCanvas from './add_icon/IconCanvas'




const StoryBody = ({ handleCloseModal, filePreviewUrl }) => {
    const [iconDrawer, setIconDrawer] = useState(false)
    const [iconUrl, setIconUrl] = useState(null)
    const imageRef = useRef(null) // holds the displayed image
    const drawingRef = useRef(null) //used to draw lines over image
    const mainCanvasRef = useRef(null) //brings all ref together as one image

    const iconRef = useRef(null)

    const downloadRef = useRef(null)

    const canvasUrl = useRef(null)

    const handleOpenIconDrawer = () => {
        setIconDrawer(true)
    }

    const handleCloseIconDrawer = () => {
        setIconDrawer(false)
    }

    const handleSetIconUrl = (url) => {
        setIconUrl(url)
        setIconDrawer(false)
    }

    useEffect(() => {
        const canvasContext = imageRef.current.getContext('2d')
        const mainCanvasContext = mainCanvasRef.current.getContext('2d')
        const canvasImage = new Image()

        canvasContext.fillStyle = "rgb(99, 99, 99)"
        canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight)

        imageRef.current.width = window.innerWidth * 2;
        imageRef.current.height = window.innerHeight * 2;
        imageRef.current.style.width = `${window.innerWidth}px`
        imageRef.current.style.height = `${window.innerHeight}px`


        canvasImage.onload = () => {
            // drawingRef.current.width = canvasImage.width
            // drawingRef.current.height = canvasImage.height

            const hRatio = imageRef.current.width / canvasImage.width
            const vRatio = imageRef.current.height / canvasImage.height
            const ratio = Math.min(hRatio, vRatio)

            const centerShiftX = (imageRef.current.width - canvasImage.width * ratio) / 2
            const centerShiftY = (imageRef.current.height - canvasImage.height * ratio) / 2

            //canvasContext.clearRect(0, 0, imageRef.current.width, imageRef.current.height)

            canvasContext.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height,
                centerShiftX, centerShiftY, canvasImage.width * ratio, canvasImage.height * ratio)

            canvasUrl.current = imageRef.current.toDataURL()
        }

        canvasImage.src = filePreviewUrl

        canvasContext.fillStyle = "rgb(99, 99, 99)"
        canvasContext.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)

    }, [])


    const downloadImage = () => {
        const download = downloadRef.current
        const mainCanvasContext = mainCanvasRef.current.getContext('2d')
        const canvasContext = drawingRef.current.getContext('2d')

        // canvasContext.fillStyle = "rgb(99, 99, 99)"
        // canvasContext.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)

        mainCanvasRef.current.width = imageRef.current.width
        mainCanvasRef.current.height = imageRef.current.height

        mainCanvasContext.drawImage(imageRef.current, 0, 0, imageRef.current.width, imageRef.current.height)
        mainCanvasContext.drawImage(drawingRef.current, 0, 0, imageRef.current.width, imageRef.current.height)

        const image = mainCanvasRef.current.toDataURL()
        download.href = image
    }

    return (
        <React.Fragment>

            <header>
                <CloseIcon onClick={handleCloseModal} />
                <div>
                    <a href="#" ref={downloadRef} download='my-image.png' onClick={downloadImage} >
                        <GetAppIcon />
                    </a>
                    <WidgetsIcon onClick={handleOpenIconDrawer} />
                    <BorderColorIcon />
                </div>
            </header>
            
            <canvas ref={mainCanvasRef} style={{ visibility: 'hidden' }} />
            <canvas ref={imageRef} />
            <CanvasDrawComponent canvasRef={drawingRef} imageRef={imageRef} />

            {/* <IconCanvas canvasRef={iconRef} imageUrl={iconUrl} /> */}
            {/* <canvas ref={textRef} /> */}
            <AddIconDrawer
                openDrawer={iconDrawer}
                handleCloseDrawer={handleCloseIconDrawer}
                handleSetIconUrl={handleSetIconUrl}
            />
        </React.Fragment>
    )
}


export default StoryBody

