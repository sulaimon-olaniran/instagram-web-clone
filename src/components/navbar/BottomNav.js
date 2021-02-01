import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


import {
    MyActiveHomeIcon, MyUnActiveSearchIcon, UnLikedIcon, MyAddIcon,
    MyUnActiveHomeIcon, MyActiveSearchIcon, BlackLikedIcon, WhiteLikedIcon
} from '../MyIcons'

import UploadFiles from '../upload/UploadButton'
import { db } from '../../firebase/Firebase'

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

const BottomNav = ({ auth, profile, currentPage }) => {
    const [activities, setActivities] = useState([])

    const showNavBar = auth.isLoaded && auth.uid ? 'flex' : 'none'
    const classes = useStyles()


    const grabAllUserNotifications = useCallback(() => {

        auth.isLoaded && !auth.isEmpty && db.collection('users').doc(auth.uid)
            .collection('notifications').orderBy('time', 'desc')
            .onSnapshot(snapshot => {
                const notifications = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    if (data.seen === false) {
                        notifications.push(doc.data())
                    }
                })

                setActivities(notifications)
            })
    }, [auth])


    


    useEffect(() => {
        grabAllUserNotifications()

    }, [grabAllUserNotifications])


    return (
        <nav
            style={{ display: showNavBar }}
        >
            { currentPage === 'home'
                ?
                <Link to='/'>
                    <MyActiveHomeIcon
                        height='24px'
                        width='24px'
                    />
                </Link>
                :
                <Link to='/'>
                    <MyUnActiveHomeIcon
                        height='24px'
                        width='24px'
                    />
                </Link>}

            { currentPage === 'explore' ?
                <Link to='/explore'>
                    <MyActiveSearchIcon
                        height='24px'
                        width='24px'
                    />
                </Link>
                :
                <Link to='/explore'>
                    <MyUnActiveSearchIcon
                        height='24px'
                        width='24px'
                    />
                </Link>}



            <UploadFiles
                component={<MyAddIcon height='24px' width='24px' />}
            />

            { currentPage === 'activity' ?
                <Link to='/account/activity'>
                    <BlackLikedIcon
                        height='24px'
                        width='24px'
                    />
                </Link>
                :
                <div className="activity-container">
                    <Link to='/account/activity'>
                        <UnLikedIcon
                            height='24px'
                            width='24px'
                        />
                    </Link>
                    {activities.length > 0 && <span className='notification-signal' />}

                    {activities.length > 0 && 

                    <Link 
                        to='/account/activity'
                        className='activity-popover-container'
                    >
                        <WhiteLikedIcon
                            width='24px'
                            height='24px'
                        />

                        <p>{activities.length}</p>
                    </Link>}
                </div>}



            <Link to={`/account/${profile.userName}/${profile.userId}`}>
                <Avatar
                    src={profile && profile.profilePhoto}
                    className={classes.small}
                />
            </Link>

        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}


export default connect(mapStateToProps)(BottomNav)