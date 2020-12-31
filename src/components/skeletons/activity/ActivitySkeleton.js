import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'



const ActivitySkeleton = () =>{
    return(
        <div className='activity-skeleton-container'>
            <Skeleton
              variant='rect'
              animation='wave'
            />
        </div>
    )
}


export default ActivitySkeleton