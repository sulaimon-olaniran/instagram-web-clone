import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


import { followUser } from '../../../store/actions/ProfileActions'



const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    
}))



const Suggestion = ({ user, profile, followUser }) =>{
    const classes = useStyles()

    const handleFollowUser = () =>{
        const data = {
            userId : profile.userId,
            accountId : user.userId
        }

        followUser(data)
    }

    return(
        <div className='each-suggestion-container'>

            <div
                className='profile-container'
            >
                <Avatar 
                    src={user.profilePhoto} alt='file' 
                    className={classes.large}
                />

                <div className='personal-details'>
                    <Link 
                        to={`/profile/${user.userName}/${user.userId}`}
                    >
                        <h5>{user.fullName}</h5>
                    </Link>


                    <Link 
                        to={`/profile/${user.userName}/${user.userId}`}
                    >
                        <p>{user.userName}</p>
                    </Link>
                    
                    <p>suggested for you</p>
                </div>
            </div>


            <Button 
                color='primary'
                variant='contained'
                size='small'
                onClick={handleFollowUser}
            >
                Follow
            </Button>
        </div>
    )
}



const mapDispatchToProps = dispatch =>{
    return{
        followUser : data => dispatch(followUser(data))
    }
}



export default connect(null, mapDispatchToProps)(Suggestion) 