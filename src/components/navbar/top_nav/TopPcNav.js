import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


import instagram_img from './assets/instagram_img.png'
import { MyActiveHomeIcon, MyUnActiveHomeIcon, UnLikedIcon, MyDirectIcon, MyActiveExploreIcon, MyUnActiveExploreIcon, BlackLikedIcon } from '../../MyIcons'
import PcSearchBox from '../../search_box/SearchBox'
import PcActivityMenu from '../../pc_activity/PcActivityMenu'
import PcSearchResults from '../../../pages/expolore/search/pc/PcSearchResults'


const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));


const TopPcNav = ({ inputValue, searchResults, profile }) => {
    const [activityMenu, setActivityMenu] = useState(null)
    const [activeIcon, setActiveIcon] = useState(null)
    const classes = useStyles()


    const handleOpenActivityMenu = event => {
        setActivityMenu(event.currentTarget)
    }


    const handleActiveIcon = active => {
        setActiveIcon(active)
    }

    const handleCloseActivityMenu = () => {
        setActivityMenu(null)
        handleActiveIcon('activity')
    }

    return (
        <div className='top-pc-nav-container'>
            <PcActivityMenu
                anchorEl={activityMenu}
                handleClose={handleCloseActivityMenu}
            />
            <div className='nav-contents'>
                <Link to='/'>
                    <img src={instagram_img} alt="logo" />
                </Link>

                <PcSearchBox />

                {searchResults && <PcSearchResults inputValue={inputValue} />}

                <div className='nav-content-links-container'>
                    <Link to='/'>
                        {activeIcon === 'home' ?
                            <MyActiveHomeIcon
                                height='24px'
                                width='24px'
                            />
                            :
                            <MyUnActiveHomeIcon
                                height='24px'
                                width='24px'
                                action={() => handleActiveIcon('home')}
                            />
                        }
                    </Link>


                    <Badge badgeContent={1} color="secondary">
                        <MyDirectIcon
                            height='24px'
                            width='24px'
                        />
                    </Badge>


                    <Link
                        to='/explore'
                    >

                        {
                            activeIcon === 'explore' ?
                                <MyActiveExploreIcon
                                    height='24px'
                                    width='24px'
                                />
                                :
                                <MyUnActiveExploreIcon
                                    height='24px'
                                    width='24px'
                                    action={() => handleActiveIcon('explore')}
                                />
                        }

                    </Link>


                    {activeIcon === 'activity' ?
                        <BlackLikedIcon
                            height='24px'
                            width='24px'
                        />
                        :
                        <UnLikedIcon
                            height='24px'
                            width='24px'
                            action={handleOpenActivityMenu}
                        />}


                    <Link
                        to={`/account/${profile && profile.userName}/${profile && profile.userId}`}
                    >

                        <Avatar
                            className={classes.small}
                            onClick={() => handleActiveIcon('')}
                        />
                    </Link>
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = state => {
    //console.log(state)
    return {
        inputValue: state.application.inputValue,
        searchResults: state.application.searchResults,
        profile: state.firebase.profile

    }
}

export default connect(mapStateToProps)(TopPcNav)