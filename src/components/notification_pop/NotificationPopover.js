import React from 'react'
import Popover from '@material-ui/core/Popover'


import { UnLikedIcon } from '../MyIcons'


const NotificationPopover = ({ handleClose, anchorEl, count }) => {
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div className='notification-popover-container'>
                <UnLikedIcon
                    width='24px'
                    height='24px'
                />
                <p>{count}</p>
            </div>

        </Popover>

    )
}



export default NotificationPopover