import React, { useState, useEffect, useCallback} from 'react'
import Modal from '@material-ui/core/Modal'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


import { db } from '../../../../../firebase/Firebase'
import LogoLoader from '../../../../../components/loaders/LogoLoader'
import { unFollowUser, followUser, removeFollower } from '../../../../../store/actions/ProfileActions'
import Suggestions from '../../../../suggestions/Suggestions'



const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY: 'scroll',
    },

    followButton : {
        backgroundColor: '#0095f6'
    },

}));



const FollowTheme = ({ openModal, handleCloseModal, header, data, from, profile, unFollowUser, followUser, removeFollower }) => {
    const [fetchingData, setFetchingData] = useState(true)
    const [followUsersData, setFollowUsersDAta] = useState([])
    const classes = useStyles()
    //console.log(data)

    const handleUnfollowUser = (id) =>{
        const data ={
            userId : profile.userId,
            accountId : id
        }
        unFollowUser(data)
    }


    const handleFollowUser = (id) =>{
        const data = {
            userId : profile.userId,
            userName : profile.userName,
            profilePhoto : profile.profilePhoto,
            accountId : id
        }
        followUser(data)
    }

    const handleRemoveFollower = (id) =>{
        const data ={
            userId : profile.userId,
            accountId : id 
        }

        removeFollower(data)
    }

    const handleCloseClearModal = () =>{
        handleCloseModal()
        setFollowUsersDAta([])
    }


    //get each follower/following user data using their id
    const getAllFollowData = useCallback( () => {
        data && data.length > 0 ? 
        
        data.forEach(data =>{
            db.collection('users').doc(data)
            .onSnapshot(snapshot =>{
                setFollowUsersDAta(prev => prev.concat(snapshot.data()))
                setFetchingData(false)
            })
        }) 
        
        : 
        
        setFetchingData(false)

    }, [ data ])
   
    useEffect(() =>{
        getAllFollowData()

    }, [getAllFollowData])

    //console.log(followUsersData)

    if(fetchingData) return <LogoLoader />
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >

                <div className='follow-container'>
                    <div className='follow-nav-container'>
                        <ArrowBackIosIcon onClick={handleCloseClearModal} />
                        <p>{header}</p>
                    </div>

                    <div className='follow-contents-container'>
                        {
                            followUsersData && followUsersData.map((user, i) => {
                                return (
                                    <div key={user.userId} className='each-follow-container'>
                                        <div className='follow-profile-container'>
                                            <Avatar 
                                                src={user.profilePhoto} 
                                                alt={user.userName} 
                                            />

                                            <div className='follow-personal-details'>
                                            <Link 
                                                onClick={handleCloseClearModal}
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
                                                onClick={ () => handleUnfollowUser(user.userId)}
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
                                                onClick={ () => handleFollowUser(user.userId)}
                                            >
                                                Follow
                                            </Button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    <Suggestions as='component'/>

                </div>

        </Modal>
    )
}

const mapStateToProps = (state) =>{
    return{
        profile : state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        unFollowUser : data => dispatch(unFollowUser(data)),
        followUser : data => dispatch(followUser(data)),
        removeFollower : data => dispatch(removeFollower(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FollowTheme)