import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import moment from 'moment'


import { db } from '../../../firebase/Firebase'



const EachActivity = ({ activity, profile }) => {
    const [notifier, setNotifier] = useState({})

    const getNotifierAccount = useCallback(() => {
        const docId = activity && activity.userId
        db.collection('users').doc(docId)
            .onSnapshot(snapshot => {
                setNotifier(snapshot.data())
                //return db
            })
    }, [activity])

    useEffect(() => {
        getNotifierAccount()
    }, [getNotifierAccount])

    console.log(activity)

    return (
        <React.Fragment>
            <div className='each-mobile-activity-container'>
                <Avatar src={notifier && notifier.profilePhoto} />

                <div className='notification-information'>

                    {activity.type === 'followed' &&

                        <React.Fragment>
                            <div className='followed-notifier-details'>
                                <p>{notifier && notifier.userName}</p>
                                <small>{activity.notification}. {moment(activity.time).fromNow()} </small>
                            </div>

                            <div className='followed-notification-item'>
                                { profile && profile.following.includes(activity.userId) ?
                                <Button
                                    size='small'
                                    variant='outlined'
                                >
                                    Following
                                </Button>
                                    :
                                <Button
                                    size='small'
                                    variant='contained'
                                    color='primary'
                                >
                                    Follow
                                </Button>}
                            </div>
                        </React.Fragment>
                    }

                    {
                        activity.type === 'liked_post' &&
                        <React.Fragment>
                            <div className='followed-notifier-details'>
                                <p>{notifier && notifier.userName}</p>
                                <small>{activity.notification}. {moment(activity.time).fromNow()} </small>
                            </div>

                            <Link 
                                to={`/p/${activity.postId}`}
                                className='notification-post-image'
                            >
                                <img src='https://source.unsplash.com/random/600x600/?flowers' alt='File' />
                            </Link>
                        </React.Fragment>
                    }

                </div>

            </div>
            <hr />
        </React.Fragment>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(null, mapDispatchToProps)(EachActivity)