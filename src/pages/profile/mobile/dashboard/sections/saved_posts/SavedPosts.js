import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'


import EachSavedPost from './EachSavedPost'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
}));




const SavedPosts = ({ savedPosts }) =>{
    const classes = useStyles();



    return(
        <div className='user-post-container'>
            <GridList cellHeight={120} className={classes.gridList} cols={3}>
                {
                    savedPosts && savedPosts.map((savedPost, i) => {
                        return (
                            <GridListTile key={savedPost}>
                                <EachSavedPost savedPost={savedPost}  />
                            </GridListTile>
                        )
                    })
                }
            </GridList>
        </div>
    )
}


export default SavedPosts