import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

import { MyActiveHomeIcon, MyUnActiveSearchIcon, UnLikedIcon } from '../MyIcons'
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

const BottomNav = () => {
    const classes = useStyles()
    return (
        <nav>
            <Link  to='/'>
                <MyActiveHomeIcon
                    height='24px'
                    width='24px'
                />
            </Link>

            <Link  to='/explore'>
                <MyUnActiveSearchIcon
                    height='24px'
                    width='24px'
                />
            </Link>

            {/* <MyAddIcon
                height='24px'
                width='24px'
            /> */}
            <UploadFiles />

            <UnLikedIcon
                height='24px'
                width='24px'
            />

            <Link exact to='/sulai_m0n'>
                <Avatar
                    src={'null'}
                    className={classes.small}
                />
            </Link>

        </nav>
    )
}


export default BottomNav