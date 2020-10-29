import React, { useEffect, useRef } from 'react'
import CloseIcon from '@material-ui/icons/Close'


import CanvasDrawComponent from './CanvasDraw'




const StoryBody = ({ handleCloseModal, filePreviewUrl }) => {

    const imageRef = useRef(null)
    const drawingRef = useRef(null)
    const mainCanvasRef = useRef(null)

    const textRef = useRef(null)

    const downloadRef = useRef(null)

    const canvasUrl = useRef(null)

    useEffect(() => {
        const canvasContext = imageRef.current.getContext('2d')
        const mainCanvasContext = mainCanvasRef.current.getContext('2d')
        const canvasImage = new Image()


        canvasImage.onload = () => {
            imageRef.current.width = canvasImage.width
            imageRef.current.height = canvasImage.height

            canvasContext.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height)
            canvasUrl.current = imageRef.current.toDataURL()
        }

        canvasImage.src = filePreviewUrl
        canvasContext.drawImage(drawingRef.current, 0, 0)

    }, [])
    

    const downloadImage = () =>{
       const download = downloadRef.current
       const mainCanvasContext = mainCanvasRef.current.getContext('2d')
       
       mainCanvasRef.current.width = imageRef.current.width
       mainCanvasRef.current.height = imageRef.current.height

       mainCanvasContext.drawImage(imageRef.current, 0, 0)
       mainCanvasContext.drawImage(drawingRef.current, 0, 0)

       const image = mainCanvasRef.current.toDataURL()
       download.href= image
    }


    return (
        <React.Fragment>
            
            <header>
                <CloseIcon onClick={handleCloseModal} />
                <a href="#" ref={downloadRef} download='my-image.png' onClick={downloadImage} >Download Image</a>
            </header>
            <canvas ref={mainCanvasRef} />
            <canvas ref={imageRef} />
            <CanvasDrawComponent canvasRef={drawingRef} />
            {/* <canvas ref={textRef} /> */}
        </React.Fragment>
    )
}


export default StoryBody

