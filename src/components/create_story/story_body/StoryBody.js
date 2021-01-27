import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import GetAppIcon from '@material-ui/icons/GetApp'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import WidgetsIcon from '@material-ui/icons/Widgets'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from 'react-redux'


import CanvasDrawComponent from './canvas_draw/CanvasDraw'
import AddIconDrawer from './add_icon/AddIcon'
import IconCanvas from './add_icon/IconCanvas'
import DiscardDialog from './discard_dialog/DiscardDialog'
import { addStory } from '../../../store/actions/StoryAction'
import GradientLoader from '../../loaders/gradient/GradientLoader'




const StoryBody = ({ handleCloseModal, filePreviewUrl, fileUrl, addStory, addingStory, profile }) => {
   
     
    const [iconDrawer, setIconDrawer] = useState(false)
    const [iconUrl, setIconUrl] = useState(null)
    const [activeCanvas, setActiveCanvas] = useState('icons')
    const [discardDialog, setDiscardDialog] = useState(false)
    const imageRef = useRef(null) // holds the displayed image
    const drawingRef = useRef(null) //used to draw lines over image
    const mainCanvasRef = useRef(null) //brings all ref together as one image
    const imageFileRef = useRef(null) //ref to convert canvas image url back into a file

    const iconRef = useRef(null)

    const downloadRef = useRef(null)

    //const canvasUrl = useRef(null)

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


            canvasContext.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height,
            centerShiftX, centerShiftY, canvasImage.width * ratio, canvasImage.height * ratio)

            downloadRef.current = imageRef.current.toDataURL()
        }

        canvasImage.setAttribute('crossorigin', 'anonymous')

        canvasImage.src = filePreviewUrl

        canvasContext.fillStyle = "rgb(99, 99, 99)"
        canvasContext.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)

    }, [ filePreviewUrl ])


    //draws all cavas include image canvas, icon canvas and drawing canvas all to one canvas
    const prepareImageUrl = () =>{
        const mainCanvasContext = mainCanvasRef.current.getContext('2d')
       

        mainCanvasRef.current.width = imageRef.current.width
        mainCanvasRef.current.height = imageRef.current.height

        mainCanvasContext.drawImage(imageRef.current, 0, 0, imageRef.current.width, imageRef.current.height)
        mainCanvasContext.drawImage(drawingRef.current, 0, 0, imageRef.current.width, imageRef.current.height)
        mainCanvasContext.drawImage(iconRef.current, 0, 0, imageRef.current.width, imageRef.current.height)

    }


    const downloadImage = () => {
        const download = downloadRef.current
        prepareImageUrl()

        const image = mainCanvasRef.current.toDataURL()
        download.href = image
    }

    const convertUrlToFileObject = async (url) => {
        const response = await fetch(url)
        const blob = await response.blob()
        const file = new File([blob], `${fileUrl.name}`, { type: blob.type })
        imageFileRef.current = file
    }
   
    const handleAddStoryToDatabase = () =>{
        prepareImageUrl()

        const url = mainCanvasRef.current.toDataURL()
       
        convertUrlToFileObject(url)
        .then(() => {
            const data = {
                userId: profile.userId,
                file: imageFileRef.current
            }
            addStory(data)
            
        })

    }

    return (
        <React.Fragment>
            {addingStory && <GradientLoader /> }
            {addingStory &&
                <div className='creating-story-loader-container'>
                    <p>Creating Story</p>
                </div>
            }
            {   activeCanvas !== 'drawing' &&
                <header>
                    <CloseIcon onClick={handleOpenDiscardDialog} />
                    <div>
                        <a href={downloadRef} ref={downloadRef} download='my-image.png' onClick={downloadImage} >
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
                <button 
                    disabled={addingStory}
                    onClick={handleAddStoryToDatabase}
                    className='add-story-button'
                >
                    <AddCircleIcon />
                    <p>Add to story</p>
                </button>
            }
        </React.Fragment>
    )
}

const mapStateToProps = state =>{
    
    return{
        addingStory : state.story.addingStory,
        fileUrl : state.story.fileUrl,
        filePreviewUrl : state.story.filePreviewUrl,
        profile : state.firebase.profile
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addStory : data => dispatch(addStory(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoryBody)
