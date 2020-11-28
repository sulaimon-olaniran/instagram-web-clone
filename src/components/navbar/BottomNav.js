import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


import { MyActiveHomeIcon, MyUnActiveSearchIcon, UnLikedIcon, MyAddIcon, MyUnActiveHomeIcon, MyActiveSearchIcon, BlackLikedIcon } from '../MyIcons'
import UploadFiles from '../upload/UploadButton'

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

const BottomNav = ({ auth, profile, currentPage }) => {
    //console.log(auth)
    const showNavBar = auth.uid ? 'flex' : 'none'
    const classes = useStyles()
    return (
        <nav
            style={{ display: showNavBar }}
        >
            { currentPage === 'home'
            ?
            <Link to='/'>
                <MyActiveHomeIcon
                    height='24px'
                    width='24px'
                />
            </Link>
            :
            <Link to='/'>
                <MyUnActiveHomeIcon
                    height='24px'
                    width='24px'
                />
            </Link>}

            { currentPage === 'explore' ?
            <Link to='/explore'>
                <MyActiveSearchIcon
                    height='24px'
                    width='24px'
                />
            </Link>
                :
            <Link to='/explore'>
                <MyUnActiveSearchIcon
                    height='24px'
                    width='24px'
                />
            </Link>}



            <UploadFiles
                component={<MyAddIcon height='24px' width='24px' />}
            />

            { currentPage === 'activity' ?
            <Link to='/account/activity'>
                <BlackLikedIcon
                    height='24px'
                    width='24px'
                />
            </Link>
                :
            <Link to='/account/activity'>
                <UnLikedIcon
                    height='24px'
                    width='24px'
                />
            </Link>}



            <Link to={`/account/${profile.userName}/${profile.userId}`}>
                <Avatar
                    src={'null'}
                    className={classes.small}
                />
            </Link>

        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}


export default connect(mapStateToProps)(BottomNav)