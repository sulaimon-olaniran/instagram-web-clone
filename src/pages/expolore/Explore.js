import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'



import { MyUnActiveSearchIcon } from '../../components/MyIcons'
import SpinnerLoader from '../../components/loaders/spinner/SpinnerLoader'
import { handleOpenScamWarning } from '../../store/actions/AppActions'
import PostOutline from '../../components/post_outline/PostOutline'


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

const Explore = ({ setCurrentPage, posts, showScamWarning }) => {
    const [currentData, setCurrentData] = useState(18)
    const [loadMore, setLoadMore] = useState(false)
    const classes = useStyles();


    const handleOnWindowScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

            if (posts && currentData < posts.length) {

                setLoadMore(true)

                setTimeout(() => {
                    setCurrentData(prev => prev + 18)
                    setLoadMore(false)
                }, [1500])
            }
        }
    }, [currentData, posts])


    useEffect(() => {
        setCurrentPage('explore')
        showScamWarning()
        window.addEventListener('scroll', handleOnWindowScroll)

        return () => {
            window.removeEventListener('scroll', handleOnWindowScroll)
        }

    }, [setCurrentPage, handleOnWindowScroll, showScamWarning])




    return (
        <div className='explore-page-container'>
            <Link className='top-button-container' to='/explore/search'>
                <button>
                    <MyUnActiveSearchIcon width='12px' height='12px' /> Search
                </button>
            </Link>

            <div className='explore-contents-container'>
                <GridList cellHeight={120} className={classes.gridList} cols={3}>
                    {
                        posts ? posts.slice(0, currentData).map((post, i) => {
                            //console.log(i)gjj
                            return (
                                <GridListTile key={post.postId} >
                                    <PostOutline post={post} />
                                </GridListTile>
                            )
                        })
                            :
                            <SpinnerLoader
                                height='100vh'
                            />
                    }
                </GridList>

                {loadMore && <SpinnerLoader height='50px' />}

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



const mapDispatchToProps = dispatch =>{
    return{
        showScamWarning : () => dispatch(handleOpenScamWarning())
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['posts'])
)(Explore)
