import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


import instagram_img from './assets/instagram_img.png'
import { MyActiveHomeIcon, MyUnActiveHomeIcon, UnLikedIcon, MyDirectIcon, 
MyActiveExploreIcon, MyUnActiveExploreIcon, WhiteLikedIcon } from '../../MyIcons'

import PcSearchBox from '../../search_box/SearchBox'
import PcActivityMenu from '../../pc_activity/PcActivityMenu'
import PcSearchResults from '../../../pages/expolore/search/pc/PcSearchResults'
import { db } from '../../../firebase/Firebase'
//import NotificationPopover from '../../notification_pop/NotificationPopover'


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


const TopPcNav = ({ inputValue, searchResults, profile, auth }) => {
    const [activityMenu, setActivityMenu] = useState(null)
    const [activeIcon, setActiveIcon] = useState(null)
    const [activities, setActivities] = useState([])
    //const [popover, setPopover] = useState(false)
    const classes = useStyles()
    

    const showNavBar = auth.isLoaded && auth.isEmpty ? 'show-nav' : 'hide-nav'




    const elementRef = useRef(null)

    
    const grabAllUserNotifications = useCallback(() =>{
        
        auth.isLoaded && !auth.isEmpty && db.collection('users').doc('9G6R635DzajdJA0ht6Ng')
        .collection('notifications').orderBy('time', 'desc')
        .onSnapshot(snapshot =>{
            const notifications = []
            snapshot.forEach(doc =>{
                const data = doc.data()
                if(data.seen === false){
                    notifications.push(doc.data())
                }
            })
            
            setActivities(notifications)
        })
    }, [ auth])



    useEffect(() =>{
        grabAllUserNotifications()

    }, [ grabAllUserNotifications ])


    const handleActiveIcon = active => {
        setActiveIcon(active)
    }

    
    const disableUnreadNotifications = () =>{
        
        activities.map(activity =>{
            return db.collection('users').doc('9G6R635DzajdJA0ht6Ng')
            .collection('notifications').doc(activity.notificationId)
            .update({
                seen : true
            })
        })
    }

    
    const handleOpenActivityMenu = () => {
        setActivityMenu(elementRef.current)
        disableUnreadNotifications()
    }

    const handleCloseActivityMenu = () => {
        setActivityMenu(null)
        //handleActiveIcon('activity')
    }





    

    return (
        <div 
            className={`top-pc-nav-container ${showNavBar}`}>

            {activityMenu !== null &&
             <PcActivityMenu
                anchorEl={activityMenu}
                handleClose={handleCloseActivityMenu}
            />}
            <div className='nav-contents'>
                <Link to='/'>
                    <img src={instagram_img} alt="logo" />
                </Link>

                <PcSearchBox />

                {searchResults && <PcSearchResults inputValue={inputValue} />}

                <div className='nav-content-links-container'>
                    <Link to='/'>
                        {activeIcon === 'home' ?
                            <MyActiveHomeIcon
                                height='24px'
                                width='24px'
                            />
                            :
                            <MyUnActiveHomeIcon
                                height='24px'
                                width='24px'
                                action={() => handleActiveIcon('home')}
                            />
                        }
                    </Link>



                    <Badge badgeContent={1} color="secondary">
                        <MyDirectIcon
                            height='24px'
                            width='24px'
                        />
                    </Badge>


                    <Link
                        to='/explore'
                    >

                        {
                            activeIcon === 'explore' ?
                                <MyActiveExploreIcon
                                    height='24px'
                                    width='24px'
                                />
                                :
                                <MyUnActiveExploreIcon
                                    height='24px'
                                    width='24px'
                                    action={() => handleActiveIcon('explore')}
                                />
                        }

                    </Link>


                    <div className='activity-container' ref={elementRef}>
                        <UnLikedIcon
                            height='24px'
                            width='24px'
                            action={handleOpenActivityMenu}
                        />

                        {activities.length > 0 && <span className='notification-signal' />}

                        {activities.length > 0 && <div className='activity-popover-container'>
                            <WhiteLikedIcon
                                width='24px'
                                height='24px'
                                action={handleOpenActivityMenu}
                            />

                            <p>{activities.length}</p>
                        </div>}
                    </div>
                        

                    <Link
                        to={`/account/${profile && profile.userName}/${profile && profile.userId}`}
                    >

                        <Avatar
                            className={classes.small}
                            onClick={() => handleActiveIcon('')}
                        />
                    </Link>
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = state => {
    //console.log(state)
    return {
        inputValue: state.application.inputValue,
        searchResults: state.application.searchResults,
        profile: state.firebase.profile,
        auth : state.firebase.auth,

    }
}

export default connect(mapStateToProps)(TopPcNav)