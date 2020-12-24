import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import {EditProfileTheme} from '../../mobile/edit_profile/EditProfile'
import { connect } from 'react-redux'


import FormikChangePassword from '../../../change_password/ChangePassoword'
import LogoLoader from '../../../../components/loaders/LogoLoader'


const PcEditProfile = ({ profile, location }) => {
    const { state } = location
    const [activeComponent, setActiveComponent] = useState(state? state.component : 'profile')

    //console.log(location.state)

    if(profile.isLoade) return <LogoLoader />
    return (
        <div className='pc-edit-profile-main-container'>
            <div className='pc-edit-profile-sub-container'>

                <div className='side-navigation-container'>
                    <div className={activeComponent === 'profile' ? 'active' : null}>
                        <Button onClick={() => setActiveComponent('profile')}>
                            Edit Profile
                    </Button>
                    </div>

                    <div className={activeComponent === 'password' ? 'active' : null}>
                        <Button onClick={() => setActiveComponent('password')}>
                            Change Password
                    </Button>
                    </div>

                    <div>
                        <Button>
                            Apps and Websites
                    </Button>
                    </div>

                    <div>
                        <Button>
                            Email and SMS
                    </Button>
                    </div>

                    <div>
                        <Button>
                            Push Notifications
                    </Button>
                    </div>

                    <div>
                        <Button>
                            Manage Contacts
                    </Button>
                    </div>

                    <div>
                        <Button>
                            Privacy and Security
                    </Button>
                    </div>

                    <div>
                        <Button>
                            Login Activity
                    </Button>
                    </div>

                    <div>
                        <Button>
                            Emails from Instagram
                    </Button>
                    </div>


                </div>

                <div className='main-contents-container'>
                    {
                        activeComponent === 'profile' ?
                            <EditProfileTheme profile={profile} />
                            :
                            <FormikChangePassword />
                    }

                </div>
            </div>

        </div>
    )
}



const mapStateToProps = state =>{
    return{
        profile : state.firebase.profile
    }
}

export default connect(mapStateToProps)(PcEditProfile)