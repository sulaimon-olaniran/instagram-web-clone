import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


import { db } from '../../firebase/Firebase'
import EachActivity from './each_activity/EachActivity'
import Suggestions from '../suggestions/Suggestions'



const MobileAccountActivity = ({ profile, setCurrentPage, auth }) =>{
    const [activities, setActivities] = useState([])

    const mountedRef = useRef(true)

    const grabAllUserNotifications = useCallback(() =>{
      
        auth.isLoaded && !auth.isEmpty && db.collection('users').doc(auth.uid)
        .collection('notifications').orderBy('time', 'desc')
        .onSnapshot(snapshot =>{
            if (!mountedRef.current) return null
            const notifications = []
            snapshot.forEach(doc =>{
                notifications.push(doc.data())
            })

            setActivities(notifications)
            //function setting unseen notification(s) to seen
            notifications.map(notification =>{
                return db.collection('users').doc(auth.uid)
                .collection('notifications').doc(notification.notificationId)
                .update({
                    seen : true
                })
            })
        })
    }, [auth])




    useEffect(() =>{
        grabAllUserNotifications()
        setCurrentPage('activity')
        
        return () => {
            mountedRef.current = false
        }   


    }, [ grabAllUserNotifications, setCurrentPage ])

    //console.log(activities)
    if(!auth.uid) return <Redirect to='/' />
    return(
        <div className="mobile-activity-container">
            <div className='mobile-activity-nav-container'>
                <p>Activiy</p>
            </div>
            {
                activities.length > 0 ?
                 activities.map((activity, i) =>{
                    return(
                        <EachActivity 
                            activity={activity} 
                            key={activity.notificationId} 
                            profile={profile}
                        />
                    )
                })
                :
                <div className='no-activity-container'>
                    <p>You currently have no activity, when you do they would appear here</p>
                </div>
            }

            <Suggestions as='component' />
        </div>
    )
}


const mapStateToProps = state =>{
    console.log(state)
    return{
        profile : state.firebase.profile,
        auth : state.firebase.auth,
    }
}


export default connect(mapStateToProps)(MobileAccountActivity)