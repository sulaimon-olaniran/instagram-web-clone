import React, { useEffect, useState } from 'react'
import Popover from '@material-ui/core/Popover'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


import { handleCloseProfileCard } from '../../store/actions/AppActions'
import { followUser, unFollowUser } from '../../store/actions/ProfileActions'



const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },

    followButton : {
        backgroundColor: '#0095f6',
        width: '90%',
        color : 'white'
    },

    followingButton : {
        width : '40%'
    }
}));




const ProfileCard = ({ anchorEl, handleCloseProfileCard, cardProfile, posts, followUser, profile, unFollowUser }) => {
    const [userPosts, setUserPosts] = useState([])
    //const [popperActive, setPopperActive] = useState(false)
    const classes = useStyles()



    const open = Boolean(anchorEl)

    useEffect(() => {
        const allPosts = []
        posts && posts.forEach(post => {
            if (cardProfile && post.userId === cardProfile.userId) {
                allPosts.push(post)
            }
        })
        setUserPosts(allPosts)
    }, [posts, cardProfile])

    

    const handleFollowUser = () => {
        const data = {
            accountId: cardProfile.userId,
            userId: profile.userId
        }
        followUser(data)
    }

    const handleUnFollowUser = () => {
        const data = {
            accountId: cardProfile.userId,
            userId: profile.userId
        }
        unFollowUser(data)
    }

    return (
        <Popover
            id="mouse-over-popover"
            //className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handleCloseProfileCard}
            disableRestoreFocus
        >
            <div
                //onMouseEnter={() => setPopperActive(true)}
                onMouseLeave={handleCloseProfileCard}
                className='card-profile-popper-container'
            >

                <div className='card-profile-information'>
                    <Avatar src={cardProfile && cardProfile.profilePhoto} />

                    <div>
                        <Link 
                            to={`/profile/${cardProfile && cardProfile.userName}/${cardProfile && cardProfile.userId}`}
                        >
                            <h5>{cardProfile && cardProfile.userName}</h5>
                        </Link>
                        <p>{cardProfile && cardProfile.fullName}</p>
                        <small>Followed by {cardProfile && cardProfile.followers.length}</small>
                    </div>
                </div>

                <div className='card-profile-account-information'>
                    <div>
                        <p>{userPosts.length}</p>
                        <small>posts</small>
                    </div>

                    <div>
                        <p>{cardProfile && cardProfile.followers.length}</p>
                        <small>followers</small>
                    </div>

                    <div>
                        <p>{cardProfile && cardProfile.following.length}</p>
                        <small>following</small>
                    </div>
                </div>

                <div className='card-profile-account-posts-container'>
                    {
                        userPosts && userPosts.slice(0, 3).map((post) => {
                            return (
                                <Link
                                    to={`/p/${post.postId}`}
                                    key={post.postId}
                                    className='card-profile-each-post'
                                    onClick={handleCloseProfileCard}
                                >
                                    <img src={post.fileUrl} alt='file' />
                                </Link>
                            )
                        })
                    }
                </div>

                <div className='card-profile-buttons-container'>
                    {profile && cardProfile && profile.following.includes(cardProfile.userId) ?
                        <React.Fragment>
                            <Button
                                variant='outlined'
                                className={classes.followingButton}
                            >
                                Message
                        </Button>

                            <Button
                                variant='outlined'
                                className={classes.followingButton}
                                onClick={handleUnFollowUser}
                            >
                                Following
                            </Button>
                        </React.Fragment>
                        :
                        <Button
                            onClick={handleFollowUser}
                            className={classes.followButton}
                        >
                            Follow
                        </Button>
                    }
                </div>

            </div>
        </Popover>
    )

}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        posts: state.firestore.ordered.posts,
        anchorEl: state.application.anchorEl,
        cardProfile: state.application.cardProfile,
        profile: state.firebase.profile
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        handleCloseProfileCard: () => dispatch(handleCloseProfileCard()),
        followUser: data => dispatch(followUser(data)),
        unFollowUser : data => dispatch(unFollowUser(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['posts'])
)(ProfileCard)


//export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)