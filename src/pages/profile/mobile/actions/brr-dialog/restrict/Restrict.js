import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'


import { SecuredIcon, MyDirectIcon, CommentIcon } from '../../../../../../components/MyIcons'


const RestrictDrawer = ({ openDrawer, handleCloseDrawer }) =>{
    return(
        <Drawer
            anchor='bottom'
            open={openDrawer}
            onClose={handleCloseDrawer}
        >
            <div className='restrict-drawer-container'>
                <span className='restrict-span'></span>
                <h3>Are you having problem with this Olami_dipup0?</h3>

                <div className='restrict-drawer-description-container'>
                    <div>
                        <SecuredIcon width='27px' height='24px' />
                        <p>Limit unwanted interactions without having to block or unfollow someone you know.</p>
                    </div>

                    <div>
                         <CommentIcon width='24px' height='24px' />
                         <p>You'll control if others can see their new comments on your posts</p>
                    </div>

                    <div>
                        <MyDirectIcon width='24px' height='24px' />
                        <p>Their chat will be moved to your Message Requests, so they won't see when you've read it.</p>
                    </div>

                </div>
                
                <Button color='primary'>Restrict Account</Button>
            </div>
        </Drawer>
    )
}



export default RestrictDrawer