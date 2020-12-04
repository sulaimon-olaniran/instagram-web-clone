import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'



import { MyUnActiveSearchIcon } from '../../components/MyIcons'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

const Explore = ({ setCurrentPage, posts }) => {
    
    const classes = useStyles();


    useEffect(() =>{
        setCurrentPage('explore')

    }, [setCurrentPage])


    return (
        <div className='explore-page-container'>
            <div className='top-button-container'>
                <button>
                    <MyUnActiveSearchIcon width='12px' height='12px' /> Search
                </button>
            </div>

            <div className='explore-contents-container'>
                <GridList cellHeight={120} className={classes.gridList} cols={3}>
                    {
                        posts ? posts.map((post, i) => {
                            //console.log(i)
                            return (
                                <GridListTile key={post.postId} >
                                    <Link to={`/p/${post.postId}`}>
                                        <img src={post.fileUrl} alt='FILE' />
                                    </Link>
                                   
                                </GridListTile>
                            )
                        })
                        :
                        <p>Loading</p>
                    }
                </GridList>

            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    //console.log(state)
    return {
        posts: state.firestore.ordered.posts,
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['posts'])
)(Explore)
//export default Explore
























/*
const exploreImages = [
        'http://lorempixel.com/output/cats-q-c-640-480-4.jpg',
        'http://lorempixel.com/output/transport-q-c-640-480-2.jpg',
        'http://lorempixel.com/output/sports-q-c-640-480-2.jpg',
        'http://lorempixel.com/output/city-q-c-640-480-1.jpg',
        'http://lorempixel.com/output/nightlife-q-c-640-480-2.jpg',
        'http://lorempixel.com/output/business-q-c-640-480-2.jpg',
        'http://lorempixel.com/output/food-q-c-640-480-2.jpg',
        'http://lorempixel.com/output/technics-q-c-640-480-2.jpg',
        'http://lorempixel.com/output/abstract-q-c-640-480-3.jpg',
        'http://lorempixel.com/output/sports-q-c-640-480-5.jpg',
        'http://lorempixel.com/output/cats-q-c-640-480-1.jpg',
        'http://lorempixel.com/output/transport-q-c-640-480-6.jpg',
        'http://lorempixel.com/output/sports-q-c-640-480-8.jpg',
        'http://lorempixel.com/output/city-q-c-640-480-9.jpg',
        'http://lorempixel.com/output/nightlife-q-c-640-480-3.jpg',
        'http://lorempixel.com/output/business-q-c-640-480-3.jpg',
        'http://lorempixel.com/output/food-q-c-640-480-3.jpg',
        'http://lorempixel.com/output/technics-q-c-640-480-3.jpg',
        'http://lorempixel.com/output/abstract-q-c-640-480-3.jpg',
        'http://lorempixel.com/output/sports-q-c-640-480-6.jpg',
    ]
*/