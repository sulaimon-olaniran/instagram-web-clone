import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import moment from 'moment'


import { db } from '../../../firebase/Firebase'
import { followUser, unFollowUser } from '../../../store/actions/ProfileActions'



const EachActivity = ({ activity, profile, followUser, unFollowUser }) => {
    const [notifier, setNotifier] = useState({})
    const [post, setPost] = useState({}) //get the post from which activity occured
    //console.log(activity)

    const getNotifierAccount = useCallback(() => {
        const docId = activity && activity.userId
        db.collection('users').doc(docId).get()
        .then(doc =>{
            setNotifier(doc.data())
            activity && activity.type !=='followed'  && 
            db.collection('posts').doc(activity && activity.postId)
            .get().then(doc =>{
                setPost(doc.data())
            })
        })
        .then(() =>{
            console.log('all done')
        })
           
    }, [activity])

    useEffect(() => {
        getNotifierAccount()
    }, [getNotifierAccount])

    const handleFollowUser = () =>{
        const data ={
            userId : profile.userId,
            accountId : activity.userId
        }

        followUser(data)
    }

    const handleUnFollowUser = () =>{
        const data ={
            userId : profile.userId,
            accountId : activity.userId
        }

        unFollowUser(data)
    }

    return (
        <React.Fragment>
            <div className='each-mobile-activity-container'>
                <Avatar src={notifier && notifier.profilePhoto} />

                <div className='notification-information'>

                    {activity.type === 'followed' &&

                        <React.Fragment>
                            <div className='followed-notifier-details'>
                                <p>{notifier && notifier.userName}</p>
                                <small>{activity.notification}. <span className='time'>{moment(activity.time).fromNow()}</span></small>
                            </div>

                            <div className='followed-notification-item'>
                                { profile && profile.following.includes(activity.userId) ?
                                <Button
                                    size='small'
                                    variant='outlined'
                                    onClick={handleUnFollowUser}
                                >
                                    Following
                                </Button>
                                    :
                                <Button
                                    size='small'
                                    variant='contained'
                                    color='primary'
                                    onClick={handleFollowUser}
                                >
                                    Follow
                                </Button>}
                            </div>
                        </React.Fragment>
                    }

                    {
                        activity.type !== 'followed' &&
                        <React.Fragment>
                            <div className='followed-notifier-details'>
                                <p>{notifier && notifier.userName}</p>

                                {activity.type === 'liked_post' && 
                                <small>{activity.notification}. <span className='time'>{moment(activity.time).fromNow()} </span></small>}

                                {activity.type === 'post_comment' && 
                                <small>commented: {activity.comment} <span className='time'>{moment(activity.time).fromNow()}</span></small>}

                                {activity.type === 'liked_comment' &&
                                <small>liked your comment: {activity.comment} <span className='time'>{moment(activity.time).fromNow()}</span></small>}
                            </div>

                            <Link 
                                to={`/p/${activity.postId}`}
                                className='notification-post-image'
                            >
                                <img src={post && post.fileUrl} alt='File' />
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
        followUser : data => dispatch(followUser(data)),
        unFollowUser : data => dispatch(unFollowUser(data))
    }
}


export default connect(null, mapDispatchToProps)(EachActivity)