import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'



import { SettingsIcon } from '../../../components/MyIcons'
import DashBoard from '../../profile/mobile/dashboard/DashBoard'
import FollowersButton from '../../profile/pc/follow/FollowersButton'
import FollowingButton from '../../profile/pc/follow/FollowingButton'
import SettingsDialog from './settings/SettingsDialog'


const useStyles = makeStyles((theme) => ({
    xLarge: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },

    button: {
        width: '100%',
    },
}));


const PcUserAccount = ({ userData, userPosts }) =>{
    const [settingsDialog, setSettingsDialog] = useState(false)
    const classes = useStyles()


    const handleOpenSettingsDialog = () =>{
        setSettingsDialog(true)
    }



    const handleCloseSettingsDialog = () =>{
        setSettingsDialog(false)
    }


    return(
        <div className='pc-user-account-container'>
            {settingsDialog &&
            <SettingsDialog
                openDialog={settingsDialog}
                handleCloseDialog={handleCloseSettingsDialog}
            />}


            <div className='user-account-information-container'>
                <Avatar
                    className={classes.xLarge}
                    src={userData.profilePhoto}
                />

                <div className='user-account-details-container'>
                    <section className='first-section'>
                        <p>{userData.userName}</p>
                        <Button
                            variant='outlined'
                        >
                            <Link to='/accounts/edit'>
                                Edit Profile
                            </Link>
                        </Button>

                        <SettingsIcon 
                            width='24px' 
                            height='24px' 
                            action={handleOpenSettingsDialog}
                        />
                    </section>


                    <section className='second-section'>
                        <Button>
                            <div>
                                <p>{ userPosts.length }</p>
                                <small>posts</small>
                            </div>
                        </Button>

                        <FollowersButton
                            userProfile={userData}
                        />

                        <FollowingButton
                            userProfile={userData}
                        />
                    </section>

                    <section className='third-section'>
                        <h3>{userData.fullName}</h3>
                        <p>{userData.bio}</p>
                        <a href={userData.website} target="_blank" rel="noopener noreferrer">
                            {userData.website}
                        </a>
                    </section>
                    
                </div>

            </div>

            <DashBoard 
                posts={userPosts && userPosts}
                user={userData && userData}  
                from='account'
            />

        </div>
    )
}




export default PcUserAccount