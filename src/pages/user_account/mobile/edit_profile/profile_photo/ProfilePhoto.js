import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import UploadModal from '../../../../../components/upload/modal/UploadModal'





const ProfilePhoto = () => {
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
    }


    return (
        <div className='edit-profile-photo-container'>
            <Avatar
                src='https://source.unsplash.com/random/600x600/?kid'
            />

            <section>
                <h3>Sulai_m0n</h3>
                
                    <input
                        type="file"
                        onChange={handleInputChange}
                        accept="image/png, .jpeg, .jpg, image/gif"
                        style={{ display: 'none' }}
                        id='profile-photo'
                    />

                    <Button><label htmlFor='profile-photo'>Change Profile Photo</label></Button>
            </section>

            <UploadModal 
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                fileUrl={fileUrl}
                filePreviewUrl={filePreviewUrl}
                type='profile-photo'
            />

        </div>
    )
}



export default ProfilePhoto