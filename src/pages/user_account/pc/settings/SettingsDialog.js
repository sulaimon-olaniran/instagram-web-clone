import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'


import { signUserOut } from '../../../../store/actions/AuthActions'

const SettingsDialog = ({ handleCloseDialog, openDialog, signUserOut }) => {
    

    return (
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='pc-settings-dialog-container'>
                <div>
                    <Link to={{
                        pathname:'/accounts/edit',
                        state:{
                            component : 'password'
                        }
                    }}>
                    <Button>
                        Change Password
                    </Button>
                    </Link>
                </div>

                <div>
                    <Button>
                        Nametag
                    </Button>
                </div>

                <div>
                    <Button>
                        Apps and Websites
                    </Button>
                </div>

                <div>
                    <Button>
                        Notifications
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

                <div>
                    <Button>
                        Report a Problem
                    </Button>
                </div>

                <div>
                    <Button onClick={signUserOut}>
                        Log Out
                    </Button>
                </div>

                <div>
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                </div>

            </div>
            
        </Dialog>
    )
}


const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
    }
}



const mapDispatchToProps = (dispatch) =>{
    return{
        signUserOut: () => dispatch(signUserOut())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog)


//export default FollowDialog