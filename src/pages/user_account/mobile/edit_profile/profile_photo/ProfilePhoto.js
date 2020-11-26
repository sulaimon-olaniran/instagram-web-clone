import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'


import UploadModal from '../../../../../components/upload/modal/UploadModal'
import {  uploadProfilePicture } from '../../../../../store/actions/ProfileActions'





const ProfilePhoto = ({ profile }) => {
   // console.log(profile)
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
                src={profile.profilePhoto}
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


const mapDispatchToProps = dispatch =>{
    return {
        updateProfilePicture : data => dispatch(uploadProfilePicture(data))
    }
}


export default connect(null, mapDispatchToProps)(ProfilePhoto)