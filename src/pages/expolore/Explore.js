import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

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

const Explore = () => {
    const exploreImagess = [
        {
            url: 'https://source.unsplash.com/random/600x600/?nature,animals',
            rows: 3,
            cols: 3,
        },

        {
            url :'https://source.unsplash.com/random/600x600/?nature,flowers',
            rows: 1,
            cols : 1

        },
        
        {
            url :'https://source.unsplash.com/random/600x600/?places',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?cows',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/1600x900/?dog',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?foods',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?elephants',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?car',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?train',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?pet',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?guns',
            rows: 3,
            cols : 3

        },
        {
            url :'https://source.unsplash.com/random/600x600/?ronaldo',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?messi',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?london',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?manchester',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?flag',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?pasta',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?rice',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?rome',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?birds',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?eggs',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?lions',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?wolves',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?soldiers',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?police',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?fire',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?river',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?volcano',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?mountains',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?girl',
            rows: 1,
            cols : 1

        },
        {
            url :'https://source.unsplash.com/random/600x600/?eifel',
            rows: 1,
            cols : 1

        },
    ]
    
    const classes = useStyles();


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
                        exploreImagess.map((image, i) => {
                            //console.log(i)
                            return (
                                <GridListTile key={i} cols={image.cols} rows={image.rows} >
                                    <img src={image.url} alt='FILE' />
                                </GridListTile>
                            )
                        })
                    }
                </GridList>

            </div>

        </div>
    )
}


export default Explore
























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