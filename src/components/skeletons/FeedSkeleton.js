import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'



const FeedSkeleton = () => {


  return (
    <div className='feed-skeleton-container'>
        <div className='feed-skeleton-header-container'>
            <Skeleton
              height={40}
              width={40}
              variant='circle'
              animation='wave'
            />

            <Skeleton
              variant='text'
              animation='wave'
            />
        </div>

        <div className='feed-skeleton-file-container'>
            <Skeleton
              variant='rect'
              animation='wave'
            />
        </div>

        <div className='feed-skeleton-bottom-container'>
            <Skeleton
              variant='rect'
              animation='wave'
            />
        </div>

    </div>
  );
}

export default FeedSkeleton




















// const FeedSkeleton = () => {

//   const classes = useStyles()

//   return (
//     <Card className={classes.card}>
//       <CardHeader
//         avatar={
//           <Skeleton animation="wave" variant="circle" width={40} height={40} />
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }

//         title={
//           <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
//         }

//         subheader={<Skeleton animation="wave" height={10} width="40%" />}
//       />

//       <Skeleton animation="wave" variant="rect" className={classes.media} />


//       <CardContent>
//         <React.Fragment>
//           <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
//           <Skeleton animation="wave" height={10} width="80%" />
//         </React.Fragment>
//       </CardContent>
//     </Card>
//   );
// }

// export default FeedSkeleton