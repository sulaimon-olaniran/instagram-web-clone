import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'


import { db } from '../../firebase/Firebase'
import EachActivity from './each_activity/EachActivity'
import Suggestions from '../suggestions/Suggestions'



const MobileAccountActivity = ({ profile, setCurrentPage }) =>{
    const [activities, setActivities] = useState()

    const grabAllUserNotifications = useCallback(() =>{
        db.collection('users').doc('9G6R635DzajdJA0ht6Ng').collection('notifications').orderBy('time', 'desc')
        .onSnapshot(snapshot =>{
            const notifications = []
            snapshot.forEach(doc =>{
                notifications.push(doc.data())
            })

            setActivities(notifications)
        })
    }, [])


    useEffect(() =>{
        grabAllUserNotifications()
        setCurrentPage('activity')

    }, [ grabAllUserNotifications, setCurrentPage ])

    //console.log(activities)

    return(
        <div className="mobile-activity-container">
            <div className='mobile-activity-nav-container'>
                <p>Activiy</p>
            </div>
            {
                activities && activities.map((activity, i) =>{
                    return(
                        <EachActivity 
                            activity={activity} 
                            key={i} 
                            profile={profile}
                        />
                    )
                })
            }

            <Suggestions as='component' />
        </div>
    )
}


const mapStateToProps = state =>{
    return{
        profile : state.firebase.profile
    }
}


export default connect(mapStateToProps)(MobileAccountActivity)