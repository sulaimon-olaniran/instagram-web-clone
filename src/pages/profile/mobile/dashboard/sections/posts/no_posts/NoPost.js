import React from 'react'
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { Button } from '@material-ui/core';
import UploadFiles from '../../../../../../../components/upload/UploadButton';



const NoPost = ({ from, user }) => {
    return (
        <div className='no-post-container'>
            <span className='camera-icon-container'>
                <CameraAltOutlinedIcon />
            </span>

            { from === 'account' ?
                <div className='no-post-content-container'>
                    <h1>Share Photos</h1>
                    <p>When you share photos, they will appear on your profile</p>
                    <UploadFiles
                        component={
                            <Button>
                                <label htmlFor='post-upload'>
                                    Share your first photo
                            </label>
                            </Button>
                        }
                    />
                </div>

                :

                <div className='no-post-content-container'>
                    <h1>No Posts Yet</h1>
                    <p>When {user && user.userName} posts, you'll see their posts here.</p>
                </div>
            }
        </div>
    )
}


export default NoPost