import React, { useState } from 'react'
import ViewDayIcon from '@material-ui/icons/ViewDay'
import { makeStyles } from '@material-ui/core/styles'


import {
    MyActivePostsIcon,
    MyUnactivePostsIcon,
    ActiveChannelIcon,
    UnactiveChannelIcon,
    UnactiveTaggedIcon,
    ActiveTaggedIcon
}
    from '../../../../components/MyIcons'
import UserPosts from './sections/posts/UserPosts';
import UserFeed from './sections/feed/UserFeed';
import Tagged from './sections/tagged/Tagged';
import Channel from './sections/channel/Channel';

const useStyles = makeStyles((theme) => ({
    unActive: {
        fill: '#8e8e8e'
    },
    active: {
        fill: '#0095f6'
    }
}));

const DashBoard = ({ user, posts, from }) => {
    const classes = useStyles()
    const [activeSection, setActiveSection] = useState('posts')

    const toggleActiveSection = (section) => {
        setActiveSection(section)
    }

    let mainComponentDisplayed = null

    switch (activeSection) {
        case 'posts':
            mainComponentDisplayed = <UserPosts 
                posts={posts}
                from={from}
                user={user}
            />
            break;

        case 'feed':
            mainComponentDisplayed = <UserFeed 
                posts={posts}
                from={from}
                user={user}
            />
            break;

        case 'tagged':
            mainComponentDisplayed = <Tagged />
            break;

        case 'channel':
            mainComponentDisplayed = <Channel />
            break;

        default:
            mainComponentDisplayed = <UserPosts 
                posts={posts}
            />

    }



    return (
        <React.Fragment >
            <div className='dashboard-nav-container'>
                {activeSection === 'posts' ?
                    <MyActivePostsIcon height='24px' width='24px' action={() => toggleActiveSection('posts')} />
                    : <MyUnactivePostsIcon height='24px' width='24px' action={() => toggleActiveSection('posts')} />
                }

                <ViewDayIcon 
                    className={activeSection === 'feed' ? classes.active : classes.unActive}
                    onClick={() => toggleActiveSection('feed')}
                />

                {
                    activeSection !== 'channel' ?
                        <UnactiveChannelIcon height='24px' width='24px' action={() => toggleActiveSection('channel')} />
                        :
                        <ActiveChannelIcon height='24px' width='24px' action={() => toggleActiveSection('channel')} />
                }

                {
                    activeSection === 'tagged' ?
                        <ActiveTaggedIcon height='24px' width='24px' action={() => toggleActiveSection('tagged')} />
                        :
                        <UnactiveTaggedIcon height='24px' width='24px' action={() => toggleActiveSection('tagged')} />

                }
            </div>

            { mainComponentDisplayed}
        </React.Fragment>
    )
}


export default DashBoard