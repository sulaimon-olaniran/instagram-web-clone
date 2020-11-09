import React from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'




const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },

    
}))



const Suggestion = ({ data }) =>{
    const classes = useStyles()

    return(
        <div className='each-suggestion-container'>

            <div className='profile-container'>
                <Avatar 
                    src={data.image} alt={data.name} 
                    className={classes.large}
                />

                <div className='personal-details'>
                    <h5>{data.name}</h5>
                    <p>{data.username}</p>
                    <p>{data.reason}</p>
                </div>
            </div>


            <Button 
                color='primary'
                variant='contained'
            >
                Follow
            </Button>
        </div>
    )
}




export default Suggestion 