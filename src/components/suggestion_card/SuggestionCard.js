import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles'


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



const SuggestionCard = ({ data, x }) => {
  const classes = useStyles()


  return (
    <div 
      className='suggestion-card-container'
      style={{ transform: `translateX(${x}%)` }}
    >
      <div className='suggestion-card-contents-container'>
        <Avatar
          src={data.dp}
          className={classes.large}
        />

        <div className='close-icon-container'>
          <CloseIcon
            className={classes.small}
          />
        </div>

        <p>{data.name}</p>
        <small>{data.userName}</small>

        <div className='top-three-posts-container'>
          {
            data.topThree.map((image, i) => {
              return (
                <div key={i} className='each-suggestion-post-container'>
                  <img src={image} alt='file' />
                </div>
              )
            })
          }
        </div>

        <small>{data.reason}</small>

        <Button
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Follow
      </Button>

      </div>
    </div>

  )
}


export default SuggestionCard