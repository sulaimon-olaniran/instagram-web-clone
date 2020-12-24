import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


import instagram_img from './assets/instagram_img.png'
import { MyActiveHomeIcon, MyUnActiveHomeIcon, UnLikedIcon, MyDirectIcon, MyActiveExploreIcon } from '../../MyIcons'
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


const TopPcNav = ({ inputValue, searchResults }) =>{
    const [activityMenu, setActivityMenu] = useState(null)
    const classes = useStyles()


    const handleOpenActivityMenu = event =>{
        setActivityMenu(event.currentTarget)
    }

    const handleCloseActivityMenu = () =>{
        setActivityMenu(null)
    }

    return(
        <div className='top-pc-nav-container'>
            <PcActivityMenu
                anchorEl={activityMenu}
                handleClose={handleCloseActivityMenu}
            />
            <div className='nav-contents'>
                <img src={instagram_img} alt="logo" />

                <PcSearchBox />

                { searchResults && <PcSearchResults inputValue={inputValue} />}

                <div className='nav-content-links-container'>
                    <MyActiveHomeIcon
                        height='24px'
                        width='24px'
                    />

                    <Badge badgeContent={1} color="secondary">
                        <MyDirectIcon
                            height='24px'
                            width='24px'
                        />
                    </Badge>

                    <Link
                        to='/explore'
                    >

                        <MyActiveExploreIcon
                            height='24px'
                            width='24px'
                        />

                    </Link> 

                    <UnLikedIcon
                        height='24px'
                        width='24px'
                        action={handleOpenActivityMenu}
                    />

                    <Avatar
                        className={classes.small}
                    />
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = state =>{
    //console.log(state)
    return{
      inputValue : state.application.inputValue,
      searchResults : state.application.searchResults,  

    }
}

export default connect(mapStateToProps)(TopPcNav)