import React, { useState, useRef } from 'react'
import Modal from '@material-ui/core/Modal'
import { connect } from 'react-redux'


import FileDetails from './details/FileDetails'
import FileUploadStyle from './style/FileStyle'
import { uploadProfilePicture } from '../../../store/actions/ProfileActions'




const UploadModal = ({ openModal, handleCloseModal, type, filePreviewUrl, fileUrl, updateProfilePicture, profile }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [canvasUrl, setCanvasUrl] = useState('')
    const imageFileRef = useRef(null)

    const goToNextStep = (url, canvasStyle, filterName) => {
        setActiveStep(prev => prev + 1)
        setCanvasUrl(url)
        // localStorage.setItem('canvasStyle', JSON.stringify(canvasStyle))
        // localStorage.setItem('filterName', JSON.stringify(filterName))
    }

    window.onbeforeunload = function () {
        localStorage.removeItem('imageRotation')
        localStorage.removeItem('imageWidth')
        localStorage.removeItem('filterStyle')
        localStorage.removeItem('imageStyle')
    }

    const goToPreviousStep = () => {
        setActiveStep(prev => prev - 1)
    }

    const convertUrlToFileObject = async (url) => {
        const response = await fetch(url)
        const blob = await response.blob()
        const file = new File([blob], `${fileUrl.name}`, { type: blob.type })
        imageFileRef.current = file
    }


    const handleUpdateProfilePicture = (url) => {
        convertUrlToFileObject(url)
            .then(() => {
                const data = {
                    userId: profile.userId,
                    file: imageFileRef.current
                }
                updateProfilePicture(data)
            })
    }


    const getStepContent = stepIndex => {
        switch (stepIndex) {
            case 0:
                return <FileUploadStyle
                    action={goToNextStep}
                    actionText='Next'
                    filePreviewUrl={filePreviewUrl}
                    handleCloseModal={handleCloseModal}
                    title='New Photo Post'
                />;
            case 1:
                return <FileDetails
                    goToPreviousStep={goToPreviousStep}
                    filePreviewUrl={canvasUrl}
                    fileUrl={fileUrl}
                />;
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
                {
                    type === 'feed-post' ?
                        getStepContent(activeStep)
                        :
                        <FileUploadStyle
                            filePreviewUrl={filePreviewUrl}
                            handleCloseModal={handleCloseModal}
                            title='Profile Photo'
                            actionText='Save'
                            action={handleUpdateProfilePicture}
                        />
                }
            </div>

        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile
    }
}


const mapDispatchToProps = dispatch => {
    return {
        updateProfilePicture: data => dispatch(uploadProfilePicture(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadModal)