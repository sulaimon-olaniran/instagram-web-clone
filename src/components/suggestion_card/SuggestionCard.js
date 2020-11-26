import React, { useState, useEffect, useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


//import { db } from '../../firebase/Firebase'
import { followUser, unFollowUser } from '../../store/actions/ProfileActions'



const useStyles = makeStyles((theme) => ({
  button: {
    width: '220px',
    backgroundColor: 'rgba(var(--d69,0,149,246),1)'
  },

  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: 'gray'
  },

  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));



const SuggestionCard = ({ user, posts, x, followUser, profile }) => {
  const [userPosts, setUserPosts] = useState([])
  const classes = useStyles()
  

  const fetchUserPosts = useCallback( () =>{
    const allPosts = []

    posts && posts.forEach(post =>{
      if(post.userId === user.userId){
        allPosts.push(post)
      }
    })
   
    setUserPosts(allPosts)

  }, [user, posts])

  useEffect(() =>{
    fetchUserPosts()

  }, [ fetchUserPosts ])

  const handleFollowUser = () =>{
    const data = {
      userId : profile.userId,
      userName : profile.userName,
      profilePhoto : profile.profilePhoto,
      accountId : user.userId
    }

    followUser(data)
  }

  const hanldeUnFollowUser = () =>{
    const data = {
      userId : profile.userId, //logged in user account id
      accountId : user.userId //id of user to unfollow
    }
    unFollowUser(data)
  }

  const handleFollowOrUnFollow = profile.following.includes(user.userId) ? hanldeUnFollowUser : handleFollowUser
  const textToDisplay = profile.following.includes(user.userId) ? 'Unfollow' : 'Follow'

  return (
    <div 
      className='suggestion-card-container'
      style={{ transform: `translateX(${x}%)` }}
    >
      <div className='suggestion-card-contents-container'>
        <Avatar
          src={user.profilePhoto}
          className={classes.large}
        />

        <div className='close-icon-container'>
          <CloseIcon
            className={classes.small}
          />
        </div>

        <p>{user.fullName}</p>
        <small>{user.userName}</small>

        <div className='top-three-posts-container'>
          {
            userPosts && userPosts.slice(0, 3).map((post, i) => {
              return (
                <div key={i} className='each-suggestion-post-container'>
                  <img src={post.fileUrl} alt='file' />
                </div>
              )
            })
          }
        </div>

        <small>suggested for you</small>

        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleFollowOrUnFollow}
        >
          {textToDisplay}
      </Button>

      </div>
    </div>

  )
}

const mapStateToProps = (state) =>{
  return{
    //profile of currently logged in user
    posts: state.firestore.ordered.posts,
    profile : state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      followUser : data => dispatch(followUser(data)),
      unFollowUser : data => dispatch(unFollowUser(data))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => ['posts'])
)(SuggestionCard)


//xport default connect(mapStateToProps, mapDispatchToProps)(SuggestionCard)