import React from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'




const Suggestion = ({ data }) =>{
    //console.log(data)
    return(
        <div className='each-suggestion-container'>

            <div className='profile-container'>
                <Avatar src={data.image} alt={data.name} />

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