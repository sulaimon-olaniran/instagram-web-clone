import React, { useState, useEffect, useCallback } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'



import { db } from '../../firebase/Firebase'
import EachActivity from '../../pages/mobile_activity/each_activity/EachActivity'




const PcActivityMenu = ({ anchorEl, handleClose, auth, profile }) => {
    //console.log(auth)
    const [activities, setActivities] = useState([])

    const grabAllUserNotifications = useCallback(() => {

        auth.isLoaded && !auth.isEmpty && 
        db.collection('users').doc(auth.uid)
            .collection('notifications').orderBy('time', 'desc')
            .onSnapshot(snapshot => {
                const notifications = []
                snapshot.forEach(doc => {
                    notifications.push(doc.data())
                })

                setActivities(notifications)
               
            })
    }, [ auth ])


    useEffect(() => {
        grabAllUserNotifications()

    }, [grabAllUserNotifications])



    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}

            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}

            PaperProps={{
                style: {
                    maxHeight: '20rem',
                    width : '35rem'
                },
            }}
        >
            <div>
                {
                    activities.length > 0 ?
                        activities.map((activity, i) => {
                            return (
                                <EachActivity
                                    activity={activity}
                                    profile={profile}
                                    key={activity.notificationId}
                                />
                            )
                        })
                        :
                        <MenuItem>
                            <div className='no-activity-container'>
                                <p>You currently have no activity, when you do they would appear here</p>
                            </div>
                        </MenuItem>
                }
            </div>
        </Menu>
    )
}


const mapStateToProps = state => {
    //console.log(state)
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
    }
}




export default connect(mapStateToProps)(PcActivityMenu)
//export default PcActivityMenu