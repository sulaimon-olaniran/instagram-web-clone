import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'



import { handleOpenProfileCard } from '../../../../store/actions/AppActions'
import { followUser } from '../../../../store/actions/ProfileActions'



const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    medium: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));




const RightSection = ({ users, profile, handleOpenProfileCard, followUser }) =>{
    const classes = useStyles()
    const [suggestedUsers, setSuggestedUsers] = useState([])

    useEffect(() => {
        const suggested = []
        
        users && users.forEach(user => {
            profile.isLoaded && !profile.isEmpty && !profile.following.includes(user.userId) &&
            profile.userId !== user.userId && suggested.push(user)
        })

        setSuggestedUsers(suggested)
    }, [profile, users])


    const handleOpenProfilePopper = (e, user) =>{
        const data = {
            event : e.currentTarget,
            profile : user
        }

        handleOpenProfileCard(data)
    }


    const handleFollowUser = (user) =>{
        const data = {
            accountId : user.userId,
            userId : profile.userId
        }
        followUser(data)
    }


    return(
        <div className='right-section-container'>
            <div className='right-section-profile-information'>
                <Avatar
                    src={profile && profile.profilePhoto}
                    className={classes.medium}
                />
                <Link
                    to={`/profile/${profile && profile.userName}/${profile && profile.userId}`}
                >
                    <p>{profile && profile.userName}</p>
                </Link>
            </div>

            <div className='right-section-suggestions-container'>

                <div className='header-content'>
                    <h4>Suggestions for You</h4>
                    <small>Sell All</small>
                </div>

                <div className='main-suggestions-container'>
                    {
                        suggestedUsers.length > 0 && suggestedUsers.slice(0, 5).map((user) => {
                            return(
                                <div 
                                    className='each-right-section-suggestion'
                                    key={user.userId}
                                >

                                    <div className='user-profile-information'>
                                        <Avatar 
                                            onMouseEnter={(e) => handleOpenProfilePopper(e, user)}
                                            src={user.profilePhoto} 
                                        />

                                        <div className='suggestion-details'>
                                            <Link
                                                to={`/profile/${user && user.userName}/${user && user.userId}`}
                                            >
                                                <p
                                                    onMouseEnter={(e) => handleOpenProfilePopper(e, user)}
                                                >
                                                    {user.userName}
                                                </p>
                                            </Link>
                                            <small>Suggested for you</small>
                                        </div>

                                    </div>

                                    <Button
                                        onClick={() => handleFollowUser(user)}
                                        size='small'
                                    >
                                        Follow
                                    </Button>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        profile: state.firebase.profile
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        handleOpenProfileCard : data => dispatch(handleOpenProfileCard(data)),
        followUser : data => dispatch(followUser(data))
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['users'])
)(RightSection)

//export default RightSection