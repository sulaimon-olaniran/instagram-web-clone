import React from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import CloseIcon from '@material-ui/icons/Close';




import { unFollowUser, followUser, removeFollower } from '../../../../../store/actions/ProfileActions'
import Suggestions from '../../../../suggestions/Suggestions'


const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY: 'scroll',
    },

    followButton: {
        backgroundColor: '#0095f6'
    },

}));



const FollowDialog = ({ handleCloseDialog, openDialog, unFollowUser, followUser, removeFollower, profile, followsData, from, header }) => {
    const classes = useStyles()



    const handleUnfollowUser = (id) => {
        const data = {
            userId: profile.userId,
            accountId: id
        }
        unFollowUser(data)
    }


    const handleFollowUser = (id) => {
        const data = {
            userId: profile.userId,
            accountId: id
        }
        followUser(data)
    }


    const handleRemoveFollower = (id) => {
        const data = {
            userId: profile.userId,
            accountId: id
        }

        removeFollower(data)
    }

    const handleClearCloseDialog = () =>{
        handleCloseDialog()
    }


    return (
        <Dialog onClose={handleClearCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='follow-dialog-container'>
                <div className='follow-nav-container'>
                    <p>{header}</p>
                    <CloseIcon
                        onClick={handleClearCloseDialog}
                    />
                </div>

                <div className='follow-contents-container'>
                    <div className='follow-user-details-container'>
                    {
                        followsData && followsData.map(user => {
                            return (
                                <div key={user.userId} className='each-follow-container'>
                                    <div className='follow-profile-container'>
                                        <Avatar
                                            src={user.profilePhoto}
                                            alt={user.userName}
                                        />

                                        <div className='follow-personal-details'>
                                            <Link
                                                onClick={handleClearCloseDialog}
                                                to={`/profile/${user.userName}/${user.userId}`}
                                            >
                                                <h5>{user.fullName}</h5>
                                            </Link>
                                            <p>{user.userName}</p>
                                        </div>
                                    </div>


                                    { from === 'account' ?
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            size='small'
                                            className={classes.followButton}
                                            onClick={
                                                header === 'Following' ?
                                                    () => handleUnfollowUser(user.userId)
                                                    :
                                                    () => handleRemoveFollower(user.userId)
                                            }
                                        >
                                            {header === 'Following' ? 'Unfollow' : 'Remove'}
                                        </Button>

                                        :

                                        profile && profile.following.includes(user.userId) ?
                                            <Button
                                                //color='primary'
                                                variant='outlined'
                                                onClick={() => handleUnfollowUser(user.userId)}
                                                size='small'
                                            >
                                                Following
                                            </Button>

                                            :

                                            <Button
                                                color='primary'
                                                variant='contained'
                                                size='small'
                                                className={classes.followButton}
                                                onClick={() => handleFollowUser(user.userId)}
                                            >
                                                Follow
                                            </Button>
                                    }
                                </div>
                            )
                        })
                    }
                    </div>
                    <Suggestions as='component' />
                </div>
                
            </div>
        </Dialog>
    )
}


const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        unFollowUser: data => dispatch(unFollowUser(data)),
        followUser: data => dispatch(followUser(data)),
        removeFollower: data => dispatch(removeFollower(data))
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['users'])
)(FollowDialog)


//export default FollowDialog