import React from 'react'
import { connect } from 'react-redux'



//import UploadModal from './modal/UploadModal'
import { openCreatePostModal } from '../../store/actions/PostsAction'



const UploadFiles = ({ component, openCreatePostModal }) => {
    // const [fileUrl, setFileUrl] = useState(null)
    // const [filePreviewUrl, setFilePreviewUrl] = useState(null)
    // const [openModal, setOpenModal] = useState(false)


    const handleInputChange = e => {
        if (e.target.files[0]) {
            // setFileUrl(e.target.files[0])
            // setFilePreviewUrl(URL.createObjectURL(e.target.files[0]))
            // setOpenModal(true)
            const data = {
                fileUrl: e.target.files[0],
                filePreviewUrl: URL.createObjectURL(e.target.files[0])
            }
            openCreatePostModal(data)
        }
    }


    // const handleCloseModal = () => {
    //     setOpenModal(false)
    //     localStorage.removeItem('imageRotation')
    //     localStorage.removeItem('imageWidth')
    //     localStorage.removeItem('filterStyle')
    //     localStorage.removeItem('imageStyle')
    // }



    return (
        <label>
            <input
                type="file"
                onChange={handleInputChange}
                accept="image/png, .jpeg, .jpg, image/gif"
                style={{ display: 'none' }}
                id='post-upload'
            />
            {component}
        </label>
    )
}




const mapDispatchToProps = dispatch => {
    return {
        openCreatePostModal: data => dispatch(openCreatePostModal(data))
    }
}



export default connect(null, mapDispatchToProps)(UploadFiles)