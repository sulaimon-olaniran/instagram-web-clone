import React, { useState } from 'react'
//import { Redirect } from 'react-router-dom'


import { MyAddIcon } from '../MyIcons'
import UploadModal from './modal/UploadModal'



const UploadFiles = () => {
    const [fileUrl, setFileUrl] = useState(null)
    const [filePreviewUrl, setFilePreviewUrl] = useState(null)
    const [openModal, setOpenModal] = useState(false)


    const handleInputChange = e => {
        if (e.target.files[0]) {
            setFileUrl(e.target.files[0])
            setFilePreviewUrl(URL.createObjectURL(e.target.files[0]))
            setOpenModal(true)
        }
    }


    const handleCloseModal = () =>{
        setOpenModal(false)
        localStorage.removeItem('imageRotation')
        localStorage.removeItem('imageWidth')
        localStorage.removeItem('filterStyle')
        localStorage.removeItem('imageStyle')
    }



    return (
        <React.Fragment>
            <label>
                <input
                    type="file"
                    onChange={handleInputChange}
                    accept="image/png, .jpeg, .jpg, image/gif"
                    style={{ display: 'none' }}
                />
                <MyAddIcon height='24px' width='24px' />
            </label>
            
            <UploadModal 
               openModal={openModal}
               handleCloseModal={handleCloseModal}
               fileUrl={fileUrl}
               filePreviewUrl={filePreviewUrl}
            />
        </React.Fragment>
    )
}



export default UploadFiles