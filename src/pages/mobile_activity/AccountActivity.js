import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'


import { db } from '../../firebase/Firebase'
import EachActivity from './each_activity/EachActivity'



const MobileAccountActivity = ({ profile }) =>{
    const [activities, setActivities] = useState()

    const grabAllUserNotifications = useCallback(() =>{
        db.collection('users').doc('9G6R635DzajdJA0ht6Ng').collection('notifications')
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

    }, [ grabAllUserNotifications ])

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
        </div>
    )
}


const mapStateToProps = state =>{
    return{
        profile : state.firebase.profile
    }
}


export default connect(mapStateToProps)(MobileAccountActivity)