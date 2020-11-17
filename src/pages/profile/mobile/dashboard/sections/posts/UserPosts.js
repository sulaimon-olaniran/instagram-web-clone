import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import NoPost from './no_posts/NoPost'


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


const UserPosts = ({ posts, from, user }) => {
    const classes = useStyles();
    //console.log(posts)
    if( !posts.length > 0) return <NoPost from={from} user={user}/>
    return (
        <div className='user-post-container'>
            <GridList cellHeight={120} className={classes.gridList} cols={3}>
                {
                    posts && posts.map((post, i) => {
                        //console.log(i)
                        return (
                            <GridListTile key={post.postId}  >
                                <Link to={`/p/${post.postId}/${post.userId}`}>
                                    <img src={post.fileUrl} alt='FILE' />
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




/*

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

*/