import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import GetAppIcon from '@material-ui/icons/GetApp'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import WidgetsIcon from '@material-ui/icons/Widgets'
import AddCircleIcon from '@material-ui/icons/AddCircle';


import CanvasDrawComponent from './canvas_draw/CanvasDraw'
import AddIconDrawer from './add_icon/AddIcon'
import IconCanvas from './add_icon/IconCanvas'
import DiscardDialog from './discard_dialog/DiscardDialog'




const StoryBody = ({ handleCloseModal, filePreviewUrl }) => {
    const [iconDrawer, setIconDrawer] = useState(false)
    const [iconUrl, setIconUrl] = useState(null)
    const [activeCanvas, setActiveCanvas] = useState('icons')
    const [discardDialog, setDiscardDialog] = useState(false)
    const imageRef = useRef(null) // holds the displayed image
    const drawingRef = useRef(null) //used to draw lines over image
    const mainCanvasRef = useRef(null) //brings all ref together as one image

    const iconRef = useRef(null)

    const downloadRef = useRef(null)

    const canvasUrl = useRef(null)

    const handleOpenIconDrawer = () => {
        setIconDrawer(true)
        setActiveCanvas('icons')
    }

    const handleCloseIconDrawer = () => {
        setIconDrawer(false)
    }

    const handleSetIconUrl = (url) => {
        setIconUrl(url)
        setIconDrawer(false)
    }

    const handleOpenDiscardDialog = () =>{
        setDiscardDialog(true)
    }

    const handleCloseDiscardDialog = () =>{
        setDiscardDialog(false)
    }

    useEffect(() => {
        const canvasContext = imageRef.current.getContext('2d')
        const canvasImage = new Image()

        canvasContext.fillStyle = "rgb(99, 99, 99)"
        canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight)

        imageRef.current.width = window.innerWidth * 2;
        imageRef.current.height = window.innerHeight * 2;
        imageRef.current.style.width = `${window.innerWidth}px`
        imageRef.current.style.height = `${window.innerHeight}px`


        canvasImage.onload = () => {
            const hRatio = imageRef.current.width / canvasImage.width
            const vRatio = imageRef.current.height / canvasImage.height
            const ratio = Math.min(hRatio, vRatio)

            const centerShiftX = (imageRef.current.width - canvasImage.width * ratio) / 2
            const centerShiftY = (imageRef.current.height - canvasImage.height * ratio) / 2

            //canvasContext.clearRect(0, 0, imageRef.current.width, imageRef.current.height)

            canvasContext.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height,
            centerShiftX, centerShiftY, canvasImage.width * ratio, canvasImage.height * ratio)

            downloadRef.current = imageRef.current.toDataURL()
        }

        canvasImage.setAttribute('crossorigin', 'anonymous')

        canvasImage.src = filePreviewUrl

        canvasContext.fillStyle = "rgb(99, 99, 99)"
        canvasContext.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)

    }, [])


    const downloadImage = () => {
        const download = downloadRef.current
        const mainCanvasContext = mainCanvasRef.current.getContext('2d')
        const canvasContext = drawingRef.current.getContext('2d')

        mainCanvasRef.current.width = imageRef.current.width
        mainCanvasRef.current.height = imageRef.current.height

        mainCanvasContext.drawImage(imageRef.current, 0, 0, imageRef.current.width, imageRef.current.height)
        mainCanvasContext.drawImage(drawingRef.current, 0, 0, imageRef.current.width, imageRef.current.height)
        mainCanvasContext.drawImage(iconRef.current, 0, 0, imageRef.current.width, imageRef.current.height)

        const image = mainCanvasRef.current.toDataURL()
        //image.crossOrigin="anonymous"
        download.href = image
    }

    return (
        <React.Fragment>

            {   activeCanvas !== 'drawing' &&
                <header>
                    <CloseIcon onClick={handleOpenDiscardDialog} />
                    <div>
                        <a href="#" ref={downloadRef} download='my-image.png' onClick={downloadImage} >
                            <GetAppIcon />
                        </a>
                        <WidgetsIcon onClick={handleOpenIconDrawer} />
                        <BorderColorIcon onClick={() => setActiveCanvas('drawing')}/>
                    </div>
                </header>
            }
            
            <canvas ref={mainCanvasRef} style={{ visibility: 'hidden' }} />

            <canvas ref={imageRef} />

            <CanvasDrawComponent 
                canvasRef={drawingRef} 
                imageRef={imageRef} 
                activeCanvas={activeCanvas}
                setActiveCanvas={setActiveCanvas}
            />

            <IconCanvas 
                canvasRef={iconRef} 
                imageUrl={iconUrl} 
                activeCanvas={activeCanvas}
                setActiveCanvas={setActiveCanvas}
            />
            
            <AddIconDrawer
                openDrawer={iconDrawer}
                handleCloseDrawer={handleCloseIconDrawer}
                handleSetIconUrl={handleSetIconUrl}
            />

            <DiscardDialog 
               openDialog={discardDialog}
               handleCloseDialog={handleCloseDiscardDialog}
               handleCloseModal={handleCloseModal}
            />

            { activeCanvas !== 'drawing' &&
                <button className='add-story-button'>
                    <AddCircleIcon />
                    <p>Add to story</p>
                </button>
            }
        </React.Fragment>
    )
}


export default StoryBody
