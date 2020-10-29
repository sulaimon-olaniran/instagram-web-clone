import React from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { makeStyles } from '@material-ui/core/styles'
import HorizontalScroller from 'react-horizontal-scroll-container'



import instagram_text_logo from '../../assets/instagram_text_logo.png'
import { MyDirectIcon, MyCameraIcon } from '../../../components/MyIcons'
//import Posts from './posts/Posts'
//import StoryAvatar from '../../../components/avatar/StoryAvatar'
import Stories from '../../../components/stories/Stories'
import { feedPosts } from '../FakeData'
import PostsFeed from '../../../components/feed/PostsFeed'
import CreateButton from '../../../components/create_story/CreateButton'

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginLeft : '10px'
    },
}));


const MobileHome = () => {
    const classes = useStyles()

    return (
        <div className='mobile-home-container'>

            <div className='top-navigation-container'>
                <CreateButton MyCameraIcon={MyCameraIcon} />

                <img src={instagram_text_logo} alt="INSTAGRAM" />
                <Badge badgeContent={4} color="secondary">
                    <MyDirectIcon
                        height='24px'
                        width='24px'
                    />
                </Badge>
            </div>

            <div className='stories-container'>
                <HorizontalScroller>
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={<AddCircleIcon color='primary' fontSize='small' />}
                    >
                        <Avatar
                            src={'https://source.unsplash.com/random/600x600/?model'}
                            className={classes.large}
                        />
                    </Badge>

                    <Stories />

                </HorizontalScroller>
            </div>


            <div className='main-contents-container'>
                <PostsFeed feedPosts={feedPosts} />
            </div>


        </div>
    )
}

export default MobileHome