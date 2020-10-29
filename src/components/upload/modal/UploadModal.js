import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'



import FileDetails from './details/FileDetails'
import FileUploadStyle from './style/FileStyle'




const UploadModal = ({ openModal, handleCloseModal, fileUrl, filePreviewUrl }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [canvasUrl, setCanvasUrl] = useState('')

    const goToNextStep = (url, canvasStyle, filterName) => {
        setActiveStep(prev => prev + 1)
        setCanvasUrl(url)
        // localStorage.setItem('canvasStyle', JSON.stringify(canvasStyle))
        // localStorage.setItem('filterName', JSON.stringify(filterName))
    }

    window.onbeforeunload = function(){
        localStorage.removeItem('imageRotation')
        localStorage.removeItem('imageWidth')
        localStorage.removeItem('filterStyle')
        localStorage.removeItem('imageStyle')
    }

    const goToPreviousStep = () => {
        setActiveStep(prev => prev - 1)
    }



    const getStepContent = stepIndex => {
        switch (stepIndex) {
            case 0:
                return <FileUploadStyle 
                    goToNextStep={goToNextStep} 
                    filePreviewUrl={filePreviewUrl} 
                    handleCloseModal={handleCloseModal}
                />;
            case 1:
                return <FileDetails goToPreviousStep={goToPreviousStep} filePreviewUrl={canvasUrl}/>;
            default:
                return 'Unknown stepIndex';
        }
    }




    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='upload-modal-container'>
                {getStepContent(activeStep)}
            </div>

        </Modal>
    )
}


export default UploadModal