import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'


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


const UserPosts = () => {
    const classes = useStyles();
    const userPostData = [
        {
            post: 'https://source.unsplash.com/random/600x600/?woman',
            postId: 'id001'

        },


        {
            post: 'https://source.unsplash.com/random/600x600/?female',
            postId: 'id002'
        },


        {
            post: 'https://source.unsplash.com/random/600x600/?girl',
            postId: 'id003'

        },


        {
            post: 'https://source.unsplash.com/random/600x600/?lady',
            postId: 'id004'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?model',
            postId: 'id005'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?cat',
            postId: 'id006'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?kitten',
            postId: 'id007'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?boy',
            postId: 'id008'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?kid',
            postId: 'id009'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?man',
            postId: 'id0010'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?puppy',
            postId: 'id0011'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?dog',
            postId: 'id0012'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?woman',
            postId: 'id001'

        },


        {
            post: 'https://source.unsplash.com/random/600x600/?female',
            postId: 'id002'
        },


        {
            post: 'https://source.unsplash.com/random/600x600/?girl',
            postId: 'id003'

        },


        {
            post: 'https://source.unsplash.com/random/600x600/?lady',
            postId: 'id004'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?model',
            postId: 'id005'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?cat',
            postId: 'id006'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?kitten',
            postId: 'id007'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?boy',
            postId: 'id008'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?kid',
            postId: 'id009'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?man',
            postId: 'id0010'
        },

        {
            post: 'https://source.unsplash.com/random/600x600/?puppy',
            postId: 'id0011'

        },

        {
            post: 'https://source.unsplash.com/random/600x600/?dog',
            postId: 'id0012'
        },
    ]

    return (
        <div className='user-post-container'>
            <GridList cellHeight={120} className={classes.gridList} cols={3}>
                {
                    userPostData.map((post, i) => {
                        //console.log(i)
                        return (
                            <GridListTile key={i}  >
                                <Link to={`/post/${post.postId}`}>
                                    <img src={post.post} alt='FILE' />
                                </Link>
                            </GridListTile>
                        )
                    })
                }
            </GridList>

        </div>
    )
}


export default UserPosts